const express = require('express')


module.exports = function(){
    const router = express.Router()

    router.get("/", (req,res) => {
        res.render('index.hbs')
    }) 
    
    router.get('/about', (req, res) => {
        res.render('about.hbs')
    })
    
    router.get('/contact', (req, res) => {
        res.render('contact.hbs')
    })
    
    router.get('/flight', (req, res) => {
        res.render('flight.hbs')
    })
    
    router.get('/marvel', (req, res) => {
        res.render('marvel.hbs')
    })
    
    return router
}
