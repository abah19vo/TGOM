const USERNAME_MIN_LENGTH = 3
const USERNAME_MAX_LENGTH = 20
const bcrypt = require('bcrypt');

exports.getErrorNewUser = function(account){
    
    const errors = []

    if(!account.hasOwnProperty("username")){
        errors.push("usernameMissing")
    }
    if(!isNaN(account.name)){
        errors.push("nameCantContainDigit")
    }
    if(account.username.length < USERNAME_MIN_LENGTH){
        errors.push("usernameTooShort")
    }
    if(account.username.length > USERNAME_MAX_LENGTH){
        errors.push("usernameTooLong")
    }
    if(account.password != account.confirmPassword){
        errors.push("passwordDontMatch")
    }
    return errors
}

exports.validateAccount = function(insertedAccount){
    const errors =[]

    if(!insertedAccount.hasOwnProperty("username")){
        errors.push("usernameMissing")
    }
    if(insertedAccount.username.length < USERNAME_MIN_LENGTH){
        errors.push("usernameTooShort")
    }

    if(insertedAccount.username.length > USERNAME_MAX_LENGTH){
        errors.push("usernameTooLong")
    }

    return errors
}


exports.checkIfRealUser = function(repositoryAccount,insertedAccount){
    const errors =[]

    if(repositoryAccount.username != insertedAccount.username){
        errors.push("invalidUsername")
    }

    const valid = bcrypt.compareSync(insertedAccount.password, repositoryAccount.password)
    if(!valid){
        errors.push("invalidPassword")
    }
    console.log("validator------->"+errors)
    return errors
}
