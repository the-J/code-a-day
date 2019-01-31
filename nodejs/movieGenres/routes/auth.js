const express = require('express')
const bcrypt = require('bcrypt');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const _ = require('lodash');

const { User } = require('../models/user')
const { passwordComplexityOptions } = require('../const.js');
// diff then in index.js - need to work with 'instance' of express
const router = express.Router()


router.post('/', async (req, res) => {
   const { error } = validateAuth(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   // email needs to be unique - so user is already in db if email exists
   let user = await User.findOne({ email: req.body.email })
   if (!user) return res.status(400).send('Invalid email or password');

   const validPassord = await bcrypt.compare(req.body.password, user.password);
   if (!validPassord) return res.status(400).send('Invalid email or password');

   res.send(true);
});

function validateAuth(user) {
   const schema = {
      email: Joi.string().min(5).max(255).email().required(),
      password: new PasswordComplexity(passwordComplexityOptions)
   }

   return Joi.validate(user, schema);
}

module.exports = router;