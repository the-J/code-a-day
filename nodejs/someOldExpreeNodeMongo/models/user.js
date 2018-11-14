const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = mongoose.Schema({
  fullname: {type: String, required: true},
  email   : {type: String, required: true},
  password: {type: String}, // not setting password due to possibility of fb login
  role    : {type: String, default: ''},
  company : {
    name : {type: String, default: ''},
    image: {type: String, default: ''}
  },
  passwordResetToken  : {type: String, default: ''},
  passwordResetExpires: {type: Date, default: Date.now},
  facebook: {type: String, default: ''}, // need to create an app on fb for that
  tokens: Array
})

// use of bcrypt-nodejs - creating methods
// encrypte password before saving into db
userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

// validating password for decription
//  arrow function won't work with '.this'
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
