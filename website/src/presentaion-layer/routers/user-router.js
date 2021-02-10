
const express = require('express')

const accounts = [{
    id: 1,
    name:"haiwan",
    username: "kalb",
    password : "abc123"
}]

module.exports = function({accountManager}){
    const router = express.Router()

    router.get("/sign-up", function(request, response){
		const account = {
			username: request.body.username,
			password: request.body.password
		}
		
		accountManager.createAccount(account, function(errors, id){
			
			if(errors.length == 0){
				response.redirect("/accounts")
			}else{
				
				const errorTranslations = {
					usernameTooShort: "The username needs to be at least 3 characters.",
					usernameTooLong: "The username is too long.",
					internalError: "Cant query out the request now.",
					usernameTaken: "Username already in use."
				}
				
				const errorMessages = errors.map(e => errorTranslations[e])
				
				const model = {
					errors: errorMessages,
					username: account.username,
					password: account.password
				}
				
				response.render("accounts-sign-up.hbs", model)
				
			}
			
		})
	})



    return router
}

