const express = require("express")
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mysql = require("mysql2")
const path = require("path")

const app = express()





app.engine('hbs', expressHandlebars({
    defaultLayout: 'main.hbs',
    extname: "hbs"
}))

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    database: 'hello',
    password: "abc123"
});



app.use(bodyParser.urlencoded({
    extended: false
}))

app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))

/*app.use(express.static('views/CSS'))
app.use(express.static('views/images'))
*/
app.get("/",function(request,response){
    response.send("Hello Wod")
    console.log("Bye")

    connection.query(
        'SELECT * FROM `user`',
        function(err, results, fields) {
          console.log(results); // results contains rows returned by server
          console.log(fields); // fields contains extra meta data about results, if available
        }
    )
})

app.get('/contact', (req, res) => {
    console.log("hello idiot")
    res.render('contact.hbs')
})


app.listen(8080)


   
  
   
  