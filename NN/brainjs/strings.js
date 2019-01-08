const brain = require('brain.js');

const restaurants = {
   "Brilliant Yellow Corral": "Monday",
   "Penny’s": "Tuesday",
   "Right Coast Wings": "Wednesday",
   "The Delusion Last Railway Car": "Thursday",
   "Fun Day Inn": "Friday",
   "JHOP": "Saturday",
   "Owls": "Sunday"
};

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

const trainingData = [];

for (let restaurantName in restaurants) {
   const dayOfTheWeek = restaurants[restaurantName]

   trainingData.push({
      input: { [dayOfTheWeek]: 1 },
      output: { [restaurantName]: 1 }
   })
}

const stats = net.train(trainingData)

console.log(stats);
// console.log(net.run({ 'Monday': 1 }))

function restaurantForDay(dayOfTheWeek) {
   const result = net.run({ [dayOfTheWeek]: 1 });

   let highestValue = 0;
   let highestRestaurantName = '';

   for (let restaurantName in result) {
      if (result[restaurantName] > highestValue) {
         highestValue = result[restaurantName];
         highestRestaurantName = restaurantName;
      }
   }

   return highestRestaurantName;
}

console.log(restaurantForDay('Monday'));
console.log(restaurantForDay('Tuesday'));
console.log(restaurantForDay('Wednesday'));
console.log(restaurantForDay('Thursday'));
console.log(restaurantForDay('Friday'));
console.log(restaurantForDay('Saturday'));
console.log(restaurantForDay('Sunday'));