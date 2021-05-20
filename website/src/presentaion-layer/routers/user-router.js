const express = require('express')
const bcrypt = require('bcrypt')
const saltRounds = 10


module.exports = function({userManager}){
    const router = express.Router()



    router.get("/sign-up", function(request, response){
		response.render('register.hbs')
	})

	router.post("/sign-up", function(request, response){

		const account = {
			username: request.body.username,
			password: request.body.password,
			confirmPassword: request.body.repeat_password
		}
		
		userManager.createUser(account, function(errors, id){
			
			if(errors.length == 0){
				response.render('login.hbs')
			}else{
				
				const errorTranslations = {
					usernameTooShort: "The username needs to be at least 3 characters.",
					usernameTooLong: "The username is too long.",
					internalError: "Cant query out the request now.",
					usernameTaken: "Username already in use.",
					passwordDontMatch: "Passwords Does Not Match",
				}
				const errorMessages = errors.map(e => errorTranslations[e])
				
				const model = {
					errors: errorMessages,
					username: request.body.username,
					password: request.body.password,
					confirmPassword: request.body.repeat_password
				}
				response.render('register.hbs',model)
			}
			
		})
			
	})

	router.get('/sign-in', (req, res) => {
        res.render('login.hbs')
    })

	router.post("/sign-in", function(request, response){

		const user = {
			username: request.body.username,
			password: request.body.password,
		}      
		
		userManager.login(user,function(errors,id){
			const errorTranslations = {
				usernameTooShort: "The username needs to be at least 3 characters.",
				usernameTooLong: "The username is too long.",
				internalError: "Cant query out the request now.",
				invalidUsername:"the username is wrong or does not exist",
				invalidPassword: "Wrong password please try again",

			}

			if(errors.length > 0){
				const errorMessages = errors.map(e => errorTranslations[e])
				const model = {
					errors: errorMessages,
					username: insertedAccount.username,
					password: insertedAccount.password
				}
				response.render('login.hbs',model)

			}else{
				request.session.isLoggedIn = true
				request.session.userId = id
				response.redirect('/')
			}
			
		})
    })
    
    

	router.post('/sign-out', (req, res) =>{
        req.session.isLoggedIn = false
        res.redirect('/')
    })

    return router
}

