const express = require("express")
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require("path")
const bcrypt = require('bcrypt')
const session = require('express-session')
const redis = require('redis')
let RedisStore = require('connect-redis')(session)

var Client = redis.createClient();

//const ADMIN_USERNAME = "raswer"

module.exports = function({userRouter,variusRouter}){
  const app = express()

  app.set('views',path.join(__dirname,'views'))

  app.engine('hbs', expressHandlebars({
    defaultLayout: 'main',
    extname: "hbs",
    layoutsDir: path.join(__dirname,'layouts')
  }))

	app.use(express.urlencoded())
 
  app.use(express.static(path.join(__dirname,'public')))

  app.use('/account',userRouter)
  app.use('/',variusRouter)
  
  app.use(
    session({
      store: new RedisStore({client: Client}),
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

  Client.on("error", function (err) {
    console.log(err);
  });

  Client.on("connect", () => {
    console.log('✅ connect redis success !')
   })

  return app
}

