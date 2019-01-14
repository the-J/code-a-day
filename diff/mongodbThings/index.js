const mongoose = require('mongoose')

// just testing no config settings
mongoose.connect('mongodb://localhost/testing')
   .then(() => console.log('mongo connected'))
   .catch(err => console.log('db connection err: ', err))

// simple test Schema
const courseSchema = new mongoose.Schema({
   name: String,
   author: String,
   tags: [String],
   date: {
      type: Date,
      default: Date.now
   },
   isPublished: Boolean
})

// compile model to class based on schema
const Course = mongoose.model('Course', courseSchema)

// object based on Course class - mapping do mongodb document 
const course = new Course({
   name: 'Node.js Course',
   author: 'Superman',
   tags: ['node', 'superhero'],
   isPulished: true
})