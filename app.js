const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const db = require('./config/db');
require('dotenv').config();

// CORS middleware
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// route
app.use('/', require('./routes')(db))

app.listen(port, console.log(`🚀 Server is running on port ${port}`));