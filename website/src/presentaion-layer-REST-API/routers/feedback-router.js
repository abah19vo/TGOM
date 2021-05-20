const express = require('express')
const jwt = require('jsonwebtoken')
const secret = 'its me mario!!'


module.exports = function({feedbackManager}){
    const router = express.Router()
 
    router.get('/', (req, res) => {
        feedbackManager.getAllFeedbacks(function(errors, feedbacks){
            
            if(errors.length > 0 ){
                response.status(500).json({errors:errors})
            }else{
                res.status(200).json(feedbacks)
            }
        })
    })

    router.post('/', (req, res) => {
        const authorizationHeader = req.header("Authorization") 
        const accessToken = authorizationHeader.substring("Bearer ".length) 
        jwt.verify(accessToken,secret, function(error, payload){
            if(error){
                res.status(400).json({errors:"InternalError"})
            }else{
                const newFeedback ={
                    title: req.body.title,
                    content: req.body.content,
                    game:req.body.game,
                    userId: payload.userId,

                }
                const auth = {
                    userId: payload.userId,
                    isLoggedIn: payload.isLoggedIn
                }
                feedbackManager.createFeedback(newFeedback,auth, function(errors){   
                    if(errors.length > 0){
                        res.status(400).json({errors:errors})

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
            if(errors.length > 0 ){
                res.status(400).json({errors:errors})
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
                response.status(400).json({error:"InternalError"})
            }else{
                const id = req.params.id
                const auth = {
                    authorId: req.body.authorId,
                    isLoggedIn: payload.isLoggedIn,
                    userId: payload.userId
                }
                console.log("🚀 ~ file: feedback-router.js ~ line 79 ~ jwt.verify ~ auth", auth)
                feedbackManager.deleteFeedback(id,auth, function(errors){
                    
                    if(errors.length > 0 ){
                        res.status(400).json({errors:errors})
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
                res.status(500).json({error:"InternalError"})
            }else{
                const newFeedback ={
                    id: req.params.id,
                    title: req.body.title,
                    content: req.body.content,
                    game:req.body.game,
                    
                }
                const auth = {
                    authorId: req.params.authorId,
                    userId: payload.userId,
                    isLoggedIn: payload.isLoggedIn
                }
                feedbackManager.updateFeedbackById(newFeedback, auth,function(errors){
                    if(errors.length > 0){
                        res.status(400).json({errors:errors})

                    }else{
                        res.status(204).end()
                    }
                })
            }
        })
    })
    
    return router
}