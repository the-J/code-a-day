const assert = require('chai').assert;
const app = require('../app');

const sayHello =  require('../app').sayHello;
const addNumbers =  require('../app').addNumbers;

describe('App', function() {
   // sayHello
   it('"sayHello" function should return "hello"', function() {
      let result = sayHello();
      assert.equal(result, 'hello');
   })

   it('"sayHello" should return type string', function() {
      let result = sayHello();
      assert.typeOf(result, 'string');
   })

   // addNumbers
   it('"addNum(2, 3)" should return 5', function() {
      let result = addNumbers(2,3);
      assert.equal(result, 5);
   })

   it('"addNum(X, X)" should return number', function() {
      let result = addNumbers(2,3);
      assert.typeof(result, 'number');
   })
})