const { verifyAccessToken } = require("../utils/jwtUtils");
const ApiError = require("../errorHandles/ApiError");

exports.checkToken = async (req, res, next) => {
  const claimToken =
    req.headers["x-access-token"] ||
    req.headers.authorization ||
    req.body.token;

  console.log(claimToken);
  if (!claimToken) {
    // `sync error` no need to pass to next()
    throw ApiError.unauthorized("Missing token!");
  }
  // extract token
  const token = claimToken.split(" ")[1];
  try {
    const decoded = await verifyAccessToken(token);
    if (!decoded) {
      next(ApiError.unauthorized("Invalid token"));
    } else {
      req.userId = decoded.data;
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
    // req.credentials = { firstName, lastName, email, password };
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
