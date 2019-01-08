const brain = require('brain.js');

const net = new brain.NeuralNetwork({ hiddenLayers: [3] })

const trainingData = [
   { input: [0, 0], output: [0] },
   { input: [0, 1], output: [1] },
   { input: [1, 0], output: [1] },
   { input: [1, 1], output: [0] },
]

net.train(trainingData, {
   log: error => console.log(error),
   logPeriod: 100
});

console.group(net.run([0, 0]))
console.group(net.run([1, 1]))
console.group(net.run([1, 0]))
console.group(net.run([0, 1]))