const express = require('express');
const sql = require('../config/mysqlConfig')

const router = new express.Router()

router.post('/addS', async (req,res) => {
    let userName = req.body.userName
    let password = req.body.password
    let email = req.body.email
    let name = req.body.name
    let rollNo = req.body.rollNo
    let sectionId = req.body.sectionId
    let query = 'Select * from student where username = ?'
    
    try {
        let conn = await sql.getDBConnection();
        let [data,fields] = await conn.execute(query,[userName])
        if(data.length === 0 || data === undefined){
            let query2 = 'INSERT INTO student (userName, password, name, rollNo, email, sectionId) VALUES (?, ?, ?, ?, ?, ?)'
            try {
                await conn.execute(query2,[userName,password,name,rollNo,email,sectionId])
                res.send('Inserted')
            } catch (error) {
                res.status(400).send(error)
            }
        }else{
            res.status(400).send('Username Taken')
        }
        
    } catch (error) {
        res.status(401).send(error)
    } 
})


module.exports = router