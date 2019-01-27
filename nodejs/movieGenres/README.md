#### Tinkering with express. 

*mongoDB required*

* start mongoDB
```
$ mongod
```
$ run index.js
```
$ node index.js
```

When we call document update methods one after another we should multi-document transactions. 
In MongoDB we can perform "Two Phase Commits" [docs](https://docs.mongodb.com/v3.2/tutorial/perform-two-phase-commits/).
I mayb do that later on. 