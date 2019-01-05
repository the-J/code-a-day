const Joi = require('joi');
const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config');

const routesGenres = require('./routes/genres');

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const logger = require('./logger.js');

// main app
const app = express();

// template engine
app.set('view engine', 'pug');
app.set('views', './views'); //default

// configuration
console.log("App Name: " + config.get('name'));
console.log("Email Pass: " + config.get('mail.password'));

// logging api request
if (app.get('env') === 'development') {
   app.use(morgan('tiny'))
   startupDebugger('Morgan enabled');
}

// DB things
// dbDebugger('Connected to db...');

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
app.get('/', (req, res) => {
   res.render('index', {
      title: 'My express app',
      message: 'Hello'
   })
});

// genres routes
app.use('/api/genres', routesGenres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App runing on ' + port));