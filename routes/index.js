const express = require('express');
const router = express.Router();

module.exports = function(db){
    router.get('/', (req, res) => {
        db.query(' SELECT * FROM todo ', (err, rows) => {
            if(err){
                throw err
            }
            console.log(rows)
        })
        res.send({hi: ":)"})
    })

    return router;
}