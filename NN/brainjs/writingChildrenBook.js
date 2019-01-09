const brain = require('brain.js');

const trainingData = [
   'Jane saw Doug.',
   'Doug saw Jane.',
   'Spot saw Doug and Jane looking at each other.',
   'It was love at first sight, and Spot had a frontrow seat. It was a very special moment for all.'
 ];

 const net = new brain.recurrent.LSTM();

 net.train(trainingData, {
    iterations: 1500,
    errorThresh: 0.010,
   //  log: stats => console.log(stats)
 });

 console.log(net.run('Jane'))
 console.log(net.run('It was'))