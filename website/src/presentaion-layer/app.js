const express = require("express")
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require("path")
var expressSession = require('express-session')
const bcrypt = require('bcrypt')

//const ADMIN_USERNAME = "raswer"

module.exports = function({userRouter,variusRouter,feedbackRouter}){
  const app = express()

  app.set('views',path.join(__dirname,'views'))

  app.engine('hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: "hbs",
    layoutsDir: path.join(__dirname,'layouts')
  }))

  app.use(expressSession({
    secret: "ldfdslmlfmsdo",
    saveUninitialized:false,
    resave: false,
  }))

  //app.use(bodyParser.urlencoded())
	app.use(express.urlencoded())

  
  app.use(express.static(path.join(__dirname,'public')))

  app.use('/feedbacks',feedbackRouter)
  app.use('/account',userRouter)
  app.use('/',variusRouter)
  
  return app
}



/*

app.engine('hbs', expressHandlebars({
    defaultLayout: 'main.hbs',
    extname: "hbs"
}))



app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))



app.use(function(req,res,next){
  const isLoggedIn = req.session.isLoggedIn
  res.locals.isLoggedIn = isLoggedIn
  next()
})
const userRouter = require('./routers/user-router.js')
app.use('/user',userRouter)
*/
  
   
  