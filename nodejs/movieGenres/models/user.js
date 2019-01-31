const mongoose = require('mongoose');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

const passwordComplexityOptions = {
   min: 5,
   max: 1024,
   lowerCase: 1,
   upperCase: 1,
   numeric: 1,
   symbol: 1,
   requirementCount: 2,
}

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 50,
      required: true
   },
   email: {
      type: String,
      unique: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
      required: true
   },
   password: {
      type: String,
      minlength: passwordComplexityOptions.min,
      maxlength: passwordComplexityOptions.max,
      required: true
   }
});

const User = mongoose.model('Users', userSchema);

function validateUser(user) {
   const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).email().required(),
      password: new PasswordComplexity(passwordComplexityOptions)
   }

   return Joi.validate(user, schema);
}

exports.validateUser = validateUser;
exports.User = User;