const mysql = require("mysql2")


const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    database: 'hello',
    password: "abc123"
})


module.exports = connection