const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./config/db");
const errorHandler = require("./config/errorHandler");
require("dotenv").config();
const Logger = require("./lib/Logger");
const morganMiddleware = require("./config/morganMiddleware");

// http logger
app.use(morganMiddleware);

// CORS middleware
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Accept, Origin, Access-Control-Allow-Headers, X-Requested-With, content-type, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route
app.use("/", require("./routes")(db));

// Serve static vue built stuffs
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, Logger.info(`Server is running on port ${PORT}`));
