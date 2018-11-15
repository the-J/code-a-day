//   esversion: 6
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const validator = require('express-validator')
const ejs = require('ejs')
const engine = require('ejs-mate')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const flash = require('connect-flash')

const port = 8080

const app = express()

//  connection for database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/rateme') //  for one database/ connects - for many

require('./config/passport')
require('./secret/secret')

app.use(express.static('public')) //  us e files from public file
app.engine('ejs', engine) //  pick engine and target it
app.set('view engine', 'ejs') //  pick view angine
app.set('views', __dirname + '/views')
app.use(cookieParser()) //  to keep data from browser
app.use(bodyParser.urlencoded({ extended: true })) //  for keeped values
app.use(bodyParser.json()) //  type of file
app.use(validator()) // validator after body parser
//  for express session this must by placed
app.use(session({
  secret: 'Thisismytestkey',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})   //  for database
}))
app.use(flash()) // passport after the session - flash required
app.use(passport.initialize())
app.use(passport.session())

require('./routes/user')(app, passport)
require('./routes/company')(app)
require('./routes/review')(app)

app.listen(port, () => {
  console.log('server listening on ', port)
})
