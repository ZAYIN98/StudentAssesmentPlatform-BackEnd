const express = require('express')
var cors = require('cors')
const adminRouter = require('./src/routers/admin')
const lecturerRouter = require('./src/routers/lecturer')
// const session = require('express-session')

const app = express()
const port = 3000
app.use(cors())

app.set('trsut proxy', 1)
// app.use(session({
//     secret:'abcd',
//     resave:false,
//     saveUninitialized:true,
//     cookie:{
//         secure:false
//     }
// }))

app.use(express.json())
app.use('/admin',adminRouter)
app.use('/lecturer',lecturerRouter)

app.listen(port, () => {
    console.log('Server running at port ' + port)
})