const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
  name: {type: String},
  adress: {type: String},
  city: {type: String},
  country: {type: String},
  sector: {type: String},
  website: {type: String},
  image: {type: String, default: 'defaultImage.png'}, // just image name

  employees: [{
    employeeId: {type: String, default: ''},
    employeeFullname: {type: String, default: ''},
    employeeRole: {type: String, default: ''}
  }],

  // employee adding rating to company
  companyRating: [{
    companyName: {type: String, default: ''},
    userFullname: {type: String, default: ''},
    userRole: {type: String, default: ''},
    companyImage: {type: String, default: ''},
    userRating: {type: Number, default: 0},
    userReview: {type: String, default: ''}
  }],

  // for rating of company
  ratingNumber: [Number],
  ratingSum: {type: Number, default: 0}
})

module.exports = mongoose.model('Company', companySchema)
