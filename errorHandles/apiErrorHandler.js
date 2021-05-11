const ApiError = require("./ApiError");

function apiErrorHandler(err, req, res, next) {
  // if err is being instantiate with `ApiError`
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }

  /**
   * status 500 indicates `internal server error`,
   * if unexpected/out of the scope of error handling heppens
   * then there should be one specific handler caught that and response the err back to client.
   */
  res.status(500).json("something went wrong :(");
}

module.exports = apiErrorHandler;
