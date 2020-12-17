const express = require('express')
const adminRouter = require('./src/routers/admin')


const app = express()
const port = 3000

app.use(express.json())
app.use('/admin',adminRouter)
// sql.pool().query('SELECT * FROM `admin`', function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
//   });

app.listen(port, () => {
    console.log('Server running at port ' + port)
})