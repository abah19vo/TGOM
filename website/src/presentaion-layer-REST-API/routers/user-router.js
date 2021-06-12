const express = require('express')
const jwt = require('jsonwebtoken')
const secret = 'its me mario!!'


module.exports = function({userManager}){
    const router = express.Router()


	router.post("/", function(request, response){

		const account = {
			username: request.body.username,
			password: request.body.password,
			confirmPassword: request.body.repeat_password,
		}
		userManager.createUser(account, function(errors){
			if(errors.length == 0){
				response.status(204).end()
			}else{
				
				response.status(400).json({
					"errors": errors
				})
			}
			
		})
			
	})

	router.post("/token", function(request, response){

		const user = {
			username: request.body.username,
			password: request.body.password,
		}		
		userManager.login(user,function(errors,userId){
			
			if(errors.length > 0){
				response.status(400).json({errors:errors})
			}else{
				const payload = {
					isLoggedIn: true,
					userId: userId
				}
				jwt.sign(payload, secret, function(err, token) {
					if(err){
						response.status(500).json({internalError:"internalError"})
					}else{
						response.status(200).json({
						"access_token": token,
						"userId": userId
					})
					}					
					
				})
			}
		})
    })
    return router
}

