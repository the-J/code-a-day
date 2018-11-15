const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const async = require('async');

const Company = require('../models/company');
const User = require('../models/user');

module.exports = (app) => {

  app.get('/company/create', (req, res) => {
    let success = req.flash('success')
    res.render('company/company', {title: 'Company Reqgistration', user: req.user, success: success, noErrors: success.length > 0})
  })

  // TODO
  // server side validation like in user validator
  // needs to be added
  // need to use express validator
  app.post('/company/create', (req, res) => {
    // one way to pass the data to database:
    // let company = {
    //   name: req.body.name
    //   address: req.boody.adress
    // ...
    // }
    // // new instance of companny
    // let newCompany = new Company(company)

    // easier way
    let newCompany = new Company()
    newCompany.name = req.body.name
    newCompany.address = req.body.address
    newCompany.city = req.body.city
    newCompany.country = req.body.country
    newCompany.sector = req.body.sector
    newCompany.website = req.body.website
    newCompany.image = req.body.upload

    // saving to database
    newCompany.save((err) => {
      if (err) {
        console.log(err)
      }

      console.log(newCompany)

      // using flash do display that upload was success and  redirecting
      req.flash('success', 'Data has been added.')
      res.redirect('/company/create')
    })
  })


  // using formidable
  app.post('/upload', (req, res) => {
    let form = new formidable.IncomingForm();

    // this will work on localhost
    form.uploadDir = path.join(__dirname, '../public/uploads');

    // renaming files
    form.on('file', (field, file) => {
      fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
        if (err) {
          console.log('Error ', err);
        }
        // console.log('File has been renamed');
      })
    })

    form.on('error', (error) => {
      console.log('Error occured', error);
    })

    form.on('end', () => {
      // console.log('File has been uploaded.');
    })

    form.parse(req);
  });


  // company routes
  // mongoose method find for displaying all companies in
  // companies.ejs. It returns array, cool.
  app.get('/companies', (req, res) => {
    // retriving data from rateme db with mongoose
    Company.find({}, (err, result) => {
      // console.log(result);
      res.render('company/companies', {title: 'All companies || RateMe', user: req.user, data: result})
    });
  });

  // company-profile routes
  // adding id for '/register-employee/<%= data.id %>' and
  // adding button redirecting for registering as employee
  app.get('/company-profile/:id', (req, res) => {
    Company.findOne({'_id': req.params.id}, (err, data) => {
      if (err) {
        throw err
      }
      res.render('company/company-profile', {title: 'Company Profile || RateMe', user: req.user, id: req.params.id, data: data})
    });
  });


  //  register-employee routes
  // to create this from register-employee.ejs I need
  // an id as param for db
  app.get('/company/register-employee/:id', (req, res) => {
    Company.findOne({'_id': req.params.id}, (err, data) => {
      if (err) {
        throw err
      }
      res.render('company/register-employee', {title: 'Register Employee', user: req.user, data: data});
    });
  });

  // adding user register-employee - with async module
  // after registering as an employee two db's will be updated
  app.post('/company/register-employee/:id', (req, res, next) => {

    // updating company collection data first with mondodb update method next updating user Profile
    // parallel method desnt require to pass data from F1 to F2
    async.parallel([

      // first function
      function(callback) {
        Company.update({

          // taking data from db
          '_id': req.params.id,
          // checking if its not equal ($ne) id in the session variable
          'employees.employeeId': {$ne: req.user._id}
        }, {

          // pushing data to companydb, updating employees object
          // employeRole taking from the body field
          $push: {employees: { employeeId: req.user._id, employeeFullname: req.user.fullname, employeeRole: req.body.role }}

        }, (err,count) => {
          if(err) {
            return next(err);
          }
          callback(err,count);
        });
      },

      // second function taking callback
      function(callback) {
        async.waterfall([

          // finding company matching data
          function(callback) {

            // 'data' is an anwser that needs to be passed
            Company.findOne({'_id': req.params.id}, (err, data) => {
              callback(err, data);
            });
          },

          // finding user
          function(data,callback){

            // checking if id in db is equal id in session
            // and returning all user data
            User.findOne({'_id': req.user._id}, (err, result) => {

              // setting role from input field
              result.role = req.body.role;
              // setting company name in user from companny name from company
              result.company.name = data.name;
              // setting company image in user with image from company
              result.company.image = data.image;
              // passing data for updating and redirecting
              result.save((err) => {
                res.redirect('/home');
              });
            });
          }
        ]);
      }
    ])
  });
}
