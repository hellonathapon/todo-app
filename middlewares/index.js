const { verifyAccessToken } = require("../utils/jwtUtils");
const ApiError = require("../errorHandles/ApiError");

exports.checkToken = async (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    // `sync error` no need to pass to next()
    throw ApiError.unauthorized("Missing token!");
  }

  try {
    const decoded = await verifyAccessToken(token);
    if (!decoded) {
      next(ApiError.unauthorized("Invalid token"));
    } else {
      req.validateToken = decoded.data;
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.checkRegisterCredentials = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!(firstName && lastName && email && password)) {
    // `sync error` no need to pass to next()
    throw ApiError.unauthorized("Missing Credentials");
  } else {
    // append credentials to `req` to be used in the next middleware/route
    req.credentials = { firstName, lastName, email, password };
    next();
  }
};

exports.checkLoginCredentials = (req, res, next) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    throw ApiError.unauthorized("Missing Credentials");
  } else {
    req.credentials = { email, password };
    next();
  }
};
