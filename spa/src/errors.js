const USERNAME_MIN_LENGTH = 3
const USERNAME_MAX_LENGTH = 20
const PASSWORD_MAX_LENGTH = 25
const TITLE_MIN_LENGTH = 3
const GAME_MIN_LENGTH = 3
const CONTENT_MIN_LENGTH = 20
const CONTENT_MAX_LENGTH = 260


exports.translateAccountError = function(errors){	
	const errorTranslations = {
        nameCantContainDigit: "The Name Cant Contain Digits",
        usernameTooShort: "The username needs to be at least "+ USERNAME_MIN_LENGTH +" characters.",
        usernameTooLong: "The username should be less than "+ USERNAME_MAX_LENGTH +" characters",
        internalError: "Cant query out the request now.",
        usernameTaken: "Username already in use.",
        passwordDontMatch: "Passwords Does Not Match",
        passwordTooLong: "The password should be less than  "+ PASSWORD_MAX_LENGTH +" characters.",
        notLoggedIn: "you're Not LoggedIn",

    }
    const errorMessages = errors.map(e => errorTranslations[e])
    return errorMessages
}



exports.translateFeedbackError= function(errors){
    const errorTranslations = {
        titleTooShort: "the title is needs to be at least "+TITLE_MIN_LENGTH+" characters",
        gameTooShort: "the game name is supposed to be at least "+GAME_MIN_LENGTH+" characters",
        internalError: "Cant query out the request now.",
        contentTooShort:"the content is supposed to be at least "+CONTENT_MIN_LENGTH+" characters",
        contentTooLong: "the content is supposed to be at least under "+ CONTENT_MAX_LENGTH+" characters",
        notLoggedIn: "you're Not LoggedIn",
        wrongUser:"you can not delete this post"
    }
    const errorMessages = errors.map(e => errorTranslations[e])
    return errorMessages
	
}