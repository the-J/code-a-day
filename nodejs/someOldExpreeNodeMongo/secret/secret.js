// things we dont want to be public
module.exports = {
  auth: {
    user: 'asfalt09@gmail.com',
    pass: '24.Pomarancze/%'
  },

  facebook: {
    clientID: '1374876942582908',
    clientSecret: 'e292c63b47ab84c67294c81ea9884463',
    profileFields: ['email', 'displayName'], // 'firstName', ;'lastName'
    callbackURL: 'http://localhost:8080/auth/facebook/callback',
    passReqToCallback: true // for signup and login
  }
}
