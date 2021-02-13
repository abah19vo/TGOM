const express = require('express')
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = function({accountManager}){
    const router = express.Router()



    router.get("/sign-up", function(request, response){
		console.log("hello word")
		response.render('register.hbs')
	})

	router.post("/sign-up", function(request, response){

		const account = {
			username: request.body.username,
			password: request.body.password,
			name: request.body.name,
			confirmPassword: request.body.repeat_password
		}
		console.log(account)
		
		accountManager.createUser(account, function(errors, id){
			
			if(errors.length == 0){
				response.render('login.hbs')
			}else{
				
				const errorTranslations = {
					usernameTooShort: "The username needs to be at least 3 characters.",
					usernameTooLong: "The username is too long.",
					internalError: "Cant query out the request now.",
					usernameTaken: "Username already in use.",
                    nameIsNumber: "Name Cant Contain Numbers",
					passwordDontMatch: "Passwords Does Not Match"
				}
				
				const errorMessages = errors.map(e => errorTranslations[e])
				
				const model = {
					errors: errorMessages,
					username: account.username,
					password: account.password,
				}
				response.render('register.hbs')
                console.log(errors)
			}
			
		})
			
	})

	router.get('/login', (req, res) => {
        res.render('login.hbs')
    })

	router.post("/login", async (request, response) => {

		const login = {
			enteredUsername: request.body.username,
			enteredPassword: request.body.password,
		}      
    })
    
    

	router.post('/logout', (req, res) =>{
    
        req.session.isLoggedIn = false
        res.redirect('/')
    
    })

    return router
}

