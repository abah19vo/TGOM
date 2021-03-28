const express = require('express')
const jwt = require('jsonwebtoken')
const secret = 'its me mario!!'


module.exports = function({accountManager}){
    const router = express.Router()


	router.post("/sign-up", function(request, response){

		const account = {
			username: request.body.username,
			password: request.body.password,
			confirmPassword: request.body.repeat_password,
		}
		accountManager.createUser(account, function(errors){
			if(errors.length == 0){
				response.status(204).end()
			}else{
				const errorTranslations = {
					nameCantContainDigit: "The Name Cant Contain Digits",
					usernameTooShort: "The username needs to be at least 3 characters.",
					usernameTooLong: "The username is too long.",
					internalError: "Cant query out the request now.",
					usernameTaken: "Username already in use.",
					passwordDontMatch: "Passwords Does Not Match",
				}
				const errorMessages = errors.map(e => errorTranslations[e])
				response.status(400).json({
					"errorMessages": errorMessages
				})
			}
			
		})
			
	})

	router.post("/sign-in", function(request, response){

		const insertedAccount = {
			username: request.body.username,
			password: request.body.password,
		}      
		
		accountManager.login(insertedAccount,function(errors,id){
			const errorTranslations = {
				usernameTooShort: "The username needs to be at least 3 characters.",
				usernameTooLong: "The username is too long.",
				internalError: "Cant query out the request now.",
				invalidUsername:"the username is wrong or does not exist",
				invalidPassword: "Wrong password please try again",

			}

			if(errors.length > 0){
				const errorMessages = errors.map(e => errorTranslations[e])
				response.status(400).json({errorMessages:errorMessages})
			}else{
				const payload = {
					isLoggedIn: true,
					userId: id
				}
				jwt.sign(payload, secret, function(err, token) {
					if(err){
						response.status(500).json({internalError:errorTranslations.internalError})
					}else{
						response.status(200).json({
						"access_token": token
					})
					}					
					
				})
			}
			
		})
    })
    
    

	router.post('/sign-out', (req, res) =>{
        const payload = {
			isLoggedIn: false,
		}
		jwt.sign(payload, secret, function(err, token) {
			if(err) res.status(500).json({internalError: ["Cant query out the request now."]})

			res.status(200).json({
				"access_token": token
			})
		})
    })

    return router
}

