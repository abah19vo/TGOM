
const comments = [{
    id:1,
    feedBackId:1,
    userId: 1,
    content :"hello"
}]

exports.createComment = function(userId,feedbackId,content,callback){
    const newComment = {
        id: account.length + 1,
        feedbackId: feedbackId,
        userId: userId,
        content: content
    }
    comment.push(newComment)
    callback([])
}

exports.getCommentsByFeedbackId = function(feedbackId,userId,callback){
    const allComments = comments.find(a => a.feedBackId == feedbackId)
    callback([],allComments || null)
}