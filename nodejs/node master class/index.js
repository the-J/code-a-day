const express = require('express')
const app = express();

const cars = [
   {id: 1, name: 'car1'},
   {id: 2, name: 'car2'},
   {id: 3, name: 'car3'}
]

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

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening on port ${port}`));