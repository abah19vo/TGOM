const TITLE_MIN_LENGTH = 4
const GAME_NAME_MIN_LENGTH = 4
const REVIEW_MIN_LENGTH = 3
const REVIEW_MAX_LENGTH = 260

exports.getFeedbackValidationErrors = function(newFeedback){
	
	const errors = []
	
	if(newFeedback.title.length < TITLE_MIN_LENGTH){
		errors.push("titleTooShort")
	}
	if(newFeedback.game.length < GAME_NAME_MIN_LENGTH){
		errors.push("gameTooShort")
	}
	if(newFeedback.content.length < REVIEW_MIN_LENGTH){
		errors.push("contentTooShort")
    }
    if(newFeedback.content.length > REVIEW_MAX_LENGTH){
		errors.push("contentTooLong")
	}
	
	return errors
	
}