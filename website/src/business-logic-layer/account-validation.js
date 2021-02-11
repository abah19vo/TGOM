const USERNAME_MIN_LENGTH = 3
const USERNAME_MAX_LENGTH = 13

exports.getErrorNewAccount = function(account){
    
    const errors = []

    if(!account.hasOwnProperty("username")){
        errors.push("usernameMissing")
    }else if(account.username.length < USERNAME_MIN_LENGTH){
        errors.push("usernameTooShort")
    }else if(account.username.length > USERNAME_MAX_LENGTH){
        errors.push("usernameTooLong")
    }

    return errors
}