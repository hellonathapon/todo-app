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
        //...
    })

    router.put('/update', (req, res) => {
        //...
    })

    router.delete('/delete', (req, res) => {
        //...
    })



    return router;
}