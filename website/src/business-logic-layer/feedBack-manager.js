const feedBackValidator = require('./feedBack-validation')

module.exports = function({feedbackRepository}){

    const exports = {}

    exports.getAllFeedbacks = function(callback){
        feedbackRepository.getAllFeedbacks(callback)
    }

    exports.createFeedback = function(newFeedback, callback){
        
        const errors = feedBackValidator.getFeedbackValidationErrors(newFeedback, callback)
        if(errors.length > 0){
            callback(errors,null)
            return
        }
    
        feedbackRepository.createFeedBack(newFeedback, callback)
    }

    exports.getFeedbackById = function(id, callback){
        feedBackRepository.getFeedbackById(id, callback)
    }

    return exports

}