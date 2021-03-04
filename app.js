const express = require('express');
const app = express()
const port = process.env.PORT || 5000;

// route
app.use('/', require('./routes'))

app.listen(port, console.log(`🚀 Server is running on port ${port}`));