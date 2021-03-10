const express = require('express');
const router = express.Router();

module.exports = function(db){
    router.get('/', (req, res) => {
        db.query(' SELECT * FROM todo ', (err, rows) => {
            if(err){
                throw err
            }
            res.send(rows)

        })
    })

    router.post('/add', (req, res) => {
        const { credential } = req.body;
        if(!credential){
            return res.status(401).send({message: 'No credential'})
        }
        db.query(' INSERT INTO todo SET ? ', credential, (err, row) => {
            if(err){
                throw err;
            }
            console.log(row)
            return res.status(201).json({id: row.insertId})
        })
    })

    router.delete('/delete', (req, res) => {
        const { credential } = req.query;       // `todo id` is passed as params 
        if(!credential){
            return res.status(404).send();
        }
        db.query(' DELETE FROM todo WHERE id = ? ', credential, (err, result) => {
            if(err){
                throw err;
            }
            console.log(result)
            return res.status(200).send({message: `Todo with id: ${credential} is deleted`})

        })
    })
    return router;
}