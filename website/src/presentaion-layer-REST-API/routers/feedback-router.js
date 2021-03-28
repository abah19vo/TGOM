const express = require('express')
const jwt = require('jsonwebtoken')
const secret = 'its me mario!!'


module.exports = function({feedbackManager}){
    const router = express.Router()

   
    
    router.get('/', (req, res) => {
        feedbackManager.getAllFeedbacks(function(errors, feedbacks){
            const errorTranslations = {
                internalError: "Cant query out the request now.",
            }
            if(errors.length > 0 ){
                const errorMessages = errors.map(e => errorTranslations[e])
                response.status(400).json({errorMessages:errorMessages})
            }else{
                res.status(200).json(feedbacks)
            }
        })
    })

    router.post('/create', (req, res) => {
        const authorizationHeader = req.header("Authorization") 
        const accessToken = authorizationHeader.substring("Bearer ".length) 
        jwt.verify(accessToken,secret, function(error, payload){
            if(error){
                res.status(400).json({errorMessages:["Cant query out the request now."]})
            }else{
                const newFeedback ={
                    title: req.body.title,
                    content: req.body.content,
                    game:req.body.game,
                    userId: payload.userId,
                    isLoggedIn: payload.isLoggedIn
                }
                feedbackManager.createFeedback(newFeedback, function(errors){
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
                        res.status(400).json({errorMessages :errorMessages})

                    }else{
                        res.status(201).end()
                    }
                })
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
                res.status(400).json({errorMessages:errorMessages})
            }else{
                res.status(200).json(feedback)
            }
        })

    })

    router.delete('/:id', (req, res) => {
        const authorizationHeader = req.header("Authorization") 
        const accessToken = authorizationHeader.substring("Bearer ".length) 
        jwt.verify(accessToken,secret, function(error, payload){
            if(error){
                response.status(400).json({errorMessages:["Cant query out the request now."]})
            }else{
                
                feedback={
                    id: req.params.id,
                    isLoggedIn: payload.isLoggedIn,
                    userId: payload.userId
                }
                feedbackManager.deleteFeedbackById(feedback, function(errors){
                    const errorTranslations = {
                        internalError: "Cant query out the request now.",
                        wrongUser:"you can not delete this post"
                    }
                    if(errors.length > 0 ){
                        const errorMessages = errors.map(e => errorTranslations[e])
                        res.status(400).json({errorMessages:errorMessages})
                    }else{
                        res.status(201).end()
                    }
                }) 
            }
        })
    })

    router.put('/:id', (req, res) => {
        const authorizationHeader = req.header("Authorization") 
        const accessToken = authorizationHeader.substring("Bearer ".length) 

        jwt.verify(accessToken,secret, function(error, payload){

            if(error){
                res.status(400).json({errorMessages:["Cant query out the request now."]})
            }else{
                const newFeedback ={
                    id: req.params.id,
                    title: req.body.title,
                    content: req.body.content,
                    game:req.body.game,
                    userId: payload.userId,
                    isLoggedIn: payload.isLoggedIn
                }
                feedbackManager.updateFeedbackById(newFeedback, function(errors){
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
                        res.status(400).json({errorMessages:errorMessages})

                    }else{
                        res.status(204).end()
                    }
                })
            }
        })
    })
    
    return router
}