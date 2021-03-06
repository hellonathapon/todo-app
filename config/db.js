const mysql = require("mysql2/promise");
const Logger = require("../utils/Logger");
require("dotenv").config();

/**
 * connection is promisify
 */

if (process.env.NODE_ENV === "production") {
  const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USRNAME,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
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
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
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
