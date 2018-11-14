const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const async = require('async')
const crypto = require('crypto')

const User = require('../models/user')
const secret = require('../secret/secret')

// passport will be passed as parameter

module.exports = (app, passport) => {
  app.get('/', (req, res, next) => {
    if(req.session.cookie.originalMaxAge !== null) {
      res.redirect('/home')
    } else {
      res.render('index', {title: 'Main || RateMe'}) // view engine is set so can use .render
    }
  })

  app.get('/signup', (req, res) => {
    const errors = req.flash('error')
    res.render('user/signup', {title: 'Sign Up || RateMe', messages: errors, hasErrors: errors.length > 0})
  })

  app.post('/signup', validateSignUp, passport.authenticate('local.signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
  }))

  app.get('/login', (req, res) => {
    const errors = req.flash('error')
    res.render('user/login', {title: 'Login || RateMe', messages: errors, hasErrors: errors.length > 0})
  })

  app.post('/login', validateLogin, passport.authenticate('local.login', {
    failureRedirect: '/login',
    failureFlash : true
  }), (req, res) => {
    if (req.body.rememberme) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000
    } else {
      req.session.cookie.expires = null
    }

    res.redirect('/home');
  });

  app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}))

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  }))

  app.get('/home', (req, res) => {
    res.render('home', {title: 'Home || RateMe', user: req.user})
  })

  // reseting page
  app.get('/forgot', (req, res) => {
    const errors = req.flash('error')
    const info = req.flash('info')
    res.render('user/forgot', {title: 'Request Password Reset', messages: errors, hasErrors: errors.length > 0, info: info, noErrors: info.length > 0});
  })

  // sending email for reseting
  app.post('/forgot', (req, res, next) => {
    async.waterfall([

      // creating token
      function (callback) {
        crypto.randomBytes(20, (err, buf) => {
          const rand = buf.toString('hex') // token
          callback(err, rand)
        })
      },

      // validating email
      function (rand, callback) {
        User.findOne({'email': req.body.email}, (err, user) => {
          if (!user) {
            req.flash('error', 'No Account With That Email Exist Or Email Is Invalid')
            return res.redirect('/forgot')
          }

          user.passwordResetToken = rand
          user.passwordResetExpires = Date.now() + 15 * 60 * 1000

          user.save((err) => {
            callback(err, rand, user)
          })
        })
      },
      // sanding email
      function (rand, user, callback) {
        const smtpTransport = nodemailer.createTransport({
          service: 'Gmail',
          auth   : {
            user: secret.auth.user,
            pass: secret.auth.pass
          }
        })

        const mailOptions = {
          to     : user.email, // req.body.email
          from   : 'RateMe <' + secret.auth.user + '>',
          subject: 'RateMe Password Reset',
          text   : 'You have requested password reset token. \n\n' + 'Please click on the link to complete the process: \n\n' + 'http://localhost:8080/reset/' + rand + '\n\n'
        }

        //send email
        smtpTransport.sendMail(mailOptions, (err, response) => {
          req.flash('info', 'A password reset token has been send to ' + user.email)
          return callback(err, user)
        })
      }
    ], (err) => {
      if (err) {
        return next(err)
      }

      res.redirect('/forgot')
    })
  })

  // seting reset page through email token
  app.get('/reset/:token', (req, res) => {
    User.findOne({passwordResetToken: req.params.token, passwordResetExpires: {$gt: Date.now()}}, (err, user) => {
      if (!user) {
        req.flash('error', 'Password reset token expired or is invalid. Enter your email again to get a new token.')
        return res.redirect('/forgot')
      }

      const errors = req.flash('error')
      const success = req.flash('success')
      // need to add success - BC I have this object in body of reset
      res.render('user/reset', {title: 'Reset Your Password', messages: errors, hasErrors: errors.length > 0, success: success, noErrors: success.length > 0})
    })
  })

  // validating changed password
  app.post('/reset/:token', (req, res) => {
    async.waterfall([
      function (callback) {
        User.findOne({passwordResetToken: req.params.token, passwordResetExpires: {$gt: Date.now()}}, (err, user) => {
          if (!user) {
            req.flash('error', 'Password reset token expired or is invalid. Enter your email again to get a new token.')
            return res.redirect('/forgot')
          }

          req.checkBody('password', 'Password is Required').notEmpty()
          req.checkBody('password', 'Password Must Not Be Less Than 5 Characters').isLength({min: 5})
          req.check('password', 'Incorrect Password').matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/gi)

          const errors = req.validationErrors()

          if (req.body.password == req.body.cpassword) {
            if (errors) {
              let messages = []
              errors.forEach((error) => {
                messages.push(error.msg)
              })

              const errors = req.flash('error')
              res.redirect('/reset/' + req.params.token)
            } else {
              user.password = user.encryptPassword(req.body.password)
              user.passwordResetToken = undefined
              user.passwordResetExpires = undefined

              user.save((err) => {
                req.flash('success', 'Your password has been succesfully updated.')
                callback(err, user)
              })
            }
          } else {
            req.flash('error', 'Password and confirm password are not equal.')
            res.redirect('/reset/' + req.params.token)
          }
        })
      },
      // sending mail about changed password
      function (user, callback) {
        const smtpTransport = nodemailer.createTransport({
          service: 'Gmail',
          auth   : {
            user: secret.auth.user,
            pass: secret.auth.pass
          }
        })

        const mailOptions = {
          to     : user.email, // req.body.email
          from   : 'RateMe <' + secret.auth.user + '>',
          subject: 'RateMe Password Updated',
          text   : 'This is a confirmation that you updated the password for ' + user.email
        }

        // send email
        smtpTransport.sendMail(mailOptions, (err, response) => {
          callback(err, user)

          const error = req.flash('errors')
          const success = req.flash('success')

          res.render('user/reset', {title: 'Reset Your Password', messages: error, hasErrors: error.length > 0, success: success, noErrors: success.length > 0})
        })
      }
    ])
  })

  app.get('/logout', (req, res) => {
    req.logout() // passport method

    req.session.destroy((err) => {
      res.redirect('/home')
    })
  })

}

// validating sing up
const validateSignUp = (req, res, next) => {
  req.checkBody('fullname', 'Fullname is Required.').notEmpty()
  req.checkBody('fullname', 'Fullname Must Not Be Less Than 5 characters.').isLength({min: 5})
  req.checkBody('email', 'Email is Required.').notEmpty()
  req.checkBody('email', 'Email is Invalid.').isEmail()
  req.checkBody('password', 'Password is Required.').notEmpty()
  req.checkBody('password', 'Password Must Not Be Less Than 5 characters.').isLength({min: 5})
  req.check('password', 'Password Must Contain at Least 1 Digit and 1 Character').matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/gi)

  const errors = req.validationErrors()

  if (errors) {
    let messages = []
    errors.forEach((error) => {
      messages.push(error.msg)
    })

    req.flash('error', messages)
    res.redirect('/signup')
  } else {
    return next()
  }
}

// validating login
const validateLogin = (req, res, next) => {
  req.checkBody('email', 'Email is Required').notEmpty()
  req.checkBody('email', 'Email is Invalid').isEmail()
  req.checkBody('password', 'Password is Required').notEmpty()
  req.checkBody('password', 'Password Must Not Be Less Than 5 Characters').isLength({min: 5})
  req.check('password', 'Incorrect Password').matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/gi)

  let loginErrors = req.validationErrors()

  if (loginErrors) {
    let messages = []
    loginErrors.forEach((error) => {
      messages.push(error.msg)
    })

    req.flash('error', messages)
    res.redirect('/login')
  } else {
    return next()
  }
}
