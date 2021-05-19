const userValidator = require('./user-validation')
const userAuthentication = require('./user-authentication')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports= function({accountRepository}){

    const exports = {}

    exports.getAllUsers = function(callback){
        accountRepository.getAllUsers(callback)
    }

    exports.createUser = async (newUser, callback) =>{
        
        const errors = userValidator.getErrorNewUser(newUser)
        
        if(errors.length > 0){
            callback(errors,null)
            return
        }

        newUser.password = await bcrypt.hash(newUser.password, saltRounds)
        accountRepository.createUser(newUser, callback)
    }

    exports.getUserByUserName = function(username, callback){
        accountRepository.getAccountByUsername(username, callback)
    }

    exports.login = function(user, callback){

        const validationErrors = userValidator.validateAccount(insertedAccount)
        if(validationErrors.length > 0){
            callback(validationErrors)
            return
        }

        accountRepository.getUserByUserName(insertedAccount.username, function(repositoryErrors,storedUser){
          
            if(repositoryErrors.length > 0){
                callback(repositoryErrors)
            }else{
                const errors = userAuthentication.authenticateUser(storedUser,user)
                if(errors.length > 0){
                    callback(errors,null)
                }else{
                    callback([],storedUser.id)
                }
            }
        })
    }

    return exports
}