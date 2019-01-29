const mongoose = require('mongoose');
const Joi = require('joi');

const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
   title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255
   },
   genre: {
      type: genreSchema,
      required: true
   },
   numberInStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 255
   },
   dailyRentalRate: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 255
   }
}));

/**
 * HELPERS
 */

/**
 * @param {String} movie 
 */
function validateMovie(movie) {
   const schema = {
      title: Joi.string().min(5).max(255).required(),
      genreId: Joi.objectId().required(),
      numberInStock: Joi.number().min(0).required(),
      dailyRentalRate: Joi.number().min(0).required()
   };

   return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
