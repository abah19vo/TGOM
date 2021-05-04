
const constants = require('./constants')
exports.getFeedbackValidationErrors = function(newFeedback){
	
	const errors = []
	
	if(newFeedback.title.length < constants.TITLE_MIN_LENGTH){
		errors.push("titleTooShort")
	}
	if(newFeedback.game.length < constants.GAME_NAME_MIN_LENGTH){
		errors.push("gameTooShort")
	}
	if(newFeedback.content.length < constants.REVIEW_MIN_LENGTH){
		errors.push("contentTooShort")
    }
    if(newFeedback.content.length > constants.REVIEW_MAX_LENGTH){
		errors.push("contentTooLong")
	}
	
	return errors
	
}


exports.getErrorNewAccount = function(account){
    
    const errors = []

    if(!account.hasOwnProperty("username")){
        errors.push("usernameMissing")
    }
    if(account.username.length < constants.USERNAME_MIN_LENGTH){
        errors.push("usernameTooShort")
    }
    if(account.username.length > constants.USERNAME_MAX_LENGTH){
        errors.push("usernameTooLong")
    }
    if(account.password != account.confirmPassword){
        errors.push("passwordDontMatch")
    }
    return errors
}

exports.validateAccount = function(account){
    const errors =[]

    if(!account.hasOwnProperty("username")){
        errors.push("usernameMissing")
    }
    if(account.username.length < constants.USERNAME_MIN_LENGTH){
        errors.push("usernameTooShort")
    }
    if(account.username.length > constants.USERNAME_MAX_LENGTH){
        errors.push("usernameTooLong")
    }

    return errors
}



