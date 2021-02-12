const express = require('express')




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
			name: request.body.name
		}

		console.log(account)
		
		accountManager.createUser = (account, function(errors){
			
			if(errors.length == 0){
				response.render('index.hbs')
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
				response.render('register.hbs')
			}
			
		})
			
	})

	router.get('/login', (req, res) => {
        res.render('login.hbs')
    })

	router.post("/login", function(request, response){
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

	router.post('/logout', (req, res) =>{
    
        req.session.isLoggedIn = false
        res.redirect('/')
    
    })

    return router
}

