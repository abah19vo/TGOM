const accountValidator = require('./account-validation')

module.exports= function({accountRepository}){

    const exports = {}

    exports.getAllAccounts = function(callback){
        accountRepository.getAllAccounts(callback)
    }

    exports.createAccount = function(account, callback){
        
        const errors = accountValidator.getErrorNewAccount(account)

        if(errors.length > 0){
            callback(errors,null)
            return
        }

        accountRepository.createAccount(account, callback)
    }

    exports.getAccountByUsername = function(username, callback){
        accountRepository.getAccountByUsername(username, callback)
    }

    return exports
}