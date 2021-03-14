const express = require('express');
const sql = require('../config/mysqlConfig')

const router = new express.Router()

//Login
router.post('/login', async (req,res) => {
    let userName = req.body.userName
    let password = req.body.password
    let query = 'Select * from student where userName = ? and password = ?'

    try {
        let conn = await sql.getDBConnection();
        let [data,fields] = await conn.execute(query,[userName,password])

        if(data.length === 0 || data === undefined){
            res.status(400).send('Invalid login')
        }
        res.status(200).send(data)

    } catch (error) {
        res.status(400).send(error)
    }
})

//Get all Students
router.get('/getAll', async (req,res) => {
    let query = 'Select * from student'
    try {
        let conn = await sql.getDBConnection();
        let [data,fields] = await conn.execute(query)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Add a student
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

//Update a student profile(Admin and lecturer authority)
router.patch('/updateS', async (req,res) => {
    let userName = req.body.userName
    let newUserName = req.body.newUserName
    let password = req.body.password
    let name = req.body.name
    let rollNo = req.body.rollNo
    let email = req.body.email
    let sectionId = req.body.sectionId

    try {
        let conn = await sql.getDBConnection();
        if(newUserName === userName){
            let query = 'UPDATE student SET userName = ?, password = ?, name = ?, rollNo = ?, email = ?, sectionId = ? WHERE student.userName = ?'
            try {
                await conn.execute(query,[userName,password,name,rollNo,email,sectionId,userName])
                res.status(200).send('Updated1')
            } catch (error) {
                res.status(400).send(error)
            }
        }else{
            let query = 'Select * from student where username = ?'
            try {
                let[data,fields] = await conn.execute(query, [newUserName])
                if(data.length === 0 || data.length === undefined){
                    let query2 = 'UPDATE student SET userName = ?, password = ?, name = ?, rollNo = ?, email = ?, sectionId = ? WHERE student.userName = ?'
                    try {
                        await conn.execute(query2,[newUserName,password,name,rollNo,email,sectionId,userName])
                        res.send('Updated2')
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

//Update a student(Restricted Router for students)
router.patch('/restrictedUpdateS', async (req,res) => {
    let userName = req.body.userName
    let password = req.body.password
    let email = req.body.email
    let query = 'UPDATE student SET password = ?, email = ? WHERE student.userName = ?'

    try {
        let conn = await sql.getDBConnection();
        await conn.execute(query,[password,email,userName])
        res.status(200).send('Updated')
    } catch (error) {
        res.status(400).send(error)
    }
})

//Delete Student
router.delete('/deleteS', async (req,res) => {
    let studentId = req.body.studentId
    let query = 'DELETE FROM student WHERE student.studentId = ?'
    try {
        let conn = await sql.getDBConnection();
        await conn.execute(query,[studentId])
        res.status(200).send('Student Deleted')
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router