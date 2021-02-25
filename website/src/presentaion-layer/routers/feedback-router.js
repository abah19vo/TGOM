const express = require('express')

module.exports = function({feedbackManager}){
    const router = express.Router()

    router.get('/', (req, res) => {
        feedbackManager.getAllFeedbacks(function(errors, feedback){
            console.log("🚀 ~ file: feedback-router.js ~ line 8 ~ feedbackManager.getAllFeedbacks ~ feedbacks", feedback)
            console.log(errors)
            const feedbacks = [feedback]
            res.render('feedbacks.hbs',)
        })
    })
    

    router.get('/create', (req, res) => {
        if(req.session.isLoggedIn){
            res.render('create-feedback.hbs')
        }else{
            res.redirect('/')
        }
    })

    router.post('/create', (req, res) => {
        const newFeedback ={
            title: req.body.title,
            content: req.body.content,
            game:req.body.game,
            userId: req.session.userId
        }
        if(req.session.isLoggedIn){
            feedbackManager.createFeedback(newFeedback, function(errors, feedbackId){
                const errorTranslations = {
                    titleTooShort: "the title is needs to be at least 4 characters",
                    gameTooShort: "the game name is supposed to be at least 4 characters",
                    internalError: "Cant query out the request now.",
                    contentTooShort:"the content is supposed to be at least 3 characters",
                    contentTooLong: "the content is supposed to be at least under 260 characters",
    
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
            
        }else{
            res.redirect('/')
        }
    })
    return router
}