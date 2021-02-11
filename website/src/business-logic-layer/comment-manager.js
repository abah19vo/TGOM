const commentValidator = require('./comment-validation')

module.exports= function({commentRepository}){
    exports.createComment = function(newComment, callback){

        const errors = commentValidator.getCommentValidationErrors(newComment)

        if(errors.length > 0){
            callback(errors, null)
            return
        }
        commentRepository.createComment(comment.userId,comment.feedbackId,comment.content,callback)
    }

}