const Joi = require('joi');
const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config');

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

if (app.get('env') === 'development') {
   // logging api request
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

app.use(helmet());

const genres = [
   { id: 1, name: 'Action' },
   { id: 2, name: 'Horror' },
   { id: 3, name: 'Romance' },
];

app.get('/', (req, res) => {
   res.render('index', {
      title: 'My express app',
      message: 'Hello'
   })
});

app.get('/api/genres', (req, res) => {
   res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
   const genre = genres.find(c => c.id === parseInt(req.params.id));
   if (!genre) return res.status(404).send('Not found');
   res.send(genre);
});

app.post('/api/genres', (req, res) => {
   const { error } = validateGenre(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const genre = {
      id: genres.length + 1,
      name: req.body.name
   };

   genres.push(genre);
   res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
   const genre = genres.find(c => c.id === parseInt(req.params.id));
   if (!genre) return res.status(404).send('Not found.');

   const { error } = validateGenre(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   genre.name = req.body.name;
   res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
   const genre = genres.find(c => c.id === parseInt(req.params.id));
   if (!genre) return res.status(404).send('Not found.');

   const index = genres.indexOf(genre);
   genres.splice(index, 1);

   res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


/**
 * HELPERS
 */

/**
 * @param {String} genre 
 */
function validateGenre(genre) {
   const schema = {
      name: Joi.string().min(3).required()
   };

   return Joi.validate(genre, schema);
}