const mysql = require("mysql");
const Logger = require("../lib/Logger");
require("dotenv").config();

if (process.env.NODE_ENV === "production") {
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
} else {
  const db = mysql.createPool({
    host: process.env.DEV_DB_HOST,
    user: process.env.DEV_DB_USRNAME,
    password: process.env.DEV_DB_PWD,
    database: process.env.DEV_DB_NAME,
  });

  db.on("connection", function (connection) {
    console.log("MySQL localhost connected!");

    connection.on("error", function (err) {
      console.error(err);
    });

    connection.on("close", function (err) {
      console.log(err);
    });
  });
  module.exports = db;
}
