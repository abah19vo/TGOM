const express = require("express")
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require("path")



module.exports = function({userRouterAPI,feedbackRouterAPI}){
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: false
  }))

  app.use('/feedbacks',feedbackRouterAPI)
  app.use('/account',userRouterAPI)

  return app
}

