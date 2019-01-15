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


async function createCourse() {
   // object based on Course class - mapping do mongodb document 
   const course1 = new Course({
      name: 'Nodejs Course',
      author: 'Batman',
      tags: ['nodejs', 'back-end', 'superhero'],
      isPulished: true
   });

   const course2 = new Course({
      name: 'Angular Course',
      author: 'Superman',
      tags: ['Angular', 'front-end', 'superhero'],
      isPulished: true
   });

   // new DB entry
   const result1 = await course1.save();
   const result2 = await course2.save();
   console.log(result1);
   console.log(result2);
}

createCourse();
