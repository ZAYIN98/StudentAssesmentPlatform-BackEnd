const express = require('express');
const sql = require('../config/mysqlConfig')

const router = new express.Router()

router.post('/login', async (req,res) => {
    let userName = req.body.userName
    let password = req.body.password
    let query = 'Select * from admin where userName = ? and password = ?'

    try {
        let conn = await sql.getDBConnection();
        let [data,fields] = await conn.execute(query,[userName,password])

        if(data.length === 0 || data === undefined){
            res.status(400).send('Invalid login')
        }

        res.send(data)

    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/addA', async (req,res) => {
    let userName = req.body.userName
    let password = req.body.password
    let email = req.body.email
    let query = 'Select * from admin where username = ?'
    
    try {
        let conn = await sql.getDBConnection();
        let [data,fields] = await conn.execute(query,[userName])
        if(data.length === 0 || data === undefined){
            let query2 = 'INSERT INTO admin (email, userName, password) VALUES ( ? , ? , ?)'
            try {
                await conn.execute(query2,[email,userName,password,])
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

router.patch('/updateA', async (req,res) => {
    let userName = req.body.userName
    let newUserName = req.body.newUserName
    let email = req.body.email
    let password = req.body.password

    try {
        let conn = await sql.getDBConnection();
        if(newUserName === userName){
            let query = 'UPDATE admin SET email = ? , userName = ?, password = ? WHERE admin.userName = ?'
            try {
                await conn.execute(query,[email,userName,password,userName])
                res.status(200).send('Updated')
            } catch (error) {
                res.status(400).send(error)
            }
        }else{
            let query = 'Select * from admin where username = ?'
            try {
                let[data,fields] = await conn.execute(query, [newUserName])
                if(data.length === 0 || data.length === undefined){
                    let query2 = 'UPDATE admin SET email = ? , userName = ?, password = ? WHERE admin.userName = ?'
                    try {
                        await conn.execute(query2,[email,newUserName,password,userName])
                        res.send('Updated')
                    } catch (error) {
                        res.status(400).send(error)
                    }
                }
                else{
                    res.status(400).send('Username Taken')
                }
            } catch (error) {
                res.status(400).send(error)
            }
        }
    } catch (error) {
        res.status(400).send(error)
    }

})

router.delete('/deleteA', async (req,res) => {
    let userName = req.body.userName
    let query = 'DELETE FROM admin WHERE admin.userName = ?'

    try {
        let conn = await sql.getDBConnection();
        await conn.execute(query,[userName])
        res.status(200).send('Admin Deleted')
    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports = router