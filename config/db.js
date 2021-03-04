const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USRNAME,
    password: process.env.DB_PWD,
})

db.connect(function(err){
    if(err) {
        throw err
    }else{
        console.log('MySql connected!')
    }
})

module.exports = db;