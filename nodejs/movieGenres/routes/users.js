const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
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

   // email needs to be unique - so user is already in db if email exists
   let user = await User.findOne({ email: req.body.email })
   if (user) return res.status(400).send('User already registered');

   // updating construction to lodash
   // user = new User({
   //    name: req.body.name,
   //    email: req.body.email,
   //    password: req.body.password
   // });
   user = new User(_.pick(req.body, ['name', 'email', 'password']));

   // hashing password
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password, salt)

   try {
      await user.save();
   }
   catch (error) {
      return res.status(400).send(error.errmsg);
   }

   // dont send password
   // res.send({
   //    name: user.name,
   //    email: user.email
   // });

   // creating jsonWebToken that 
   // will be returned in header
   const token = jwt.sign(
      { _id: user._id },
      config.get('jwtPrivateKey')
   );

   // dont send password
   res
      .header('x-auth-token', token)
      .send(_.pick(user, ['_id', 'name', 'email']))
});

module.exports = router;