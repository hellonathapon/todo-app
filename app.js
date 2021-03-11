const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const db = require('./config/db');
const bodyParser = require('body-parser');
const errorHandler = require('./config/errorHandler');
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

// Route
app.use('/', require('./routes')(db))

// Error handling middleware
app.use(errorHandler)

app.listen(port, console.log(`🚀 Server is running on port ${port}`));