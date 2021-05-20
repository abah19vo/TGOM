const feedbackValidator = require('./feedback-validation')

module.exports = function({feedbackRepository}){

    const exports = {}

    exports.getAllFeedbacks = function(callback){
        feedbackRepository.getAllFeedbacks(callback)
    }

    exports.createFeedback = function(newFeedback,auth, callback){

        if(auth.isLoggedIn){
            const errors = feedbackValidator.validateFeedback(newFeedback)

            if(errors.length > 0){
                callback(errors,null)
                return
            }
            feedbackRepository.createFeedback(newFeedback, callback)
        
        }else{
            callback(['notLoggedIn'], null)
        }
    }

    exports.getFeedbackById = function(id, callback){
        feedbackRepository.getFeedbackById(id, callback)
    }


    exports.updateFeedbackById = function(newFeedback,auth, callback){
        
        const errors = feedbackValidator.getFeedbackValidationErrors(newFeedback, callback)
        if(errors.length > 0){
            callback(errors,null)
            return
        }
        if(auth.isLoggedIn && auth.id === auth.authorId){
            feedbackRepository.updateFeedbackById(newFeedback, callback)
        }
        else
            callback(['notLoggedIn'], null)
    }

    exports.deleteFeedback = function(id,auth, callback){
    console.log("🚀 ~ file: feedback-manager.js ~ line 47 ~ exports.deleteFeedback ~ auth", auth)
        
        if(auth.userId === auth.authorId){
            feedbackRepository.deleteFeedbackById(id, callback)
        }
        else
            callback(['notLoggedIn'], null)
    }

    return exports

}