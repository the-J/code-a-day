const mongoose = require('mongoose')

// just testing no config settings
mongoose.connect('mongodb://localhost/testing')
   .then(() => console.log('mongo connected'))
   .catch(err => console.log('db connection err: ', err))

// simple test Schema
const courseSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255
      // math: /pattern/
   },
   category: {
      type: String,
      enum: ['web', 'mobile', 'network'],
      // will set param to lowercase
      lowercase: true
      // uppercase, trim
   },
   author: String,
   tags: {
      type: Array,
      validate: {
         validator: function (v) {
            // v && v.length > 0 
            //  validationg if value is not null and got min one element
            return v && v.length > 0;
         },
         message: 'A course should have at least one tag'
      }
   },
   someValueForAsyncValidator: {
      type: Array,
      validate: {
         isAsync: true,
         validator: function (v, callback) {
            // simulating some async things
            setTimeout(() => {
               // do some async work
               const resul = v && v.length > 7;
            }, 4000);

            callback(result);
         },
         message: 'A course should have at least one tag'
      }
   },
   date: {
      type: Date,
      default: Date.now
   },
   isPublished: Boolean,
   price: {
      type: Number,
      min: 10,
      max: 200,
      required: function () {
         return this.isPublished;
      },
      // returning calculated value defined in getter
      get: v => Math.round(v),
      // upting value  before setting with setter
      set: v => Math.round(v)
   }
})

// compile model to class based on schema
const Course = mongoose.model('Course', courseSchema)


async function createCourse() {
   // object based on Course class - mapping do mongodb document 
   const course1 = new Course({
      name: 'Nodejs Course',
      author: 'Batman',
      tags: ['nodejs', 'back-end', 'superhero'],
      isPublished: true,
      price: 123
   });

   const course2 = new Course({
      name: 'Angular Course',
      author: 'Superman',
      tags: ['Angular', 'front-end', 'superhero'],
      isPublished: false
   });

   // new DB entry
   const result1 = await course1.save();
   const result2 = await course2.save();

   console.log(result1);
   console.log(result2);

   // try{} catch{} block for handling exceptions
   // 'name' is required and I will not provide any
   // it's a one way to validate
   const wrongData1 = new Course({
      author: 'Jocker',
      tags: ['fun', 'jokes'],
      isPublished: false
   });

   try {
      const wrongData = await wrongData1.save();
   }
   catch (ex) {
      console.log(ex);

      for (field in ex.errors) {
         console.log({ field })
         console.log(field.message)
      }
   }


   // it's aanother way to validate
   const wrongData2 = new Course({
      author: 'Jocker',
      tags: ['fun', 'jokes'],
      isPublished: false
   });

   try {
      // this line will throw new exception
      await wrongData2.validat();
      // this is promise returning void so
      // we can;t assign it to const
      // but it takes callback
      await wrongData2.validat(err => {
         if (err) return console.log('err: ', err);
         // and catch block will return err as well
      });
      const wrongData = await wrongData2.save();
   }
   catch (ex) {
      console.log(ex);
   }
}

// call once on booting
// createCourse();

async function getCourses() {

   // comparison operators

   const coursesSimple = await Course
      .find({ author: 'Superman' })
      .limit(10)
      .sort({ name: 1 })
      .select({ name: 1, tags: 1 })

   const coursesOr = await Course
      .find()
      .or([{ author: 'Superman' }, { author: 'Batman' }])
      .limit(10)
      .sort({ name: 1 })
      .select({ name: 1, tags: 1 })

   const coursesRegexp = await Course
      .find({ author: [/^Sup/i, /man$/i] })
      .limit(10)
      .sort({ name: 1 })
      .select({ name: 1, tags: 1 })

   const pageNumber = 2;
   const pageSize = 10;
   // /api/courses?pageNumber=2&pageSize=10

   const pagination = await Course
      .find({ author: [/^Sup/i, /man$/i] })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort({ name: 1 })
      .select({ name: 1, tags: 1 })

   console.log({ coursesSimple });
   console.log({ coursesOr });
   console.log({ coursesRegexp });
   console.log({ pagination });
}

// getCourses();

async function updateCourse(id, option) {
   // two ways

   // 1 Query first
   // findById()
   // modify
   // save();

   // 2 update first
   // Update directly in db
   // optionally: get updated doc

   const course = await Course.findById(id);
   if (!course) return console.log('no such course');

   // this way
   if (option === 1) {
      course.isPublished = true;
      course.author = 'Hellen Miren'
   }

   // or this way
   if (option === 2) {
      course.set({
         isPublished: true,
         author: 'Hellen Miren'
      })
   }

   const updateResult = await course.save();
   console.log({ updateResult });
}

// updateCourse("5c3d99ad172dc928a8c6ae2b", 1);
// updateCourse("5c3d99ad172dc928a8c6ae2b", 2);

async function updateMethod(id) {

   // this one won't return document but just confimation of the operation
   const courseNoDoc = await Course.update({ _id: id }, {
      $set: {
         autho: 'Bicycle',
         isPublished: false
      }
   });

   console.log({ courseNoDoc });

   // this one will retun old document
   const courseWithOldDoc = await Course.findByIdAndUpdate({ _id: id }, {
      $set: {
         author: 'Jack',
         isPublished: true
      }
   });

   console.log({ courseWithOldDoc });

   // finaly this one will return new document
   const courseWithNewDoc = await Course.findByIdAndUpdate({ _id: id }, {
      $set: {
         author: 'Nostradamus',
         isPublished: false
      }
   }, { new: true });

   console.log({ courseWithNewDoc });
}

// updateMethod("5c3d99ad172dc928a8c6ae2b");

async function removeDocument(id) {
   // delete one -> returning stats
   const removed = await Course.deleteOne({ _id: id });
   console.log({ removed })

   // if no doc -> null
   // if doc -> removed doc
   const findAndDelete = await Course.findByIdAndRemove(id);
   console.log({ findAndDelete })
}

// removeDocument("5c3d99ad172dc928a8c6ae2b");
