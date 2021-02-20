const feedBackValidator = require('./feedBack-validation')

module.exports = function({feedBackRepository}){

    const exports = {}

    exports.getAllFeedback = function(callback){
        feedBackRepository.getAllFeedback(callback)
    }

    exports.createFeedBack = function(newFeedback, callback){
        
        const errors = feedBackValidator.getFeedbackValidationErrors(newFeedback, callback)

        if(errors.length > 0){
            callback(errors, null)
            return
        }
    
        if (isloggedin)
        feedBackRepository.createFeedBack(newFeedback, callback)
    }

    exports.getFeedbackById = function(id, callback){
        feedBackRepository.getFeedbackById(id, callback)
    }

}