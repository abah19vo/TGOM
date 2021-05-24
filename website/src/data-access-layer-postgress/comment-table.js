const db = require('./db')


module.exports = function(){
    const exports = {}

    exports.createComment = function(newComment,callback){
        db.Comment.create(newComment)
			.then(a => callback([]))
			.catch(e => {
                callback(['internalError'])
                console.log("🚀 ~ file: comment-table.js ~ line 8 ~ newComment", e)

			})	   
    }


    exports.getCommentsByFeedbackId = function(feedbackId,callback){
        db.Comment.findAll({
            raw: true,
            include:[{
                model:db.User,
                where: ["comment.userId = users.id"],
                raw: true
            }]
        }).then(comment => callback([]) )
			.catch(e => {
                callback(["internalError"], null)
                console.log("🚀 ~ error ~ user", e)
            })
    }
    


    /*
    exports.createComment = function(newComment,callback){

        const values = [newComment.feedbackId,newComment.userId,newComment.content]
        const query = 'INSERT INTO comment(feedBackId,userId,content) VALUES($1,$2,$3)'
        client.query(query,values,function(error){
            if(error){                
        console.log("🚀 ~ file: comment-table.js ~ line 41 ~ user", user)
        console.log("🚀 ~ file: comment-table.js ~ line 41 ~ user", user)
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
    */

    return exports
}
