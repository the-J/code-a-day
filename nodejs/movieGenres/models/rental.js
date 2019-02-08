const Joi = require('joi');
const mongoose = require('mongoose');

// creating new customer schema - we don't need all his info.
// same goes to movies
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        required: true
    }
});

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 255
    }
});

const rentalSchema = new mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true
    },
    movie: {
        type: moviesSchema,
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        typ: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});


/**
 * HELPERS
 */

/**
 * @param {String} rental
 */
function validateRental( rental ) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };

    return Joi.validate(rental, schema);
}

const Rental = mongoose.model('Rental', rentalSchema);

exports.validateRental = validateRental;
exports.Rental = Rental;
