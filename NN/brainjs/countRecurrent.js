const brain = require('brain.js');

// count to 5

const trainingData = [
   [1, 2, 3, 4, 5],
   [5, 4, 3, 2, 1]
];

const net = new brain.recurrent.LSTMTimeStep();

net.train(trainingData);

// console.log(net.run([1, 2, 3, 4]))
// console.log(net.run([5, 4, 3, 2]))



const trainingData2 = [
   [5, 6, 7, 8, 9],
   [9, 8, 7, 6, 5]
];

const net2 = new brain.recurrent.LSTMTimeStep();

net2.train(trainingData2);

console.log(net2.run([5, 6, 7, 8]))
console.log(net2.run([9, 8, 7, 6]))