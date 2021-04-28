const mysql = require("mysql2")


const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    database: 'hello',
    password: "abc123"
})

module.exports = function(){
    const exports = {}
    
    exports.createFeedback= function(newFeedback,callback){
        const query = "INSERT INTO feedback(title,content,game,userId) VALUES(?,?,?,?)"
        const values = [newFeedback.title,newFeedback.content,newFeedback.game,newFeedback.userId]

        connection.query(query,values,function(error){
            if(error){                
                callback(['internalError'])
            }else{
                callback([])
            }
        })
    }

    exports.updateFeedbackById= function(newFeedback,callback){
        const query = "UPDATE feedback SET title = ?, content = ?, game= ? WHERE id=?"
        const values = [newFeedback.title,newFeedback.content,newFeedback.game,newFeedback.id,newFeedback.userId]

        connection.query(query,values,function(error){
            if(error){                
                callback(['internalError'])
            }else{
                callback([])
            }
        })
    }

    exports.deleteFeedbackById= function(feedback,callback){
        const query = "DELETE F FROM feedback AS F WHERE F.id = ? AND F.userId = ?"
        const values = [feedback.id,feedback.userId]

        connection.query(query,values,function(error){
            if(error){                
                callback(['internalError'])
            }else{
                callback([])
            }
        })
    }

    exports.getFeedbackById = function(id,callback){
        const query = " SELECT F.id, F.title, F.content, F.game, U.username FROM feedback AS F JOIN user AS U ON F.userId = U.id WHERE F.id = ? "
        const values =[id]
        connection.query(query,values,function(error, feedback){
            if(error){
                callback(['internalError'],null)
            }else{
                callback([],feedback[0])
            }
        
        })
    }


    exports.getAllFeedbacks = function(callback){
        const query = "SELECT F.id, F.title, F.game FROM feedback AS F "
        connection.query(query,function(error, feedbacks){
            if(error){
                callback(['internalError'],null)
            }else{
                callback([],feedbacks)
            }
        })
    }
    return exports
}