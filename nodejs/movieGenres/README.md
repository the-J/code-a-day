#### Tinkering with express. 

* "Two Phase Commits" with Fawn package
* destructuring mondogoDB _id
   _id: 5c50111e843bdc45318c4bd9 // 12 bytes
      // 4 bytes: timestamp
      // 3 bytes: machine indentifier
      // 2 bytes: process identifier
      // 3 bytes: counter

   // 1 byte = 7 bits
   // 2 ^ 7 = 256
   // 2 ^ 24 = 16M -> db overflow

*mongoDB required*

* start system
```
$ mongod
```
$ run index.js
```
$ node index.js
```

When we call document update methods one after another we should multi-document transactions. 
In MongoDB we can perform "Two Phase Commits" with Fawn package [docs](https://docs.mongodb.com/v3.2/tutorial/perform-two-phase-commits/).
