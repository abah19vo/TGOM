const express = require("express")
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require("path")
const { response } = require("express")



module.exports = function({userRouterAPI,feedbackRouterAPI}){
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: false
  }))

  app.use(function(req, res, next){
    
    res.setHeader('Access-Control-Allow-Origin',"*")
    res.setHeader('Access-Control-Allow-Methods',"*")
    res.setHeader('Access-Control-Allow-Headers',"*")
    res.setHeader('Access-Control-Allow-Expose-Headers',"*")

    next()
  })

  app.use('/feedbacks',feedbackRouterAPI)
  app.use('/account',userRouterAPI)

  return app
}

