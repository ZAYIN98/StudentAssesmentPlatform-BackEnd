const express = require('express');
const sql = require('../config/mysqlConfig')

const router = new express.Router()

router.post('/', async (req,res) => {
    let userId = req.body.userId
    let userType = req.body.userType
    let query = 'DELETE FROM tokens WHERE userId = ? AND userType = ?'

    try {
        let conn = await sql.getDBConnection();
        await conn.execute(query,[userId,userType])
        res.send('Logged Out')
    } catch (error) {
        
    }
})

module.exports = router