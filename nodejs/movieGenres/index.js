const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config');

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const logger = require('./middleware/logger.js');

const routesGenres = require('./routes/genres');
const routesCustomers = require('./routes/customers');
const routesHome = require('./routes/home');

// main app
const app = express();

// db connection
mongoose.connect('mongodb://localhost/genres', { useNewUrlParser: true })
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

// customers routes api
app.use('/api/customers', routesCustomers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App runing on ' + port));