const mysql = require("../node_modules/mysql2")



const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    database: 'hello',
    password: "abc123"
})

exports.createComment = function(newComment,callback){
    const values = [newComment.feedbackId,newComment.userId,newComment.content]
    const query = 'INSERT INTO comment(feedBackId,userId,content) VALUES(?,?.?)'
    connection.query(query,values,function(error){
        if(error){
            callback(['internalError'])
        }else{
            callback([])
        }
    })
}

exports.getCommentsByFeedbackId = function(feedbackId,callback){
    const values =[feedbackId]
    const query = 'SELECT * FROM comment AS C WHERE C.feedbackId = ? JOIN user AS U ON C.userId = U.id'
    connection.query(query,values,function(error,comments){
        if(error){
            callback(['internalError'],null)
        }else{
            callback([],comments)
        }
    })
}