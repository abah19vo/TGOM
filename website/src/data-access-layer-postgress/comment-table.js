const db = require('./db')



module.exports = function(){
    const exports = {}

    exports.createComment = function(comment,callback){
        db.Comment.create(comment)
			.then(a => callback([]))
			.catch(e => {
                callback(['internalError'])

			})	   
    }


    exports.getCommentsByFeedbackId = function(feedbackId,callback){
        db.Comment.findAll({
            where:{feedbackId:feedbackId},
            include: db.User,
            raw: true,
        }
        ).then(comments => {
            const commentsArr=[]

            for(let comment of comments){
                let data = {
                    id: comment.id, 
                    content: comment.content, 
                    feedbackId: comment.feedbackId,
                    userId: comment.userId,
                    username: comment['user.username']
                }
                commentsArr.push(data)
            }
            callback([],commentsArr)

        }).catch(e => {
                callback(["internalError"], null)
        })
    }

    return exports
}
