const express = require('express')
// diff then in index.js - need to work with 'instance' of express
const router = express.Router()
const { Genre, validateGenre } = require('../models/genre')

router.get('/', async (req, res) => {
   const genres = await Genre.find().sort('name');
   res.send(genres);
});

router.get('/:id', async (req, res) => {
   const genre = await Genre.findById(req.params.id);
   if (!genre) return res.status(404).send('Not found');
   res.send(genre);
});

router.post('/', async (req, res) => {
   const { error } = validateGenre(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   let genre = new Genre({ name: req.body.name });
   // reassigning value - id returned from save operation
   genre = await genre.save();
   res.send(genre);
});

router.put('/:id', async (req, res) => {
   const { error } = validateGenre(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
   )

   if (!genre) return res.status(404).send('Not found.');

   res.send(genre);
});

router.delete('/:id', async (req, res) => {
   const genre = await Genre.findByIdAndRemove(req.params.id);
   if (!genre) return res.status(404).send('Not found.');
   res.send(genre);
});

module.exports = router;