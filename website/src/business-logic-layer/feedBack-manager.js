const feedBackValidator = require('./feedBack-validation')

module.exports = function({feedbackRepository}){

    const exports = {}

    exports.getAllFeedbacks = function(callback){
        feedbackRepository.getAllFeedbacks(callback)
    }

    exports.getCreateFeedback = function(session, callback){
        if(!session.isLoggedIn){
            callback(['notLoggedIn'])
        }else{
            callback([])
        }
            
    }

    exports.createFeedback = function(newFeedback, callback){
        

        const errors = feedBackValidator.getFeedbackValidationErrors(newFeedback, callback)
        if(errors.length > 0){
            callback(errors,null)
            return
        }
        if(newFeedback.session.isLoggedIn){
            feedbackRepository.createFeedBack(newFeedback, callback)
        }
        else
            callback(['notLoggedIn'], null)
    }

    exports.getFeedbackById = function(id, callback){
        feedbackRepository.getFeedbackById(id, callback)
    }

    return exports

}