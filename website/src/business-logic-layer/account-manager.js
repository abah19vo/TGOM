const accountValidator = require('./account-validation')

module.exports= function({accountRepository}){

    const exports = {}

    exports.getAllUsers = function(callback){
        accountRepository.getAllAccounts(callback)
    }

    exports.createUser = function(newUser, callback){
        
        const errors = accountValidator.getErrorNewAccount(newUser)

        if(errors.length > 0){
            callback(errors,null)
            return
        }

        accountRepository.createAccount(newUser, callback)
    }

    exports.getUserById = function(id, callback){
        accountRepository.getAccountByUsername(id, callback)
    }

    exports.getUserByUserName = function(username, callback){
        accountRepository.getAccountByUsername(username, callback)
    }

    return exports
}