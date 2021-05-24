const express = require('express')

module.exports = function({commentManager}){
    const router = express.Router()  
    

    router.post('/:id/create', (req, res) => {
        const newComment ={
            content: req.body.content,
            feedbackId:parseInt(req.params.id),
            userId: parseInt(req.session.userId),
        }

        const auth = {
            userId: req.session.userId,
            isLoggedIn: req.session.isLoggedIn
        }
        commentManager.createComment(newComment, auth,function(errors){
            const errorTranslations = {
                commentTooShort: "the comment is needs to be at least 4 characters",
                internalError: "Cant query out the request now.",
                commentTooLong: "The comment is supposed to be at least under 260 characters",
                notLoggedIn: "You Need To Be Logged In To Be Able To Comment"
            }
            if(errors.length > 0){
                const errorMessages = errors.map(e => errorTranslations[e])
                const model = {
                    errors: errorMessages,
                    content: newComment.content,
                }
                res.render('create-comment.hbs',model)
            }else{
                res.redirect('/feedbacks/'+ req.params.id)
            }
        })
    })

    router.get('/:id/create', (req, res) => {
        
        const model ={
            id: req.params.id
        }
        res.render('create-comment.hbs',model)
    })


    return router

}