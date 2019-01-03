const Joi = require('joi');
const express = require('express');
const app = express();

// Middleware for parsing body by default
app.use(express.json());

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening on port ${port}`));

const cars = [
   { id: 1, name: 'car1' },
   { id: 2, name: 'car2' },
   { id: 3, name: 'car3' }
]

/**
 * GET methods
 */
app.get('/', (req, res) => {
   res.send('Hello world!!!');
   res.end();
});

app.get('/api/cars/', (req, res) => {
   res.send(cars);
   res.end();
})

app.get('/api/cars/:id', (req, res) => {
   const car = cars.find(car => car.id === parseInt(req.params.id));
   if (!car) return res.status(404).send('No car found');
   res.send(car);
});

/**
 * POST methods
 */
app.post('/api/car', (req, res) => {
   const { error } = validateCar(req.body);

   if (error) return res.status(400).send(error.details[0].message);

   const car = {
      id: cars.length + 1,
      name: req.body.name
   }

   cars.push(car);
   res.send(car);
});

/**
 * PUT methods
 */
app.put('/api/car/:id', (req, res) => {
   // Find car
   const car = cars.find(car => car.id === parseInt(req.params.id));

   // If don't exists, return 404
   if (!car) return res.status(404).send('No car found');

   // Validate input data
   const { error } = validateCar(req.body);

   // If invalid, send 400 - bad req
   if (error) return res.status(400).send(error.details[0].message);

   // Update car
   car.name = req.body.name;
   
   // return updated car
   res.send(car);
})

/**
 * DELETE methods
 */
app.delete('/api/cars/:id', (req, res) => {
   const car = cars.find(c => c.id === parseInt(req.params.id));
   if (!car) res.status(404).send('No car with given ID');

   // delete
   const index = cars.indexOf(car)
   cars.splice(index, 1);

   res.send(cars);
})

/**
 * HELPERS
 */

/**
 * Validate if car has a name
 * 
 * @param {Object} car
 * @param {Object.String} car.name 
 */
function validateCar(car) {
   const schema = {
      name: Joi.string().min(3).required()
   }

   return Joi.validate(car, schema);
}