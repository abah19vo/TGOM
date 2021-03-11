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
            console.log("🚀 ~ file: feedBack_table.js ~ line 37 ~ client.query ~ feedback.rows[0]", feedback.rows[0])
            if(error){
                callback(['internalError'],null)
            }else{
                callback([],feedback.rows[0])
                
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