const accountValidator = require('./account-validation')
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports= function({accountRepository}){

    const exports = {}

    exports.getAllUsers = function(callback){
        accountRepository.getAllAccounts(callback)
    }

    exports.createUser = async (newUser, callback) =>{
        
        const errors = accountValidator.getErrorNewUser(newUser)
        
        if(errors.length > 0){
            callback(errors,null)
            return
        }

        newUser.password = await bcrypt.hash(newUser.password, saltRounds)
        accountRepository.createUser(newUser, callback)
    }

    exports.getUserById = function(id, callback){
        accountRepository.getAccountByUsername(id, callback)
    }

    exports.getUserByUserName = function(username, callback){
        accountRepository.getAccountByUsername(username, callback)
    }

    exports.getPassword = function(username, callback){
        accountRepository.getPassword(username, callback)
    }

    exports.login = function(insertedAccount, callback){

        const validationErrors = accountValidator.validateAccount(insertedAccount)
        if(validationErrors.length > 0){
            callback(validationErrors)
            return
        }

        accountRepository.getUserByUserName(insertedAccount.username, function(repositoryErrors,repositoryAccount){
            console.log(repositoryErrors)
            console.log(repositoryAccount)
            if(repositoryErrors.length > 0){
                callback(repositoryErrors)
            }else{
                const errors = accountValidator.checkIfRealUser(repositoryAccount,insertedAccount)
                if(errors.length > 0){
                    callback(errors,null)
                }else{
                    callback([],repositoryAccount.id)
                }
            }
        })
    }

    return exports
}