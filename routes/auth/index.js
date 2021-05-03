const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (db) {
  router.post("/register", (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    // check if email exists
    db.query(" SELECT email FROM user WHERE email = ?", email, (err, rows) => {
      if (err) {
        next(err);
      }
      if (rows.length) {
        console.log("This email is already in use");
        res.status(404).send();
        return;
      } else {
        // register new user
        // hash password
        bcrypt.hash(password, 8, function (err, hash) {
          // Store user info and hash password DB
          db.query(
            " INSERT INTO user SET ?",
            {
              first_name: firstName,
              last_name: lastName,
              email: email,
              password: hash,
            },
            (err, rows) => {
              if (err) {
                next(err);
              }
              console.log(rows);
              // generate JWT to user
              // TODO: encrypt unsensitive user data into JWT generate
              jwt.sign(
                {
                  exp: Math.floor(Date.now() / 1000) + 60 * 60,
                  data: rows.insertId,
                },
                process.env.JWT_PRIVATE_KEY.replace(/\\n/gm, "\n"),
                { algorithm: "HS256" },
                function (err, token) {
                  console.log(token);
                  if (err) {
                    next(err);
                  }
                  res.status(201).send({ JWT: token });
                }
              );
            }
          );
        });
      }
    });
  });
  return router;
};
