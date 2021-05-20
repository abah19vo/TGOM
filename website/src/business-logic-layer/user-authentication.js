const bcrypt = require('bcrypt')

exports.authenticateUser = function(storedUser,user){
    const errors =[]

    if(storedUser.username != user.username){
        errors.push("invalidUsername")
    }

    const isValid = bcrypt.compareSync(user.password, storedUser.password)
    if(!isValid){
        errors.push("wrongPassword")
    }
    return errors
}

