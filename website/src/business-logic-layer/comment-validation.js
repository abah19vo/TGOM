const COMMENT_MIN_LENGTH = 2
const COMMENT_MAX_LENGTH = 1000

exports.getCommentValidationErrors = function(comment){
	
	const errors = []
	
	if(comment.content.length < COMMENT_MIN_LENGTH){
		errors.push("commentTooShort")
    }
    if(comment.content.length > COMMENT_MAX_LENGTH){
		errors.push("commentTooLong")
	}
	return errors
	
}