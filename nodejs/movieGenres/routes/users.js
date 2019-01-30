const express = require('express')
// diff then in index.js - need to work with 'instance' of express
const { User, validateUser } = require('../models/user')
const router = express.Router()

/**
 * Example req:
 * {
      "name": "thrller"
   }
 */

router.post('/', async (req, res) => {
   const { error } = validateUser(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   let user = await User.findOne({ email: req.body.email })
   if (user) return res.status(400).send('User already registered');

   user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
   });

   await user.save();
   res.send(user);
});

module.exports = router;