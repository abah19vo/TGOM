const TITLE_MIN_LENGTH = 4
const GAME_NAME_MIN_LENGTH = 4
const REVIEW_MIN_LENGTH = 3
const REVIEW_MAX_LENGTH = 260

exports.getReviewValidationErrors = function(title, game, comment){
	
	const errors = []
	
	if(title.length < TITLE_MIN_LENGTH){
		errors.push("titleTooShort")
	}
	if(game.length < GAME_NAME_MIN_LENGTH){
		errors.push("gameTooShort")
	}
	if(comment.length < REVIEW_MIN_LENGTH){
		errors.push("commentTooShort")
    }
    if(comment.length > REVIEW_MAX_LENGTH){
		errors.push("commentTooLong")
	}
	
	return errors
	
}