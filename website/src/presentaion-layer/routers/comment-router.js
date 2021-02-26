const express = require('express')

module.exports = function({commentManager}){
    const router = express.Router()  
    

    router.post('/:id/create', (req, res) => {
        const newComment ={
            feedbackId: req.params.id,
            content: req.body.content,
            userId: req.session.userId
        }
        if(req.session.isLoggedIn){ 
            commentManager.createComment(newComment, function(errors){
                const errorTranslations = {
                    commentTooShort: "the comment is needs to be at least 4 characters",
                    internalError: "Cant query out the request now.",
                    commentTooLong: "the comment is supposed to be at least under 260 characters",
                }
                if(errors.length > 0){
                    const errorMessages = errors.map(e => errorTranslations[e])
                    console.log(errorMessages)
                    const model = {
                        errors: errorMessages,
                        content: newComment.content,
                    }
                    res.render('create-comment.hbs',model)
                }else{
                    console.log("success")
                    res.redirect('/feedbacks/'+ req.params.id)
                }
            })
            
        }else{
            res.redirect('/')
        }
    })

    router.get('/:id/create', (req, res) => {
        if(req.session.isLoggedIn){
            res.render('create-comment.hbs')
        }else{
            res.redirect('/')
        }
    })


    return router

}