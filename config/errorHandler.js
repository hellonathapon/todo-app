const Logger = require("../lib/Logger");

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  Logger.error(err);
  res.status(500).send({ error: err });
}

module.exports = errorHandler;
