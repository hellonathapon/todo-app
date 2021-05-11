const express = require("express");
const router = express.Router();

module.exports = function (db) {
  router.get("/", async (req, res) => {
    // fetch public todos
    try {
      const [rows] = await db.execute("SELECT * from todos");
      res.status(200).json({todos: rows});
    }catch(err) {
      throw err;
    }
  });

  router.post("/add", (req, res, next) => {
    const { credential } = req.body;
    if (!credential) {
      return res.status(401).send({ message: "No credential" });
    }
    db.query(" INSERT INTO todo_list SET ? ", credential, (err, row) => {
      if (err) {
        next(err);
      }
      // response `id` back to the front-end for storing locally.
      return res.status(201).json({ id: row.insertId });
    });
  });

  router.delete("/delete", (req, res, next) => {
    const { credential } = req.query; // `todo id` is passed as params
    if (!credential) {
      return res.status(404).send();
    }
    db.query(
      " DELETE FROM todo_list WHERE id = ? ",
      credential,
      (err, result) => {
        if (err) {
          next(err);
        }
        return res
          .status(200)
          .send({ message: `Todo with id: ${credential} is deleted` });
      }
    );
  });
  return router;
};


