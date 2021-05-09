const { verifyAccessToken } = require("../utils/jwtUtils");

exports.checkToken = async (req, res, next) => {
  const { token } = req.body;
  console.log(token);
  if (!token) {
    return res.status(401).send();
  }
  try {
    const validateToken = await verifyAccessToken(token);
    console.log(validateToken);
    if (validateToken) {
      req.validateToken = validateToken.data;
      next();
    }
  } catch (err) {
    next(err);
  }
};
