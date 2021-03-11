const express = require("express")
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require("path")
const session = require('express-session')
const cookieParser = require('cookie-parser')
const redis = require('redis')
const redisStore = require('connect-redis')(session)
const Client = redis.createClient(6379, 'redis');




//const ADMIN_USERNAME = "raswer"

module.exports = function({userRouter,variusRouter,feedbackRouter, commentRouter}){
  const app = express()


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

  
  app.use(cookieParser())
 
  app.use(express.static(path.join(__dirname,'public')))


  app.use(
    session({
      store: new redisStore({host: redis, port:6379, client: Client}),
      saveUninitialized: false,
      secret: 'keyboard cat',
      resave: false,
    })
  )

  app.use(function(req,res,next){
    const isLoggedIn = req.session.isLoggedIn
    res.locals.isLoggedIn = isLoggedIn
    next()
  })

  app.use('/comment',commentRouter)
  app.use('/feedbacks',feedbackRouter)
  app.use('/account',userRouter)
  app.use('/',variusRouter)

  Client.on("error", function (err) {
    console.log(err);
  });

  Client.on("connect", () => {
    console.log('✅ connect redis success !')
   })

  return app
}

