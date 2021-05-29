const express = require("express");
const router = express.Router();
const { signAccessToken, verifyAccessToken } = require("../../utils/jwtUtils");
const { checkToken, checkRegisterCredentials, checkLoginCredentials } = require("../../middlewares");
const { hash, unhash } = require('../../utils/bcryptUtils');
require("dotenv").config();

module.exports = function (db) {

  // POST:register
  router.post("/register", checkRegisterCredentials, async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    try {
      /**
       * there are potentially 3 results
       * (1). []: empty array indicates that there is no match
       * (2). [data]: array with data
       * (3). error from executing query
       */
      // check if email already exists
      const [rows] = await db.execute(" SELECT email FROM users WHERE email = ?",[email]);

      if (rows.length) {
        return res.status(409).send({message: "The email address is already exists, try login instead"});
      } else {
        // hash password
        const hashedPassword = await hash(password);

        await db.execute("INSERT INTO users (first_name, last_name, email, password) values (?,?,?,?)",[firstName, lastName, email, hashedPassword]);
        res.status(201).json({"message": "Registered successfully"});
      }
    } catch (err) {
      throw err;
    }
  });

  // POST:login
  router.post("/login", checkLoginCredentials, async (req, res) => {
    const { email, password } = req.credentials;
    // check if email already exists
    try {
      const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email,]);
      console.log(rows[0])
      if(!rows.length) {
        return res.status(402).send({ message: "Email not found!" });
      }else {
        // unhash and compare password
        const pwd = await unhash(password, rows[0].password); //:boolean

        if (!pwd) {
          return res.status(401).send({ message: "Password incorrect!" });
        } else {
          // retrieve user data
          // sign jwt
          const token = await signAccessToken(rows[0].id.toString());
          if(token) {
            res.status(200).json({"jwt": token});
          }
        }
      }
    } catch (err) {
      throw err;
    }
  });

  // POST:profile
  router.post("/profile", checkToken, async (req, res) => {
    const { userId } = req;
    try {
      // select todos and user info
      const [rows] = await db.execute("SELECT a.id, a.first_name, a.last_name, a.email, b.text, b.created_at, b.due_date FROM users a JOIN todos b ON a.id=b.creatorId WHERE a.id=?", [parseInt(userId)]);
      if(!rows.length) {
        // if user has no todo the above query returns empty array So just grab user info.
        const [user] = await db.execute("SELECT id, first_name, last_name, email FROM users WHERE id = ?", [parseInt(userId)]);
        return res.status(200).send({"user": user});
      }else {
        return res.status(200).json({"user": rows});
      }
      
    }
    catch(err) {
      throw err;
    }
  });
  return router;
};
