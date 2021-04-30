const mysql = require("mysql");
require("dotenv").config();
const Logger = require("../lib/Logger");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USRNAME,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

db.on("connection", function (connection) {
  Logger.info(`Database connected!`);

  connection.on("error", function (err) {
    Logger.error(`MySQL error`);
  });

  connection.on("close", function (err) {
    Logger.warn(`MySQL closed`);
  });
});

module.exports = db;
