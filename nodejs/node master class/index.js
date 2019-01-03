const express = require('express')
const app = express();

// Middleware for parsing body by default
app.use(express.json);

const cars = [
   {id: 1, name: 'car1'},
   {id: 2, name: 'car2'},
   {id: 3, name: 'car3'}
]

// GET methods
app.get('/', (req, res) => {
   res.send('Hello world!!!');
   res.end();
});

app.get('/api/cars/', (req, res) => {
   res.send(cars);
   res.end();
})

app.get('/api/cars/:id', (req, res) => {
   const car = cars.find(car => car.id === parseInt(req.params.id))
   
   if(!car) res.status(404).send('No car found');

   res.send(car);
   res.end();
});

// POST methods
app.post('/api/car', (re, res) => {
   const car = {
      id: cars.length + 1,
      name: req.body.name
   }

   cars.push(car);
   res.send(car);
});

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening on port ${port}`));