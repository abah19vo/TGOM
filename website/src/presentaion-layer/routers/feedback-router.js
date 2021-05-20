const express = require('express')
const jwt = require('jsonwebtoken')

module.exports = function({feedbackManager, commentManager}){
    const router = express.Router()
    
    router.get('/', (req, res) => {

        feedbackManager.getAllFeedbacks(function(errors, feedbacks){
            const errorTranslations = {
                internalError: "Cant query out the request now.",
            }
            
            if(errors.length > 0 ){
                const errorMessages = errors.map(e => errorTranslations[e])
                const model = {
                    errorMessages: errorMessages
                }
                res.render('feedback.hbs', model)
                
            }else{

                const model = {
                    feedbacks: feedbacks
                }
                res.render('feedbacks.hbs',model) 
            }
        })
    })
    

    router.get('/newFeedback', (req, res) => {

        res.render('create-feedback.hbs')
    })

    router.post('/newFeedback', (req, res) => {
        const newFeedback ={
            title: req.body.title,
            content: req.body.content,
            game:req.body.game,
            userId: req.session.userId,
        }

        const auth = {
            userId: req.session.userId,
            isLoggedIn: req.session.isLoggedIn
        }
        
        feedbackManager.createFeedback(newFeedback,auth, function(errors){
            const errorTranslations = {
                titleTooShort: "the title is needs to be at least 4 characters",
                gameTooShort: "the game name is supposed to be at least 4 characters",
                internalError: "Cant query out the request now.",
                contentTooShort:"the content is supposed to be at least 3 characters",
                contentTooLong: "the content is supposed to be at least under 260 characters",
                notLoggedIn: "you're Not LoggedIn"
            }

            if(errors.length > 0){
                const errorMessages = errors.map(e => errorTranslations[e])
                const model = {
                    errors: errorMessages,
                    title: newFeedback.title,
                    content: newFeedback.content,
                    game: newFeedback.game
                }
                res.render('create-feedback.hbs',model)

            }else{
                res.redirect('/feedbacks')
            }
        })

    })

    router.get('/:id', (req, res) => {

        const id = req.params.id

        feedbackManager.getFeedbackById(id, function(errors, feedback){
            
            const errorTranslations = {
                internalError: "Cant query out the request now.",
            }

            if(errors.length > 0 ){
                const errorMessages = errors.map(e => errorTranslations[e])

                const model = {
                    errorMessages: errorMessages
                }
                res.render('feedback.hbs', model)
            }else{

                commentManager.getCommentsByFeedbackId(id, function(errors, comments){
                    const errorTranslations = {
                        internalError: "Cant query out the request now."
                    }
                    if(errors.length > 0 ){
                        const errorMessages = errors.map(e => errorTranslations[e])
        
                        const model = {
                            errorMessages: errorMessages
                        }
                        res.render('feedback.hbs', model)
                    }else{
                        const model = {
                            feedback: feedback,
                            comments: comments
                        }
                        res.render('feedback.hbs', model)
                    }
                })
                
            }
        })
    })

    return router
}