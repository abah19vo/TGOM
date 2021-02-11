const mysql = require("../data-access-layer-array/node_modules/mysql2")



const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    database: 'hello',
    password: "abc123"
})

exports.createFeedBack= function(newFeedback,callback){
    const query = "INSERT INTO feedBack(title,content,userId) VALUES(?,?,?)"
    const values = [newFeedback.title,newFeedback.content,newFeedback.userId]

    connection.query(query,values,function(error){
        if(error){
            callback(['internalError'])
        }else{
            callback([])
        }
    })
}

exports.getFeedbackById = function(id,callback){
    const query = "SELECT * FROM feedBack AS F WHERE id= ? JOIN user AS U ON F.userId = U.id"
    const values =[id]
    connection.query(query,values,function(error, feedback){

        if(error){
            callback(['internalError'],null)
        }else{
            callback([],feedback)
        }
       
    })
}



exports.getAllFeedbacks = function(callback){
    const query = "SELECT * FROM feedBack AS F JOIN user AS U ON F.userId = U.id"
    connection.query(query,function(error, feedbacks){
        if(error){
            callback(['internalError'],null)
        }else{
            callback([],feedbacks)
        }
    })
}