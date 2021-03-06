const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./config/db");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const Logger = require("./utils/Logger");
const morganMiddleware = require("./config/morganMiddleware");
const apiErrorHandler = require("./errorHandles/apiErrorHandler");
const cors = require('cors');

// http logger
app.use(morganMiddleware);
app.use(cookieParser());
// app.use(cors());
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
app.use("/todo", require("./routes")(db));
app.use("/auth", require("./routes/auth")(db));

// Serve static vue built stuffs
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

// Error handling middleware
app.use(apiErrorHandler);

app.listen(PORT, Logger.info(`Server is running on port ${PORT}`));
