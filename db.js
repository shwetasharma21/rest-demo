const mysql = require("mysql");
require("dotenv").config();

//console.log("env", process.env);
const connection = mysql.createConnection(process.env.JAWSDB_URL);
connection.connect();

/*
connection.query("SELECT 1+1 AS Sum", (err, rows, fields) => {
  if (err) throw err;
  console.log("Result: ", rows[0].Sum);
});
*/

//connection.end();

module.exports = connection;
