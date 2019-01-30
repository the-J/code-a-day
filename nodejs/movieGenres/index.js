const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config');
const Joi = require('joi');
// extending Joi object with 'joi- objectId' method
Joi.objectId = require('joi-objectid')(Joi);

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const logger = require('./middleware/logger.js');

const routesUsers = require('./routes/users');
const routesGenres = require('./routes/genres');
const routesCustomers = require('./routes/customers');
const routesMovies = require('./routes/movies');
const routesRentals = require('./routes/rentals');
const routesHome = require('./routes/home');

// main app
const app = express();

// db connection
// check options with https://mongoosejs.com/docs/deprecations
mongoose.connect(
   'mongodb://localhost/genres',
   {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
   })
   .then(() => console.log('connected to db'))
   .catch(err => console.log('db connection error ', err))

// template engine
app.set('view engine', 'pug');
app.set('views', './views'); //default

// configuration
console.log("App Mode: " + config.get('mode'));

// logging api request
if (app.get('env') === 'development') {
   app.use(morgan('tiny'))
   startupDebugger('Morgan enabled');
}

// DB things
dbDebugger('Connected to db...');

// parse req.body if includes json
app.use(express.json());

// fetching data from urls
app.use(express.urlencoded({ extended: true }));

// allowes to serve static content - img etc
app.use(express.static('public'));

// nothing important, my logger
app.use(logger)

// another middlelayer
app.use(helmet());

// main route
app.get('/', routesHome);

// genres routes api
app.use('/api/genres', routesGenres);

// users routes api
app.use('/api/users', routesUsers);

// customers routes api
app.use('/api/customers', routesCustomers);

// movies routes api
app.use('/api/movies', routesMovies);

// rentals routes api
app.use('/api/rentals', routesRentals);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App runing on ' + port));