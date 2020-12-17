const express = require('express')
const sql = require('../db/mysqlConfig')

const router = new express.Router()

router.get('/', async (req, res) => {
    try {
        let query = 'SELECT * FROM admin';
        let conn = await sql.getDBConnection();
        let [data, fields] = await conn.query(query);
        res.send(data)
    } catch (error) {
        throw error
    }

    
    
    
})

module.exports = router