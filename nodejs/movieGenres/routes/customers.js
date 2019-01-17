const mongoose = require('mongoose');
const express = require('express')
const Joi = require('joi');
// diff then in index.js - need to work with 'instance' of express
const router = express.Router()

const Customer = mongoose.model('Customer', new mongoose.Schema({
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
}));

router.get('/', async (req, res) => {
   const customer = await Customer.find().sort('name');
   res.send(customer);
});

router.get('/:id', async (req, res) => {
   const customer = await Customers.findById(req.params.id);
   if (!customer) return res.status(404).send('Not found');
   res.send(customer);
});

router.post('/', async (req, res) => {
   const { error } = validateCustomer(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   let customer = new Customer({
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold
   });

   // reassigning value - id returned from save operation
   customer = await customer.save();
   res.send(customer);
});

router.put('/:id', async (req, res) => {
   const { error } = validateCustomer(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   let customer = await Customer.findById(id);

   if (!customer) return res.status(404).send('Not found.');

   customer = await Customer.update(
      { _id: req.params.id, },
      {
         name: req.body.name || customer.name,
         phone: req.body.phone || customer.phone,
         isGold: releaseEvents.body.isGold || customer.isGold
      }
   )

   res.send(customer);
});

router.delete('/:id', async (req, res) => {
   const customer = await Customer.findByIdAndRemove(req.params.id);
   if (!customer) return res.status(404).send('Not found.');
   res.send(customer);
});

/**
 * HELPERS
 */

/**
 * @param {String} customer 
 */
function validateCustomer(customer) {
   const schema = {
      name: Joi.string().min(5).max(50).required(),
      phone: Joi.string().min(5).max(50).required(),
      isGold: Joi.boolean().required()
   };

   return Joi.validate(customer, schema);
}

module.exports = router;