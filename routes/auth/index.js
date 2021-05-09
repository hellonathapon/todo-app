const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { signAccessToken, signRefreshToken } = require("../../utils/jwtUtils");
const { checkToken } = require("../../middlewares");
const { hash, unhash } = require('../../utils/bcryptUtils');
require("dotenv").config();

/**
 * TODO: improve security on token
 * simply store token in client localStorage is valuability to XSS acttacts
 */

module.exports = function (db) {
  router.post("/register", async (req, res, next) => {

    try {
      // check if email exists
      const [rows] = await db.execute(" SELECT email FROM user WHERE email = ?",[email]);

      if (rows.length) {
        return res.status(409).send({message: "The email is already exists, try login instead :)",});
      } else {
        // hash password
        const hashedPwd = await bcrypt.hash(password, 8);
        // insert into db
        const [rows,fields,] = await db.execute("INSERT INTO user (first_name, last_name, email, password) values (?,?,?,?)",[firstName, lastName, email, hashedPwd]);
        
        const token = await signAccessToken(rows.insertId);
        res.status(201).json({"jwt": token});
      }
    } catch (err) {
      next(err);
    }
  });

  router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    console.log('hit login')
    // check credentials
    if (!(email && password)) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    // check email in db.
    try {
      const [rows] = await db.execute("SELECT * FROM user WHERE email = ?", [email,]);

      /**
       * NOTE: [] empty arr !== error
       */
      if(!rows.length) {
        return res.status(401).send({ message: "Email not found!" });
      }else {
        // unhash and compare password
        const pwd = await unhash(password, rows[0].password); //:boolean
        if (pwd) {
          const token = await signAccessToken(rows[0].userId.toString());
          console.log(token)
          res.status(200).json({"jwt": token});
        } else {
          return res.status(401).send({ message: "Password incorrect!" });
        }
      }
    } catch (err) {
      next(err);
    }
  });

  router.post("/profile", checkToken, async (req, res) => {
    const userId = req.validateToken;
    try {
      const [rows] = await db.execute("SELECT a.first_name, a.last_name, a.email, b.todo_text FROM user a JOIN todo_list b ON a.userId=b.creatorId WHERE a.userId=?", [parseInt(userId)]);
      res.status(200).send(rows);
    }
    catch(err) {
      console.log(err);
    }
  });
  return router;
};
