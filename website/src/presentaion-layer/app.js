const express = require("express")
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require("path")


const app = express()
//const user_table = require('../data-acces-layer/Mysql/user_table.js')


app.engine('hbs', expressHandlebars({
    defaultLayout: 'main.hbs',
    extname: "hbs"
}))


app.use(bodyParser.urlencoded({
    extended: false
}))

app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))

/*app.use(express.static('views/CSS'))
app.use(express.static('views/images'))
*/
app.get("/",function(request,response){
    response.render('index.hbs')
})


app.get('/about', (req, res) => {
    res.render('about.hbs')
})
  
app.get('/contact', (req, res) => {


res.render('contact.hbs')
})

app.get('/staffs', (req, res) => {
res.render('staffs.hbs')
})

app.get('/reviews', (req, res) => {
    res.render('review.hbs')
})

app.get('/comments', (req, res) => {
    res.render('comments.hbs')
})

app.get('/flight', (req, res) => {
    res.render('flight.hbs')
})

app.get('/marvel', (req, res) => {
    res.render('marvel.hbs')
})


app.get('/login', (req, res) => {

	if(req.session.isLoggedIn){
		res.redirect('/')
	}else{
    res.render('login.hbs')
	}
})


app.post("/login", function(request, response){
    const enteredusername = request.body.username
    const enteredpassword = request.body.password
  
    db.getPassword(ADMIN_USERNAME, function(error,hash){
      if(error){
        const model={
          loginError: true
        }
        response.render('login.hbs',model)     
      }else{
        bcrypt.compare(enteredpassword, hash.password, function(err, result) {
          if(err){
            const model={
              loginError: true
            }
            response.render('login.hbs',model)     
          }else{
            if(result && enteredusername == ADMIN_USERNAME ){
              request.session.isLoggedIn = true
              response.redirect("/")
            }else{
              const model={
                loginError: true
              }
              response.render('login.hbs',model)
            }
        }
        })
      }
    })  
  
  })  


  app.post('/logout', (req, res) =>{

    req.session.isLoggedIn = false
    res.redirect('/')
  
  })

  


app.listen(8080)


   
  
   
  