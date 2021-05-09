const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signAccessToken = async (userId) => {
  const payload = { data: userId };
  const secret = process.env.JWT_ACCESS_PRIVATE_KEY;
  const options = {
    algorithm: "HS256",
    expiresIn: "20s",
    issuer: "nathapon",
  };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(token);
    });
  });
};

exports.signRefreshToken = async (userId) => {
  const payload = { data: userId };
  const secret = process.env.JWT_REFRESH_PRIVATE_KEY;
  const options = {
    algorithm: "HS256",
    expiresIn: "7d",
    issuer: "nathapon",
  };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(token);
    });
  });
};

exports.verifyAccessToken = async (token) => {
  const secret = process.env.JWT_ACCESS_PRIVATE_KEY;
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, verifiedToken) => {
      if (err) {
        return reject(err);
      }
      resolve(verifiedToken);
    });
  });
};
