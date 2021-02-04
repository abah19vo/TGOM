const mysql = require("mysql2")



const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    database: 'hello',
    password: "abc123"
})

exports.getCommentsById = function(id,feedbackId,callback){
    const values =[id, feedbackId]
}