const bcrypt = require('bcrypt');

exports.checkIfRealUser = function(repositoryAccount,insertedAccount){
    const errors =[]

    if(repositoryAccount.username != insertedAccount.username){
        errors.push("invalidUsername")
    }

    const valid = bcrypt.compareSync(insertedAccount.password, repositoryAccount.password)
    if(!valid){
        errors.push("invalidPassword")
    }
    return errors
}

