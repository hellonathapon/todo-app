const Logger = require("../utils/Logger");

function errorHandler(err, req, res, next) {
  // if (res.headersSent) {
  //   return next(err);
  // }
  Logger.error(err);
  res.status(500).send(err);
  return;
}

module.exports = errorHandler;
