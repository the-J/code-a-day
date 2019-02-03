const express = require('express')
const mongoose = require('mongoose');
const Fawn = require('fawn');

const auth = require('../middleware/auth');

// diff then in index.js - need to work with 'instance' of express
const router = express.Router();

// init Fawn on mongoose object
Fawn.init(mongoose);

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

// validating user authentication token
// passing auth method as middleware to be executed
// before this method fires
router.post('/', auth, async (req, res) => {
   const { error } = validateRental(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   // this could validate if passed customerId param is valid
   // but it's bad approach - it should go to validateRental function
   //
   // if (!mongoose.Types.ObjectId.isValid(req.body.cutstomerId)) {
   //    return res.status(400).send('Invalid Customer');
   // }

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
      }
   });


   // FAWN - wrapt in try catch - something can fail
   try {
      // chaining saving and updating collections with fawn
      new Fawn.Task()
         // save rental
         // full collection name - case sensitive
         .save('rentals', rental)
         // now update movies
         .update('movies', { _id: movie._id }, {
            $inc: { numberInStock: -1 }
         })
         .run();

      res.send(rental);
   }
   catch (ex) {
      res.status(500).send('Something failed');
   }


   // THIS IS HANDLED BY FAWN
   // reassigning value - id returned from save operation
   // rental = await rental.save();

   // // updated list of movies in stock
   // movie.numberInStock--;
   // movie.save();

   // res.send(rental);
});

router.put('/:id', auth, async (req, res) => {
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

router.delete('/:id', auth, async (req, res) => {
   const rental = await Rental.findByIdAndRemove(req.params.id);
   if (!rental) return res.status(404).send('Not found.');
   res.send(rental);
});

module.exports = router;