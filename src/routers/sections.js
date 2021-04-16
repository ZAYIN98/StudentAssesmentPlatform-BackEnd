const express = require('express');
const sql = require('../config/mysqlConfig')
const auth = require('../middleware/adminAuth')

const router = new express.Router()

router.post('/getSections', auth, async (req,res) => {
    let query = 'SELECT section.sectionId AS sectionId,section.section, COUNT(DISTINCT lecturerassigned.lecturerId) AS totalLecturers, COUNT(DISTINCT studentsection.studentId) AS students FROM section LEFT JOIN lecturerassigned ON section.sectionId = lecturerassigned.sectionId LEFT JOIN studentsection ON section.sectionId = studentsection.sectionId GROUP BY sectionId'
    try {
        let conn = await sql.getDBConnection();
        let [data,fields] = await conn.execute(query)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/getSection', auth, async (req,res) => {
    let sectionId = req.body.sectionId
    let query = 'SELECT * FROM section WHERE sectionId=? '
    try {
        let conn = await sql.getDBConnection();
        let [data,fields] = await conn.execute(query, [sectionId])
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/getRecentSections', auth, async (req,res) => {
    let query = 'SELECT section.sectionId AS sectionId,section.section, COUNT(DISTINCT lecturerassigned.lecturerId) AS totalLecturers, COUNT(DISTINCT studentsection.studentId) AS students FROM section LEFT JOIN lecturerassigned ON section.sectionId = lecturerassigned.sectionId LEFT JOIN studentsection ON section.sectionId = studentsection.sectionId GROUP BY sectionId ORDER BY section.sectionId DESC LIMIT 8'
    try {
        let conn = await sql.getDBConnection();
        let [data,fields] = await conn.execute(query)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/getlecturerAtRiskStudents', auth, async (req,res) => {
    let query = 'SELECT lecturerassigned.lecturerId AS id, name, COUNT(DISTINCT lecturerassigned.sectionId) AS totalSections, COUNT(DISTINCT atriskstatus.studentId) AS totalStudents FROM lecturer INNER JOIN lecturerassigned on lecturer.lecturerId = lecturerassigned.lecturerId INNER JOIN studentsection ON studentsection.sectionId = lecturerassigned.sectionId INNER JOIN atriskstatus ON atriskstatus.studentId = studentsection.studentId AND atriskstatus.subjectId = lecturerassigned.subjectId GROUP BY lecturerassigned.lecturerId ORDER BY lecturerassigned.lecturerId DESC LIMIT 8'
    try {
        let conn = await sql.getDBConnection();
        let [data,fields] = await conn.execute(query)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/getAssignedLecturers', auth, async (req,res) => {
    let sectionId = req.body.sectionId
    let query = 'SELECT name, lecturer.lecturerId AS lecturerId, email, subject, COUNT(DISTINCT studentsubject.studentId) AS totalStudents, COUNT(DISTINCT atriskstatus.studentId) AS totalAtRisk FROM lecturer LEFT JOIN lecturerassigned ON lecturer.lecturerId = lecturerassigned.lecturerId LEFT JOIN section ON section.sectionId = lecturerassigned.sectionId LEFT JOIN studentsection ON section.sectionId = studentsection.sectionId LEFT JOIN studentsubject ON studentsection.studentId = studentsubject.stdSubjectId AND lecturerassigned.subjectId = studentsubject.subjectId LEFT JOIN subject ON subject.subjectId = lecturerassigned.subjectId LEFT JOIN atriskstatus ON atriskstatus.studentId = studentsubject.studentId AND lecturerassigned.subjectId = atriskstatus.subjectId WHERE section.sectionId=? GROUP BY lecturer.lecturerId'
    try {
        let conn = await sql.getDBConnection();
        let [data,fields] = await conn.execute(query, [sectionId])
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/getSectionStudents', auth, async (req,res) => {
    let sectionId = req.body.sectionId
    let query = 'SELECT student.studentId AS studentId, name, email, rollNo, COUNT(DISTINCT studentsubject.subjectId) as totalSubjects FROM student LEFT JOIN studentsection ON student.studentId = studentsection.studentId LEFT JOIN studentsubject ON studentsubject.studentId = student.studentId WHERE studentsection.sectionId = ? GROUP BY student.studentId'
    try {
        let conn = await sql.getDBConnection();
        let [data,fields] = await conn.execute(query, [sectionId])
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router