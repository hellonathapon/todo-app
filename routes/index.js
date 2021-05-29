const express = require("express");
const router = express.Router();

module.exports = function (db) {
  router.get("/", async (req, res) => {
    // verify token and response back user
    
    // fetch public todos
    try {
      const [rows] = await db.execute("SELECT a.id, a.text, a.created_at, a.due_date, b.first_name, b.last_name FROM todos a JOIN users b WHERE a.creatorId = b.id");
      res.status(200).json({todos: rows});
    }catch(err) {
      throw err;
    }
  });

  // POST:/todo/add
  router.post("/add", async (req, res) => {
    const { text, due_date, created_at, creatorId } = req.body;
    if (!(text && due_date && created_at, creatorId)) {
      return res.status(401).send({ message: "No credential" });
    }
    try {
      const [rows] = await db.execute(" INSERT INTO todos (text, created_at, due_date, creatorId) VALUES (?,?,?,?)", [text, created_at, due_date, parseInt(creatorId)])
      return res.status(201).json({"insertId": rows.insertId});
    }catch(err) {
      throw err;
    }
    
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


