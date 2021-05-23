const BACKEND_URI = "http://localhost:8000/api/"

const constants = {
    USERNAME_MIN_LENGTH : 3,
    USERNAME_MAX_LENGTH : 20,
    PASSWORD_MAX_LENGTH : 25,
    TITLE_MIN_LENGTH : 3,
    GAME_MIN_LENGTH : 3,
    CONTENT_MIN_LENGTH : 20,
    CONTENT_MAX_LENGTH : 260,
}



translateAccountError = function(errors){	
	const errorTranslations = {
        nameCantContainDigit: "The Name Cant Contain Digits",
        usernameTooShort: "The username needs to be at least "+ constants.USERNAME_MIN_LENGTH +" characters.",
        usernameTooLong: "The username should be less than "+ constants.USERNAME_MAX_LENGTH +" characters",
        internalError: "Cant query out the request now.",
        usernameTaken: "Username already in use.",
        passwordDontMatch: "Passwords Does Not Match",
        passwordTooLong: "The password should be less than  "+ constants.PASSWORD_MAX_LENGTH +" characters.",
        invalidPassword: "Empty password field please try again",
        wrongPassword: "Wrong password please try a gain",
        notLoggedIn: "you're not logged in to the account that own this rights",
    }
    const errorMessages = errors.map(e => errorTranslations[e])
    
    return errorMessages
}



translateFeedbackError= function(errors){
    const errorTranslations = {
        titleTooShort: "the title is needs to be at least "+ constants.TITLE_MIN_LENGTH+" characters",
        gameTooShort: "the game name is supposed to be at least "+constants.GAME_MIN_LENGTH+" characters",
        internalError: "Cant query out the request now.",
        contentTooShort:"the content is supposed to be at least "+constants.CONTENT_MIN_LENGTH+" characters",
        contentTooLong: "the content is supposed to be at least under "+ constants.CONTENT_MAX_LENGTH+" characters",
        notLoggedIn: "you're Not LoggedIn",
        wrongUser:"you can not delete this post"
    }
    const errorMessages = errors.map(e => errorTranslations[e])
    return errorMessages
	
}

validatFeedback = function(newFeedback){
	const errors = []
	if(newFeedback.title.length < constants.TITLE_MIN_LENGTH){
		errors.push("titleTooShort")
	}
	if(newFeedback.game.length < constants.GAME_NAME_MIN_LENGTH){
		errors.push("gameTooShort")
	}
	if(newFeedback.content.length < constants.REVIEW_MIN_LENGTH){
		errors.push("contentTooShort")
    }
    if(newFeedback.content.length > constants.REVIEW_MAX_LENGTH){
		errors.push("contentTooLong")
	}
	return errors
}


validateNewAccount = function(user){
    const errors = []
    if(!user.hasOwnProperty("username")){
        errors.push("usernameMissing")
    }
    if(user.username.length < constants.USERNAME_MIN_LENGTH){
        errors.push("usernameTooShort")
    }
    if(user.username.length > constants.USERNAME_MAX_LENGTH){
        errors.push("usernameTooLong")
    }
    if(user.password != user.repeat_password){
        errors.push("passwordDontMatch")
    }
    return errors
}

validateAccount = function(user){
    const errors =[]
    if(!user.hasOwnProperty("username")){
        errors.push("usernameMissing")
    }
    if(user.username.length < constants.USERNAME_MIN_LENGTH){
        errors.push("usernameTooShort")
    }
    if(user.username.length > constants.USERNAME_MAX_LENGTH){
        errors.push("usernameTooLong")
    }
    return errors
}





let accessToken = ""
let userId


