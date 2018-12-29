const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

const collection = 'todo';


