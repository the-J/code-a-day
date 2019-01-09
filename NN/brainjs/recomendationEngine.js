const brain = require('brain.js');

// Reainforcement Learning

// color preference
const trainingData = [
   { input: { blue: 1 }, output: [1] },
   { input: { red: 1 }, output: [1] },
   { input: { black: 1 }, output: [0] },
   { input: { green: 1 }, output: [0] },
   { input: { brown: 1 }, output: [0] },
];

const net = new brain.NeuralNetwork();

net.train(trainingData);
// , { log: stats => console.log(stats) });

console.log('before');
console.log(Array.from(net.run({ blue: 1 })));
console.log(Array.from(net.run({ brown: 1 })));

// new preferences
trainingData.pop();
trainingData.push(
   { input: { brown: 1 }, output: [1] }
);

net.train(trainingData);
// , {log: stats => console.log(stats)});

console.log('after change');
console.log(Array.from(net.run({ blue: 1 })));
console.log(Array.from(net.run({ brown: 1 })));
