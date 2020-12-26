const express = require('express');
const sql = require('../config/mysqlConfig')

const router = new express.Router()

//Create an assignment
router.post('/createAssignment', async (req,res) => {
    let name = req.body.name
    let lecturerId = req.body.lecturerId
    let details = req.body.details
    let helpingMaterial = req.body.helpingMaterial
    let query = 'INSERT INTO assignment(name, lecturerId, details, helpingMaterial) VALUES (?,?,?,?)'

    try {
        let conn = await sql.getDBConnection();
        await conn.execute(query,[name,lecturerId,details,helpingMaterial])
        res.status(200).send('Inserted assignment')
    } catch (error) {
        res.status(400).send(error)
    }
})

//Get all Lecturer assignments
router.post('/getAll', async (req,res) => {
    let lecturerId = req.body.lecturerId
    let query = 'Select * From assignment Where assignment.lecturerId = ?'

    try {
        let conn = await sql.getDBConnection();
        let [data,fields] = await conn.execute(query,[lecturerId])
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Assign an assignment
router.post('/assign', async (req,res) => {
    let assigmentId = req.body.assigmentId
    let sectionId = req.body.sectionId
    let due = req.body.due
    let query = 'INSERT INTO assignedassignment(assignmentId, sectionId, due) VALUES (?,?,?)'

    try {
        let conn = await sql.getDBConnection();
        await conn.execute(query,[assigmentId,sectionId,due])
        res.status(200).send('assigned')
    } catch (error) {
        res.status(400).send(error)
    }
})

//Get all assigned assignments
router.post('/getAllAssigned', async (req,res) => {
    let lecturerId = req.body.lecturerId
    let query = 'Select * From assignedassignment left join assignment on assignedassignment.assignmentId = assignment.assignmentId Where assignment.lecturerId = ?'

    try {
        let conn = await sql.getDBConnection();
        let [data,fields] = await conn.execute(query,[lecturerId])
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router