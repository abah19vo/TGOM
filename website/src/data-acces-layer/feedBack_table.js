const mysql = require("mysql2")



const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    database: 'hello',
    password: "abc123"
})

exports.createFeedBack= function(title,content,userId,callback){
    const query = "INSERT INTO feedBack(title,content,userId) VALUES(?,?,?)"
    const values = [title,content,userId]

    connection.query(query,values,function(error){
        callback(error)
    })
}

exports.getFeedbackById = function(id,callback){
    const query = "SELECT * FROM feedBack AS F WHERE id= ? JOIN user AS U ON F.userId = U.id"
    const values =[id]
    connection.query(query,values,function(error, feedback){
        callback(error,feedback)
    })
}



exports.getAllFeedbacks = function(id,callback){
    const query = "SELECT * FROM feedBack AS F JOIN user AS U ON F.userId = U.id"
    connection.query(query,function(error, feedbacks){
        callback(error,feedbacks)
    })
}