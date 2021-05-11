const express = require("express");
const router = express.Router();
const { signAccessToken } = require("../../utils/jwtUtils");
const { checkToken, checkRegisterCredentials, checkLoginCredentials } = require("../../middlewares");
const { hash, unhash } = require('../../utils/bcryptUtils');
require("dotenv").config();

module.exports = function (db) {

  // POST:register
  router.post("/register", checkRegisterCredentials, async (req, res) => {
    const {firstName, lastName, username, email, password} = req.credentials;

    try {
      // check if email already exists
      /**
       * there are potentially 3 results
       * (1). []: empty array indicate that there is no match
       * (2). [data]: array with data
       * (3). error from executing query
       * the 1 and 2 should be explicitly handled, 3 should pass to errorHandler. 
       */
      const [rows] = await db.execute(" SELECT email FROM users WHERE email = ?",[email]);

      if (rows.length) {
        return res.status(409).send({message: "The email address is already exists, try login instead"});
      } else {
        // hash password
        const hashedPassword = await hash(password);

        // TODO: generate uuid for id;
        // insert into db
        const [ rows, fields, ] = await db.execute("INSERT INTO users (first_name, last_name, username, email, password) values (?,?,?,?)",[firstName, lastName, username, email, hashedPassword]);
        
        // sign a jwt
        const token = await signAccessToken(rows.insertId);

        /**
         * TODO: improve security
         */
        res.status(201).json({"jwt": token});
      }
    } catch (err) {
      /**
       * Why err is thrown here ?
       * route handler as a generic term, it is the last order for handling req/res 
       * there is no next middleware to pass err along to process.
       */
      throw err;
    }
  });

  // POST:login
  router.post("/login", checkLoginCredentials, async (req, res) => {
    const { email, password } = req.credentials;
    // check if email already exists
    try {
      const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email,]);

      if(!rows.length) {
        return res.status(401).send({ message: "Email not found!" });
      }else {
        // unhash and compare password
        const pwd = await unhash(password, rows[0].password); //:boolean

        if (!pwd) {
          return res.status(401).send({ message: "Password incorrect!" });
        } else {
          // sign jwt
          const token = await signAccessToken(rows[0].userId.toString());
          res.status(200).json({"jwt": token});
        }
      }
    } catch (err) {
      throw err;
    }
  });

  // POST:profile
  router.post("/profile", checkToken, async (req, res) => {
    const userId = req.validateToken;
    try {
      const [rows] = await db.execute("SELECT a.first_name, a.last_name, a.email, b.todo_text FROM users a JOIN todos b ON a.userId=b.creatorId WHERE a.userId=?", [parseInt(userId)]);
      res.status(200).send(rows);
    }
    catch(err) {
      throw err;
    }
  });
  return router;
};
