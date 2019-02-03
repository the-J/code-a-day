const express = require('express')

const { Customer, validateCustomer } = require('../models/customer')

const auth = require('../middleware/auth');

// diff then in index.js - need to work with 'instance' of express
const router = express.Router()

/**
 * Example req:
 * {
	   "name": "John Doe",
	   "phone": "123-123-123",
	   "isGold": false
   }
 */
router.get('/', async (req, res) => {
   const customer = await Customer.find().sort('name');
   res.send(customer);
});

router.get('/:id', async (req, res) => {
   const customer = await Customers.findById(req.params.id);
   if (!customer) return res.status(404).send('Not found');
   res.send(customer);
});

// validating user authentication token
// passing auth method as middleware to be executed
// before this method fires
router.post('/', auth, async (req, res) => {
   const { error } = validateCustomer(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const customer = new Customer({
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold
   });

   // reassigning value - id returned from save operation
   await customer.save();
   res.send(customer);
});

router.put('/:id', auth, async (req, res) => {
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

router.delete('/:id', auth, async (req, res) => {
   const customer = await Customer.findByIdAndRemove(req.params.id);
   if (!customer) return res.status(404).send('Not found.');
   res.send(customer);
});

module.exports = router;