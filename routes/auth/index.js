const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (db) {
  router.post("/register", async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    try {
      // check if email exists
      const [rows] = await db.execute(
        " SELECT email FROM user WHERE email = ?",
        [email]
      );
      console.log(rows);

      if (rows.length) {
        // this email address is exists try another one maybe :)
        return res.status(409).send({
          message: "The email is already exists, try login instead :)",
        });
      } else {
        // register new user
        // hash password
        const hashedPwd = await bcrypt.hash(password, 8);
        // insert into db
        const [
          rows,
        ] = await db.execute(
          "INSERT INTO user (first_name, last_name, email, password) values (?,?,?,?)",
          [firstName, lastName, email, hashedPwd]
        );
        // generate JWT
        jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: rows.insertId,
          },
          process.env.JWT_PRIVATE_KEY,
          { algorithm: "HS256" },
          function (err, token) {
            // NEXT: set token in client cookie
            if (err) {
              next(err);
            }
            console.log("jwt", token);
            res
              .cookie("jwt", token, {
                maxAge: 900000,
                httpOnly: true,
                secure: false,
              })
              .json({ message: "Register successfully :)" });
          }
        );

        // res.status(201).send({ message: "Register successfully!" });
      }
    } catch (err) {
      next(err);
    }
  });

  router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
  });
  return router;
};
