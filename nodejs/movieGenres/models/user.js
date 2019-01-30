const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      minlength: 5,
      maxlength: 50,
      required: true
   },
   email: {
      type: String,
      unique: true,
      minlength: 5,
      maxlength: 255,
      required: true
   },
   password: {
      type: String,
      unique: true,
      minlength: 5,
      maxlength: 1024,
   }
});

const User = mongoose.model('Users', userSchema);

function validateUser(user) {
   const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).email().required(),
      password: Joi.string().min(5).max(255).required(),
   }

   return Joi.validate(user, schema);
}

exports.validateUser = validateUser;
exports.User = User;