
#### ABOUT
Tinkering with express. 
* Four api endpoints + authentication and authorization.
* Working with postman to simulate API requests.
* [JSON Web Token](http://jwt.io)

* App allows to autologin after creating account - no email validation or so - by setting user create response x-auth-token in header.

#### NOTES
   * "Two Phase Commits" with Fawn package

      When we call document update methods one after another we should multi-document transactions. 
      In MongoDB we can perform "Two Phase Commits" with Fawn package [docs](https://docs.mongodb.com/v3.2/tutorial/perform-two-phase-commits/).

   * destructuring mondogoDB ```_id```
      
         _id: 5c50111e843bdc45318c4bd9 -> 12 bytes

         4 bytes: timestamp
         3 bytes: machine indentifier
         2 bytes: process identifier
         3 bytes: counter

         1 byte = 8 bits
         2 ^ 7 = 256
         2 ^ 24 = 16M -> db overflow

#### SETUP
*mongoDB required*

```
$ mongod
```
```
$ node index.js
```