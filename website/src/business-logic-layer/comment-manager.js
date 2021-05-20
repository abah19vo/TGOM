const commentValidator = require('./comment-validation')

module.exports= function({commentRepository}){

    const exports = {}

    exports.createComment = function(newComment,auth, callback){

        if(auth.isLoggedIn){
            const errors = commentValidator.getCommentValidationErrors(newComment)

            if(errors.length > 0){
                callback(errors, null)
                return
            }
            commentRepository.createComment(newComment, callback)
        }else{
            callback(["notLoggedIn"], null)
        }
    }

    exports.getCommentsByFeedbackId = function(feedbackId, callback){
        commentRepository.getCommentsByFeedbackId(feedbackId,callback)
    }

    return exports
}