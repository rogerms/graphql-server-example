var mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "oqfqwesc_granites"
});

db.connect(function(err) {
  if (err) {
    console.log("Can't connect\n", err.sqlMessage);
    return;
  };
  console.log("Connected!!");
});

module.exports = db;