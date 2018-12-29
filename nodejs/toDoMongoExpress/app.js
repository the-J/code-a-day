const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = 3000;

const db = require('./db');

const app = express();
app.use(bodyParser.json());

const collection = 'todo';

db.connect(err => {
    if (err) {
        console.log('db connection err', err);
        process.exit(1);
    }
    else {
        app.listen(port, () => {
            console.log(`connected to db on port ${port}`);
        });
    }
});
