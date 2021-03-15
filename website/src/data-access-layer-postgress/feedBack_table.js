const { Pool, Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'postgressDb',
    database:  'hello',
    password: 'abc123',
    port:5432,
})
client.connect()

module.exports =function(){
   
    exports.createFeedBack= function(newFeedback,callback){
        const query = "INSERT INTO feedBack(title,content,game,userId) VALUES($1,$2,$3,$4)"
        const values = [newFeedback.title,newFeedback.content,newFeedback.game,newFeedback.userId]

        client.query(query,values,function(error){
            if(error){                
                callback(['internalError'])
            }else{
                callback([])
            }
        })
    }

    exports.getFeedbackById = function(id,callback){
        //const query = " SELECT F.id, F.title, F.content, F.game, U.username FROM feedBack AS F INNER JOIN users AS U ON F.userId = U.id WHERE F.id = $1 "
        const query = {
            text: " SELECT F.id, F.title, F.content, F.game, U.username FROM feedBack AS F INNER JOIN users AS U ON F.userId = U.id WHERE F.id = $1 ",
            rowMode: 'struct'
        }

        const values =[id]
        client.query(query,values,function(error, feedback){
            if(error){
                callback(['internalError'],null)
            }else{
                callback([],feedback.rows[0])
                
            }
        
        })
    }

    exports.updateFeedBackById= function(newFeedback,callback){
        const query = "UPDATE feedBack SET title = $1, content = $2, game= $3 WHERE id= $4 AND userId = $5"
        const values = [newFeedback.title,newFeedback.content,newFeedback.game,newFeedback.id,newFeedback.userId]

        client.query(query,values,function(error){
            if(error){                
                callback(['internalError'])
            }else{
                callback([])
            }
        })
    }

    exports.deleteFeedBackById= function(feedback,callback){
        const query = "DELETE FROM feedBack AS F  WHERE F.id = $1 AND F.userId = $2"
        const values = [feedback.id,feedback.userId]

        client.query(query,values,function(error){
            if(error){                
                callback(['internalError'])
            }else{
                callback([])
            }
        })
    }

    



    exports.getAllFeedbacks = function(callback){
        const query = {
            text: "SELECT F.id, F.title, F.game, F.content FROM feedBack AS F ",
            rowMode: 'struct'
        }
        client.query(query,function(error, feedbacks){
            if(error){
                callback(['internalError'],null)
            }else{
                callback([],feedbacks.rows)
            }
        })
    }
    return exports
}