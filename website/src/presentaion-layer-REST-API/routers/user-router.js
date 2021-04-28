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
				
				response.status(400).json({
					"errors": errors
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
			
			if(errors.length > 0){
				response.status(400).json({errors:errors})
			}else{
				const payload = {
					isLoggedIn: true,
					userId: id
				}
				jwt.sign(payload, secret, function(err, token) {
					if(err){
						response.status(500).json({internalError:"internalError"})
					}else{
						response.status(200).json({
						"access_token": token
					})
					}					
					
				})
			}
			
		})
    })


    return router
}

