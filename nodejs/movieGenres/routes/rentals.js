const mongoose = require('mongoose');
const express = require('express')
// diff then in index.js - need to work with 'instance' of express
const router = express.Router()

const { Rental, validateRental } = require('../models/rental');
const { Movie } = require('../models/movie')
const { Customer } = require('../models/customer')


router.get('/', async (req, res) => {
   // sort descending by param 'dateOut'
   const rentals = await Rental.find().sort('-dateOut');
   res.send(rentals);
});

router.get('/:id', async (req, res) => {
   const rental = await Rental.findById(req.params.id);
   if (!rental) return res.status(404).send('Not found');
   res.send(rental);
});

router.post('/', async (req, res) => {
   const { error } = validateRental(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const customer = await Customer.findById(req.body.customerId);
   if (!customer) return res.status(400).send('Invalid customer');

   const movie = await Movie.findById(req.body.movieId);
   if (!movie) return res.status(400).send('Invalid movie');


   // if no movies in stock
   if (movie.numberInStock === 0) return res.status(400).send('No movie in stock - pardon');


   let rental = new Rental({
      customer: {
         _id: customer._id,
         name: customer.name,
         phone: customer.phone
      },
      movie: {
         _id: movie._id,
         title: movie.title,
         dailyRentalRate: movie.dailyRentalRate
      },

   });

   // reassigning value - id returned from save operation
   rental = await rental.save();

   // updated list of movies in stock
   movie.numberInStock--;
   movie.save();

   res.send(rental);
});

router.put('/:id', async (req, res) => {
   const { error } = validateRental(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const rental = await Rental.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
   )

   if (!rental) return res.status(404).send('Not found.');

   res.send(rental);
});

router.delete('/:id', async (req, res) => {
   const rental = await Rental.findByIdAndRemove(req.params.id);
   if (!rental) return res.status(404).send('Not found.');
   res.send(rental);
});

module.exports = router;