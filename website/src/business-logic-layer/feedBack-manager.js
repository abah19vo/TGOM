const feedBackValidator = require('./feedBack-validation')

module.exports = function({feedbackRepository}){

    const exports = {}

    exports.getAllFeedbacks = function(callback){
        feedbackRepository.getAllFeedbacks(callback)
    }

    exports.createFeedback = function(newFeedback, callback){

        if(newFeedback.isLoggedIn){
            const errors = feedBackValidator.getFeedbackValidationErrors(newFeedback, callback)

            if(errors.length > 0){
                callback(errors,null)
                return
            }
            feedbackRepository.createFeedBack(newFeedback, callback)
        
        }else{
            callback(['notLoggedIn'], null)
        }
    }

    exports.getFeedbackById = function(id, callback){
        feedbackRepository.getFeedbackById(id, callback)
    }


    exports.updateFeedbackById = function(newFeedback, callback){
        
        const errors = feedBackValidator.getFeedbackValidationErrors(newFeedback, callback)
        if(errors.length > 0){
            callback(errors,null)
            return
        }
        if(newFeedback.isLoggedIn){
            feedbackRepository.updateFeedBackById(newFeedback, callback)
        }
        else
            callback(['notLoggedIn'], null)
    }

    exports.deleteFeedbackById = function(feedback, callback){
        
        if(feedback.isLoggedIn){
            feedbackRepository.deleteFeedBackById(feedback, callback)
        }
        else
            callback(['notLoggedIn'], null)
    }

    return exports

}