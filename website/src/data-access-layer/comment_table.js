const mysql = require("mysql2")



const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    database: 'hello',
    password: "abc123"
})

exports.createComment = function(userId,feedbackId,content,callback){
    const values = [feedbackId,userId,content]
    const query = 'INSERT INTO comment(feedBackId,userId,content) VALUES(?,?.?)'
    connection.query(query,values,function(error){
        callback(error)
    })
}

exports.getCommentsByFeedbackId = function(feedbackId,userId,callback){
    const values =[feedbackId,userId]
    const query = 'SELECT * FROM comment AS C WHERE C.feedbackId = ? JOIN user AS U ON C.userId = U.id'
    connection.query(query,values,function(error,comments){
        callback(error,(comments))
    })
}