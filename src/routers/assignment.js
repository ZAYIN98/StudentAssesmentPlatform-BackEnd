const express = require('express');
const sql = require('../config/mysqlConfig')
const auth2 = require('../middleware/lecturerAuth')
const multer = require('multer')
const fs = require("fs");
var path = require('path')

const router = new express.Router()
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })

  
//Create an assignment
router.post('/createAssignment',auth2, upload.single('resourceMaterial'), async (req,res) => {
    const file = req.file
    // let name = req.body.name
    // let lecturerId = req.body.lecturerId
    // let details = req.body.details
    // let helpingMaterial = req.body.helpingMaterial
    // let query = 'INSERT INTO assignment(title, lecturerId, details, resourceLinks, resourceMaterial, solution) VALUES (?,?,?,?,?,?)'
    console.log("resourceMaterial:", req.body)
    try {
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            console.log(error) 
          }
        // let conn = await sql.getDBConnection();
        // await conn.execute(query,[name,lecturerId,details,helpingMaterial])
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