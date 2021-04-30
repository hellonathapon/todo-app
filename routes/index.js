const express = require("express");
const router = express.Router();

module.exports = function (db) {
  router.get("/", (req, res, next) => {
    db.query(" SELECT * FROM todo ", (err, rows) => {
      if (err) {
        /**
         * express auto handle sync err
         * but for async err, it need to explicitly pass to error handler middleware with next.
         */
        next(err);
      }
      res.send(rows);
    });
  });

  router.post("/add", (req, res, next) => {
    const { credential } = req.body;
    if (!credential) {
      return res.status(401).send({ message: "No credential" });
    }
    db.query(" INSERT INTO todo SET ? ", credential, (err, row) => {
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
    db.query(" DELETE FROM todo WHERE id = ? ", credential, (err, result) => {
      if (err) {
        next(err);
      }
      return res
        .status(200)
        .send({ message: `Todo with id: ${credential} is deleted` });
    });
  });
  return router;
};
