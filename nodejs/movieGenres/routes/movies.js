const express = require('express');

const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');

const auth = require('../middleware/auth');

// diff then in index.js - need to work with 'instance' of express
const router = express.Router();

/**
 * Example req:
 * {
	   "title": "Mad Max",
   	"genreId": "5c500f8d04de2843e66bfc52", <- id from genre collection
	   "numberInStock": 10,
	   "dailyRentalRate": 10
   }
 */

router.get('/', async ( req, res ) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.get('/:id', async ( req, res ) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('Not found');
    res.send(movie);
});

// validating user authentication token
// passing auth method as middleware to be executed
// before this method fires
router.post('/', auth, async ( req, res ) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[ 0 ].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre mate');

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    // reassigning value - id returned from save operation
    await movie.save();
    res.send(movie);
});

router.put('/:id', auth, async ( req, res ) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[ 0 ].message);

    const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        { title: req.body.title },
        { new: true }
    );

    if (!movie) return res.status(404).send('Not found.');

    res.send(movie);
});

router.delete('/:id', auth, async ( req, res ) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('Not found.');
    res.send(movie);
});

module.exports = router;
