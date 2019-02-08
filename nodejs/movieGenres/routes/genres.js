const express = require('express');

const { Genre, validateGenre } = require('../models/genre');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// diff then in index.js - need to work with 'instance' of express
const router = express.Router();

/**
 * Example req:
 * {
      "name": "thrller"
   }
 */

router.get('/', async ( req, res ) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async ( req, res ) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('Not found');
    res.send(genre);
});

// validating user authentication token
// passing auth method as middleware to be executed
// before this method fires
router.post('/', auth, async ( req, res ) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[ 0 ].message);

    let genre = new Genre({ name: req.body.name });
    // reassigning value - id returned from save operation
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', auth, async ( req, res ) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[ 0 ].message);

    const genre = await Genre.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    );

    if (!genre) return res.status(404).send('Not found.');

    res.send(genre);
});

// running wto middlewares in sequence
router.delete('/:id', [ auth, admin ], async ( req, res ) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('Not found.');
    res.send(genre);
});

module.exports = router;
