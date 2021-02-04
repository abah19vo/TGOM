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

exports.getFeedbacksById = function(id,callback){
    const query = "SELECT * FROM feedBack AS F WHERE id= ? JOIN user AS U ON F.userId = U.id"
    const values =[id]
    connection.query(query,values,function(error, feedback){
        if(error){
            callback(error)
        }else{
            callback(feedback)
        }
    })
}



