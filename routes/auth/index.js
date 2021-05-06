const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { signAsyncJWT, verifyAsyncJWT } = require("../../utils/jwtUtils");
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
          fields,
        ] = await db.execute(
          "INSERT INTO user (first_name, last_name, email, password) values (?,?,?,?)",
          [firstName, lastName, email, hashedPwd]
        );
        // generate JWT
        const token = await signAsyncJWT(rows.insertId);

        // finally, Set JWT in client cookies for authentication from any subsequent requests
        res
          .cookie("jwt", token, {
            maxAge: 900000,
            httpOnly: true,
            secure: false,
          })
          .json({ message: "Register successfully!" });
      }
    } catch (err) {
      next(err);
    }
  });

  router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    // check credentials
    if (!(email && password)) {
      return res.status(401).send({ message: "Unauthorized" });
    } else {
      // check email in db.
      try {
        const [
          rows,
        ] = await db.execute(
          "SELECT email, password FROM user WHERE email = ?",
          [email]
        );
        if (!rows.length) {
          // no user with claim email :(
          return res
            .status(401)
            .send({ message: "Umm we cannot find that email address :(" });
        } else {
          // NEXT: unhash and compare password
          const auth = await bcrypt.compare(password, rows[0].password);
          if (auth) {
            // generate JWT
            // TODO: well what should i use for public key to generate JWT ? email ? nope, or password ? no way
            // ummmmmmmmm big brain time :)
            const token = await signAsyncJWT(rows);
          } else {
            return res.status(401).send({ message: "Password incorrect!" });
          }
        }
      } catch (err) {
        next(err);
      }
    }
  });

  router.post("/profile", checkAuth, async (req, res, next) => {
    res.status(200).send({ message: "Auth" });
  });
  return router;
};

const checkAuth = async (req, res, next) => {
  const claimToken = req.cookies["jwt"];
  // check token in cookies
  if (!claimToken) {
    return res.status(401).send();
  } else {
    try {
      // check claim token
      const verifiedToken = await verifyAsyncJWT(claimToken);
      req.verifiedToken = verifiedToken;
      next();
    } catch (err) {
      next(err);
    }
  }
};
