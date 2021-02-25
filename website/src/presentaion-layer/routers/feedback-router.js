const express = require('express')

module.exports = function({accountManager}){
    const router = express.Router()

    router.get('/', (req, res) => {
        res.render('feedbacks.hbs')
    })
    
    router.get('/:id', (req, res) => {

        
        res.render('feedback.hbs')
    })

    router.get('/create/:id', (req, res) => {

        res.render('create-feedback.hbs')
    })
    
    return router
}