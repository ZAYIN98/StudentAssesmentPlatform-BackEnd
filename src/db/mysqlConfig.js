const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost:8000',
  user     : 'root',
  password : '',
  database : 'sap'
});
 
connection.connect((err) => {
    throw err
});
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();