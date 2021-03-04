const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const db = require('./config/db');
require('dotenv').config();

// route
app.use('/', require('./routes')(db))

app.listen(port, console.log(`🚀 Server is running on port ${port}`));