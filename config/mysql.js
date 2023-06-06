const mysql = require("mysql");
require("dotenv").config();

const { HOST, USER, DATABASE, PASSWORD } = process.env;

const db = mysql.createConnection({
  host: HOST,
  user: USER,
  database: DATABASE,
  password: PASSWORD,
});

db.connect((error) => {
    if (error) {
        console.log(error, "Connection to db is wrong!!!")
    } else {
        console.log("mysql connection.....")
    }
})

module.exports = db