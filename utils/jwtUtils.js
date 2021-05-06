const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Promisify node.js callback :)
 */
exports.signAsyncJWT = function (payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour.
        data: payload,
      },
      process.env.JWT_PRIVATE_KEY,
      { algorithm: "HS256" },
      function (err, token) {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

exports.verifyAsyncJWT = function (claimtoken) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      claimtoken,
      process.env.JWT_PRIVATE_KEY,
      function (err, verifiedToken) {
        if (err) {
          reject(err);
        } else {
          resolve(verifiedToken);
        }
      }
    );
  });
};