document.addEventListener("DOMContentLoaded", function(){

    showPage(location.pathname)

    document.body.addEventListener("click", function(event){
        
        const clickedElement = event.target
        
        if(clickedElement.tagName == "A"){
            
            if(clickedElement.hostname == location.hostname){
                
                event.preventDefault()
                
                const uri = clickedElement.getAttribute("href")
                
                if(location.pathname != uri){
                    hideCurrentPage()
                    showPage(uri)
                    history.pushState({}, "", uri)  
                }
                
            }
            
        }
        
    })

    document.getElementById("click_logout").addEventListener("click", async function(event){
        event.preventDefault()
        
         
        accessToken = ""
        document.body.classList.add("is-logged-out")
        document.body.classList.remove("is-logged-in")
        
        const uri = "/feedbacks"
        history.pushState({}, "", uri)
        hideCurrentPage()
        showPage(uri)
        
    })

    const loginPage = document.getElementById("login-page")
    const loginErrorUL = document.createElement('ul')
    loginPage.appendChild(loginErrorUL)

    document.getElementById("login-form").addEventListener("submit", async function(event){
        
        event.preventDefault()
        const username = document.getElementById("username_login").value
        const password = document.getElementById("password_login").value
        const data = {
            username:username,
            password:password,
        }

        let errorKodes = validateAccount(data)
        let errors = translateAccountError(errorKodes)

        if(errors.length > 0){
            
            loginErrorUL.textContent = ''
            for(const error of errors){
                const li = document.createElement("li")
                li.innerText = error
                loginErrorUL.appendChild(li)
            }
            
        }
        else{
        
            const response = await fetch(BACKEND_URI+"account/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(data)
            })
            
            switch(response.status){
                
                case 200:
                    
                    let body = await response.json()
                    
                    accessToken = body.access_token
                    userId = body.userId
                    document.body.classList.remove("is-logged-out")
                    document.body.classList.add("is-logged-in")
                    const uri = "/feedbacks"
                    history.pushState({}, "", uri)
                    hideCurrentPage()
                    showPage(uri)
                    
                break
                case 400:

                    body = await response.json()
                    errorKodes = body.errors
                    errors = translateAccountError(errorKodes)
                    
                    if(errors.length > 0){
                        loginErrorUL.textContent = ''
                        for(error of errors){
                            const li = document.createElement("li")
                            li.innerText=error
                            loginErrorUL.appendChild(li)
                        }
                        
                    }		
                    break
                case 500:
                    body = await response.json()
                    errorKode = body.errors
                    errors = translateAccountError(errorKode)
                        
                    if(errors.length > 0){ 
                        loginErrorUL.textContent = ''
                        for(let error of errors){
                            const li = document.createElement("li")
                            li.innerText=error
                            loginErrorUL.appendChild(li)
                        }
                    }	
            }
        }

    })

    const createFeedbackPage = document.getElementById("create-feedback-page")
    const feedbackErrorUL = document.createElement('ul')
    createFeedbackPage.appendChild(feedbackErrorUL)
    
    document.getElementById("create-feedback-form").addEventListener("submit", async function(event){
        
        event.preventDefault()
    
        const title = document.getElementById("title").value
        const game = document.getElementById("game").value
        const content = document.getElementById("content").value
                        
        const feedback = {
            title:title,
            game:game,
            content:content
        }
        
        let errorKodes = validatFeedback(feedback)
        let errors = translateFeedbackError(errorKodes)
    

        if(errors.length > 0){

            feedbackErrorUL.textContent = ''
            for(const error of errors){
                const li = document.createElement("li")
                feedbackErrorUL.appendChild(li)
                li.innerText = error

            }
        }

        else{

            const response = await fetch(BACKEND_URI+"feedbacks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+accessToken
                },
                body: JSON.stringify(feedback)
            })

        
            switch(response.status){
                
                case 201:
                    const uri = "/feedbacks"
                    history.pushState({}, "", uri)
                    hideCurrentPage()
                    showPage(uri)
                break

                case 400:
                    body = await response.json()
                    errorKodes = body.errors
                    errors = translateFeedbackError(errorKodes)
                    if(errors.length > 0){
                        feedbackErrorUL.textContent = ''
                        for(error of errors){
                            const li = document.createElement("li")
                            li.innerText = error
                            feedbackErrorUL.appendChild(li)
                        }
                        
                    }	

                break	
            }
        }
    })

    const updateFeedbackPage = document.getElementById("update-feedback-page")
    const updateFeedbackErrorUL = document.createElement('ul')
    updateFeedbackPage.appendChild(updateFeedbackErrorUL)

    document.getElementById("update-feedback-form").addEventListener("submit", async function(event){
        
        event.preventDefault()

        const title = document.getElementById("newTitle").value
        const game = document.getElementById("newGame").value
        const content = document.getElementById("newContent").value
        const authorId = document.getElementById("authorId").value
                        
        const data = {
            title: title,
            game: game,
            content: content,
            authorId:parseInt(authorId),
        }
        
        let errorKodes = validatFeedback(data)
        let errors = translateFeedbackError(errorKodes)

        if(errors.length > 0){

            updateFeedbackErrorUL.textContent = ''
            for(const error of errors){

                const li = document.createElement("li")
                updateFeedbackErrorUL.appendChild(li)
                li.innerText = error

            }
        }

        else{

            const uri = location.pathname
            const id = uri.split("/")[2]

            const response = await fetch(BACKEND_URI+"feedbacks/"+id, {	
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+accessToken
                },
                body: JSON.stringify(data)
            })

        
            switch(response.status){
                
                case 204:
                    updateFeedbackErrorUL.textContent = ''
                    const uri = "/feedbacks/"+id
                    history.pushState({}, "", uri)
                    hideCurrentPage()
                    showPage(uri)						
                break

                case 400:
                    body = await response.json()
                    errorKodes = body.errors
                    errors = translateFeedbackError(errorKodes)

                    if(errors.length > 0){
                        updateFeedbackErrorUL.textContent = ''
                        for(error of errors){
                            const li = document.createElement("li")
                            li.innerText = error
                            updateFeedbackErrorUL.appendChild(li)
                        }
                        
                    }	

                break
                case 500:
                    body = await response.json()
                    errorKode = body.error
                    errors = translateFeedbackError(errorKode)

                    if(errors.length > 0){
                        updateFeedbackErrorUL.textContent = ''
                        for(error of errors){
                            const li = document.createElement("li")
                            li.innerText = error
                            updateFeedbackErrorUL.appendChild(li)
                        }
                        
                    }	

                break
            }
        }
        
    })
    
    const registerPage = document.getElementById("register-page")
    const registerErrorUL = document.createElement('ul')
    registerPage.appendChild(registerErrorUL)

    document.getElementById("register-form").addEventListener("submit", async function(event){
        event.preventDefault()
        
        const name = document.getElementById("name").value
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        const repeatPassword = document.getElementById("repeat_password").value

        const data = {
            name:name,
            username:username,
            password:password,
            repeat_password:repeatPassword
        }
        
        let errorKodes = validateNewAccount(data)
        let errors = translateAccountError(errorKodes)

        if(errors.length > 0){
            
            registerErrorUL.textContent = ''
            for(const error of errors){
                const li = document.createElement("li")
                li.innerText = error
                registerErrorUL.appendChild(li)
            }
            
        }
        else{
        
            const response = await fetch(BACKEND_URI+"account/account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(data)
            })

            switch(response.status){
                
                case 204:							
                    const uri = "/login"
                    history.pushState({}, "", uri)
                    hideCurrentPage()
                    showPage(uri)
                    
                    break
                case 400:

                    body = await response.json()
                    errorKodes = body.errors
                    errors = translateAccountError(errorKodes)
                    if(errors.length > 0){
                        registerErrorUL.textContent = ''
                        for(const error of errors){
                            const li = document.createElement("li")
                            li.innerText=error
                            registerErrorUL.appendChild(li)
                        }
                        
                    }		
                break
            }
        }
    })

    window.addEventListener("popstate", function(event){
        event.preventDefault()
        const uri = location.pathname
        hideCurrentPage()
        showPage(uri)
    
    })

    function showPage(uri){
        
        let newPageId = ""
        switch(uri){
            
            case "/":
                newPageId = "home-page"
            break
            case "/about":
                newPageId = "about-page"
            break
            case "/login":
                newPageId = "login-page"
            break
            case "/create-feedback":
                newPageId = "create-feedback-page"
            break
            case "/update-feedback":
                newPageId = "update-feedback-page"
            break
            case "/feedbacks":
                newPageId = "all-feedbacks-page"
                loadAllFeedbacks()
            break
            case "/register":
                newPageId = "register-page"
            break
            default:
                
                if(uri.startsWith("/feedbacks/")){
                    newPageId = "feedback-page"
                    const feedbackId = uri.split("/")[2]
                    loadFeedbackPage(feedbackId)
                }else if(uri.startsWith("/update-feedback/")){
                    newPageId = "update-feedback-page"
                    const feedbackId = uri.split("/")[2]
                    loadUpdateFeedbackPage(feedbackId)
                }else{
                    newPageId = "not-found-page"
                }
            
        }
        document.getElementById(newPageId).classList.add("current-page")	
    }

    function hideCurrentPage(){
        document.querySelector(".current-page").classList.remove("current-page")
    }


    async function loadAllFeedbacks(){
        
        const page = document.getElementById("all-feedbacks-page")
        page.innerText = ""
        
        const h1 = document.createElement("h1")
        h1.innerText = "All Feedbacks"
        page.appendChild(h1)
        
        const response = await fetch(BACKEND_URI+"feedbacks")
        const ul = document.createElement("ul")

        switch(response.status){
            
            case 200:
                
                const feedbacks = await response.json()

                for(const feedback of feedbacks){
                    const li = document.createElement("li")
                    const a = document.createElement("a")
                    a.innerText = feedback.title
                    a.setAttribute("href", "/feedbacks/"+feedback.id)
                    li.appendChild(a)
                    ul.appendChild(li)
                }
                page.appendChild(ul)
                
            break
            
            case 500:

                const errorKodes = await response.json()
                const errors = translateFeedbackError(errorKodes)
                for(const error of errors){
                    const li = document.createElement("li")
                    li.innerText = error
                    ul.appendChild(li)
                }
                page.appendChild(ul)

            break
            default:
                const h1 = document.createElement("h1")
                h1.innerText = "no page found" 
                page.appendChild(h1)
                
            
            
        }
        
    }

    
    
    
    const feedbackPage = document.getElementById("register-page")
    const deleteErrorUL = document.createElement('ul')
    feedbackPage.appendChild(deleteErrorUL)
    
    async function loadFeedbackPage(id){
        const page = document.getElementById("feedback-page")
        page.innerText = ""
        
        const h1 = document.createElement("h1")
        h1.innerText = "Feedback"
        page.appendChild(h1)
        let errorKodes 
        let errors 
        
        const response = await fetch(BACKEND_URI+"feedbacks/"+id)
        
        switch(response.status){
            
            case 200:
                
                const feedback = await response.json()

                
                const titleP = document.createElement("p")
                const usernameP = document.createElement("p")
                const gameP = document.createElement("p")
                const contentP = document.createElement("p")

                const updateFeedback = document.createElement("p")
                const updateLink = document.createElement("a")
                updateLink.innerText = "Update This Feedback"
                updateLink.setAttribute("href", "/update-feedback/"+feedback.id)
                updateLink.setAttribute("class", "if-is-logged-in")
                updateFeedback.appendChild(updateLink)
                
                const deleteDiv = document.createElement("div")
                deleteDiv.setAttribute("id", "delete-feedback")

                const authorId = document.createElement("input")
                authorId.setAttribute("id", "authorId")
                authorId.setAttribute("type", "hidden")

                authorId.value = feedback.authorId 

                const deleteButton = document.createElement("button")
                deleteButton.innerText = "Delete Feedback"
                deleteButton.setAttribute("class", "if-is-logged-in")
                deleteButton.setAttribute("type", "click")
                deleteButton.setAttribute("id", "delete-feedback")
                deleteDiv.appendChild(deleteButton)

                titleP.innerText ="Title: "+ feedback.title
                usernameP.innerText ="By: "+ feedback.username
                gameP.innerText ="Game: "+ feedback.game
                contentP.innerText ="Content: "+ feedback.content
                
                page.appendChild(usernameP)
                page.appendChild(titleP)
                page.appendChild(gameP)
                page.appendChild(contentP)
                page.appendChild(authorId)

                if(userId === feedback.authorId ){
                    page.appendChild(updateLink)
                    page.appendChild(updateFeedback)
                    page.appendChild(deleteDiv)
                    document.getElementById("delete-feedback").addEventListener("click", async function(event){
                        event.preventDefault()	
                        
                        const uri = location.pathname
                        const id = uri.split("/")[2]
                        const data = {authorId: feedback.authorId}

                        const response = await fetch(BACKEND_URI+"feedbacks/"+id,{	
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer "+accessToken
                            },
                            body:  JSON.stringify(data),
                        })

                        
                        switch(response.status){
                            
                            case 201:
                                const uri = "/feedbacks"
                                history.pushState({}, "", uri)
                                hideCurrentPage()
                                showPage(uri)						
                            break

                            case 400:
                                body = await response.json()
                                errorKodes = body.errors
                                errors = translateFeedbackError(errorKodes)    
                                if(errors.length > 0){
                                    for(error of errors){
                                        const li = document.createElement("li")
                                        li.innerText = error
                                        page.appendChild(li)
                                    }
                                    
                                }	

                            break
                        }
                        
                    })
                }
                
                
            break
            
            case 500:

                errorKodes = await response.json()
                errors = translateFeedbackError(errorKodes) 
                const ul = document.createElement("ul")
                
                for(const error of errors){
                    const li = document.createElement("li")
                    li.innerText = error
                    ul.appendChild(li)
                }
                page.appendChild(ul)

            break

            default:
                const h1 = document.createElement("h1")
                h1.innerText = "no page found" 
                page.appendChild(h1)
        }
    }

    async function loadUpdateFeedbackPage(id){

        const page = document.getElementById("feedback-page")
        page.innerText = ""
        
        const h1 = document.createElement("h1")
        h1.innerText = "Update Feedback"
        page.appendChild(h1)
        let errorKodes 
        let errors 
        
        const response = await fetch(BACKEND_URI+"feedbacks/"+id)
        const feedback = await response.json()
        switch(response.status){
            
            case 200:
                const title = feedback.title
                const game = feedback.game
                const content = feedback.content
                const authorId = feedback.authorId

                document.getElementById("newTitle").value = title
                document.getElementById("newGame").value = game
                document.getElementById("newContent").value = content
                document.getElementById("authorId").value = authorId

            case 500:

                

            break
            default:
                const h1 = document.createElement("h1")
                h1.innerText = "no page found" 
                page.appendChild(h1)
        }
    }
    

})	