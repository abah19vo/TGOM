const { Pool, Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'postgressDb',
    database:  'hello',
    password: 'abc123',
    port:5432,
})
client.connect()


module.exports = function(){
    const exports = {}
    
    exports.createComment = function(newComment,callback){

        const values = [newComment.feedbackId,newComment.userId,newComment.content]
        const query = 'INSERT INTO comment(feedBackId,userId,content) VALUES($1,$2,$3)'
        client.query(query,values,function(error){
            if(error){                
                callback(['internalError'])
            }else{
                callback([])
            }
        })
    }
    
    exports.getCommentsByFeedbackId = function(feedbackId,callback){
        const values =[feedbackId]
        //const query = 'SELECT C.content, U.username FROM comment AS C INNER JOIN users AS U ON C.userId = U.id WHERE C.feedbackId = $1'
        const query = {
            text: 'SELECT C.content, U.username FROM comment AS C INNER JOIN users AS U ON C.userId = U.id WHERE C.feedbackId = $1',
            rowMode: 'struct'
        }
        client.query(query,values,function(error,comments){
            if(error){
                callback(['internalError'],null)
            }else{
                callback([],comments.rows)
            }
        })
    }

    return exports
}
