const express = require("express")
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require("path")
const jwt = require('jsonwebtoken')



module.exports = function({userRouterAPI,feedbackRouterAPI}){
  const app = express()

  app.use(function(request, response, next){
    console.log(request.method, request.url)
    next()
  })
  app.set('views',path.join(__dirname,'views'))

  app.engine('hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: "hbs",
    layoutsDir: path.join(__dirname,'layouts')
  }))

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: false
  }))

  app.use('/feedbacksAPI',feedbackRouterAPI)
  app.use('/accountAPI',userRouterAPI)

  return app
}

