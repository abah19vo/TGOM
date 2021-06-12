const { User } = require("../data-access-layer-postgress/db")

const USERNAME_MIN_LENGTH = 3
const USERNAME_MAX_LENGTH = 20

exports.validateNewUser = function(user){
    
    const errors = []

    if(!user.hasOwnProperty("username")){
        errors.push("usernameMissing")
    }
    if(user.username.length < USERNAME_MIN_LENGTH){
        errors.push("usernameTooShort")
    }
    if(user.username.length > USERNAME_MAX_LENGTH){
        errors.push("usernameTooLong")
    }
    if(user.password != user.confirmPassword){
        errors.push("passwordDontMatch")
    }
    return errors
}



exports.validateUser = function(user){
    const errors =[]

    if(!user.hasOwnProperty("username")){
        errors.push("usernameMissing")
    }
    if(user.username.length < USERNAME_MIN_LENGTH){
        errors.push("usernameTooShort")
    }
    if(user.username.length > USERNAME_MAX_LENGTH){
        errors.push("usernameTooLong")
    }

    return errors
}



