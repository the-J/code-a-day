const passport = require('passport')
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const secret = require('../secret/secret')

// takse user id and save it in the session
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// retrive user data
passport.deserializeUser((id, done) => {
    // taking from user models
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

// signup
passport.use('local.signup', new LocalStrategy({
  usernameField: 'email', // user.name and so on
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  //  if  email already exists
  User.findOne({'email': email}, (err, user) => { // mongoose method
    // connection problem or db doesn't exist
    if (err) {
      return done(err)
    }

    // if  data already exist
    if (user) {
      return done(null, false, req.flash('error', 'User with this email already exist.'))
    }
    // create if  there is no data
    const newUser = new User()
    // save data in db
    newUser.fullname = req.body.fullname // used method of body-parser - fullname is name of the field
    newUser.email = req.body.email
    // this will save password in db as txt=> newUser.password = require.body.password
    // but we need to install bcrypt-nodejs
    newUser.password = newUser.encryptPassword(req.body.password)

    newUser.save((error) => {
      if (error) {
        console.log('something went wrong ', error)
      }
      return done(null, newUser)
    })
  })
}))

// login
passport.use('local.login', new LocalStrategy({
  usernameField: 'email', // user.name and so on
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  //  if  email already exists
  User.findOne({'email': email}, (err, user) => { // mongoose method
    // connection problem or db doesn't exist
    if (err) {
      return done(err)
    }

    // if  data already exist
    let messages = []
    if (!user) {
      messages.push('Email Does Not Exist.')
      return done(null, false, req.flash('error', messages))
    }

    if (!user.validPassword(password)) {
      messages.push('Password Invalid')
      return done(null, false, req.flash('error', messages))
    }

    return done(null, user)
  })
}))

passport.use(new FacebookStrategy(secret.facebook, (req, token, refreshToken, profile, done) => {
  User.findOne({facebook: profile.id}, (err, user) => {
    if (err) {
      return done(err)
    }

    if (user) {
      return done(null, user)
    } else {
      const newUser = new User()
      newUser.facebook = profile.id
      newUser.fullname = profile.displayName
      newUser.email = profile._json.email
      newUser.tokens.push({token: token})

      newUser.save((err) => {
        return done(null, newUser)
      })

    }
  })
}))
