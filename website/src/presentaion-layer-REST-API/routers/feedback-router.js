const express = require('express')
const jwt = require('jsonwebtoken')

module.exports = function({feedbackManager, commentManager}){
    const router = express.Router()

    router.post('/', function(req, res){
        const title = req.body.title
        const game = req.body.game
        const content = req.body.content

        const feedback = {
			id,
			title,
			game,
            content
		}
		
		feedbacks.push(feedback)

        res.setHeader("location","/")
        res.status(201).json(feedback)
    })
    
    router.get('/', (req, res) => {

        feedbackManager.getAllFeedbacks(function(errors, feedbacks){
            /*const authorizationHeader = request.header("Authorization") // "Bearer XXX"
            const accessToken = authorizationHeader.substring("Bearer ".length) // "XXX"
            jwt.verify(accessToken, "sdfsdfsdfsdfsdfsdf", function(error, payload){
            
                if(error){
                    response.status(401).end()
                }else{ 
                    res.status(200).json(feedbacks)
                }
            })*/
                    
                
           
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
                res.json(feedbacks)
                //res.render('feedbacks.hbs',model) 
            }
        })
    })
    

    router.get('/create', (req, res) => {
        feedbackManager.getCreateFeedback(req.session ,function(errors){
            const errorTranslations = {
                notLoggedIn: "Youre Not LoggedIn"
            }
            if(errors.length > 0){
                const errorMessages = errors.map(e => errorTranslations[e])
                const model = {
                    errors: errorMessages,
                }   
                res.render('create-feedback.hbs', model)
            }
            else
               res.render('create-feedback.hbs')
        })        
    })

    router.post('/create', (req, res) => {
        const newFeedback ={
            title: req.body.title,
            content: req.body.content,
            game:req.body.game,
            userId: req.session.userId,
            session: req.session
        }
        
        feedbackManager.createFeedback(newFeedback, function(errors, feedbackId){
            const errorTranslations = {
                titleTooShort: "the title is needs to be at least 4 characters",
                gameTooShort: "the game name is supposed to be at least 4 characters",
                internalError: "Cant query out the request now.",
                contentTooShort:"the content is supposed to be at least 3 characters",
                contentTooLong: "the content is supposed to be at least under 260 characters",
                notLoggedIn: "Youre Not LoggedIn"
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
                        //res.json(model)
                        res.render('feedback.hbs', model)
                    }
                })
                
            }
        })

    })


    
    


    return router
}