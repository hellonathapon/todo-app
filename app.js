const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const db = require('./config/db');
const bodyParser = require('body-parser');
require('dotenv').config();

// CORS middleware
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Accept, Origin, Access-Control-Allow-Headers, X-Requested-With, content-type, Access-Control-Request-Headers');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route
app.use('/', require('./routes')(db))

app.listen(port, console.log(`🚀 Server is running on port ${port}`));