const express = require('express')


module.exports = function(){
    const router = express.Router()

    router.get("/",function(request,response){
        response.render('index.hbs')
    }) 
    
    router.get('/about', (req, res) => {
        res.render('about.hbs')
    })
    
    router.get('/contact', (req, res) => {
    res.render('contact.hbs')
    })
    
    router.get('/staffs', (req, res) => {
        res.render('staffs.hbs')
    })
    
    router.get('/reviews', (req, res) => {
        res.render('review.hbs')
    })
    
    router.get('/comments', (req, res) => {
        res.render('comments.hbs')
    })

    router.get('/createComment', (req, res) => {
        res.render('create-comment.hbs')
    })
    
    router.get('/flight', (req, res) => {
        res.render('flight.hbs')
    })
    
    router.get('/marvel', (req, res) => {
        res.render('marvel.hbs')
    })
    
    return router
}
