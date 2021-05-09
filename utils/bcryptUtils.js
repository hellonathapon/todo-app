const util = require("util");
const bcrypt = require("bcrypt");
require("dotenv").config();
const salt = 8;

exports.hash = async (n) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(n, salt, (err, hashed) => {
      if (err) {
        return reject(err);
      }
      resolve(hashed);
    });
  });
};
exports.unhash = async (a, b) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(a, b, (err, unhash) => {
      if (err) {
        return reject(err);
      }
      resolve(unhash);
    });
  });
};
