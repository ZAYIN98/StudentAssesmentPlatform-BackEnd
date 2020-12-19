var mysql = require('mysql');

const pool  = () =>{
    return mysql.createPool({
        connectionLimit : 10,
        host            : 'localhost',
        user            : 'root',
        password        : '',
        database        : 'sap'
      });
} 
 
// pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

module.exports = {pool}