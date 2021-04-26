const BACKEND_URI = "http://localhost:8000/api/"
			

let accessToken = ""
const USERNAME_MIN_LENGTH = 3
const USERNAME_MAX_LENGTH = 20
const PASSWORD_MAX_LENGTH = 25
const TITLE_MIN_LENGTH = 3
const GAME_MIN_LENGTH = 3
const CONTENT_MIN_LENGTH = 10

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
        const response = await fetch(BACKEND_URI+"account/sign-out", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer "+accessToken
            },
        })
        
        switch(response.status){
            
            case 200:
                
                var body = await response.json()
                
                accessToken = body.access_token
                document.body.classList.add("is-logged-out")
                document.body.classList.remove("is-logged-in")
                
                const uri = "/feedbacks"
                history.pushState({}, "", uri)
                hideCurrentPage()
                showPage(uri)
                
                break
            case 400:

                body = await response.json()
                const errors = body.errorMessages
                
                if(errors.length > 0){
                    const ul = document.createElement("ul")
                    page.appendChild(ul)
                    for(error of errors){
                        const li = document.createElement("li")
                        li.innerText(error)
                        ul.appendChild(li)
                    }
                    
                }		
                break
            case 500:
                body = await response.json()

                errors = body.internalError
                    
                if(errors.length > 0){ 
                    const errorClass = document.getElementById("errors")
                    const ul = document.createElement("ul")
                    errorClass.appendChild(ul)
                    for(error of errors){
                        const li = document.createElement("li")
                        li.innerText(error)
                        ul.appendChild(li)
                    }
                }	
            default:
                
                // TODO.
            
        }
        
    })

    const loginPage = document.getElementById("login-page")
    const loginErrorUL = document.createElement('ul')
    loginPage.appendChild(loginErrorUL)

    document.getElementById("login-form").addEventListener("submit", async function(event){
        
        event.preventDefault()
        const page = document.getElementById("login-page")
        const username = document.getElementById("username_login").value
        const password = document.getElementById("password_login").value

        const data = {
            username:username,
            password:password,
        }

        validateAccount = function(data){
            const errors =[]

            if(data.username.length < USERNAME_MIN_LENGTH){
                errors.push("Username Too Short")
            }

            if(data.username.length > USERNAME_MAX_LENGTH){
                errors.push("Username Too Long")
            }
            if(data.password.length > PASSWORD_MAX_LENGTH){
                errors.push("Password Too Long")
            }

            if(data.password.length == 0){
                errors.push("Password Too Short")
            }

            return errors
        }

        const errors = validateAccount(data)

        if(errors.length > 0){
            
            loginErrorUL.textContent = ''
            for(const error of errors){
                const li = document.createElement("li")
                li.innerText = error
                loginErrorUL.appendChild(li)
            }
            
        }
        else{
        
            const response = await fetch(BACKEND_URI+"account/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(data)
            })
            
            switch(response.status){
                
                case 200:
                    
                    var body = await response.json()
                    
                    accessToken = body.access_token
                    document.body.classList.remove("is-logged-out")
                    document.body.classList.add("is-logged-in")
                    const uri = "/feedbacks"
                    history.pushState({}, "", uri)
                    hideCurrentPage()
                    showPage(uri)
                    
                    break
                case 400:

                    body = await response.json()
                    const errors = body.errorMessages
                    
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

                    errors = body.internalError
                        
                    if(errors.length > 0){ 
                        loginErrorUL.textContent = ''
                        for(error of errors){
                            const li = document.createElement("li")
                            li.innerText=error
                            loginErrorUL.appendChild(li)
                        }
                    }	
                default:
                    
                
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
        
        validateAccount = function(data){
            let errors = []
            
            if(data.title.length < TITLE_MIN_LENGTH){
                errors.push("Title Too Short")
            }

            if(data.game.length < GAME_MIN_LENGTH){
                errors.push("Game Too Short")
            }

            if(data.content.length < CONTENT_MIN_LENGTH){
                errors.push("Content Too Short")
            }

            return errors
        }

        const errors = validateAccount(feedback)
    

        if(errors.length > 0){

            feedbackErrorUL.textContent = ''
            for(const error of errors){
                const li = document.createElement("li")
                feedbackErrorUL.appendChild(li)
                li.innerText = error

            }
        }

        else{

            const response = await fetch(BACKEND_URI+"feedbacks/create", {
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
                    const errors = body.errorMessages
                        
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
                        
        const newFeedback = {
            title: title,
            game: game,
            content: content
        }
        
        validateUpdate = function(data){
            let errors = []
            
            if(data.title.length < TITLE_MIN_LENGTH){
                errors.push("Title Too Short")
            }

            if(data.game.length < GAME_MIN_LENGTH){
                errors.push("Game Too Short")
            }

            if(data.content.length < CONTENT_MIN_LENGTH){
                errors.push("Content Too Short")
            }

            return errors
            
        }

        const errors = validateUpdate(newFeedback)

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
            console.log(newFeedback)

            const response = await fetch(BACKEND_URI+"feedbacks/"+id, {	
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+accessToken
                },
                body: JSON.stringify(newFeedback)
            })

        
            switch(response.status){
                
                case 204:
                    const uri = "/feedbacks/"+id
                    history.pushState({}, "", uri)
                    hideCurrentPage()
                    showPage(uri)						
                break

                case 400:
                    body = await response.json()
                    const errors = body.errorMessages
                        
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
        const page = document.getElementById("register-page")
        
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
        
        validateAccount = function(data){
            const errors =[]

            if(!isNaN(name)){
                errors.push("Name Cant Contain Digit")
            }
            
            if(data.username.length < USERNAME_MIN_LENGTH){
                errors.push("Username Too Short")
            }

            if(data.username.length > USERNAME_MAX_LENGTH){
                errors.push("Username Too Long")
            }
            
            if(data.password.length > PASSWORD_MAX_LENGTH){
                errors.push("Password Too Long")
            }

            if(data.password != data.repeat_password){
                errors.push("Password Does Not Match")
            }

            return errors
        }

        const errors = validateAccount(data)

        if(errors.length > 0){
            
            registerErrorUL.textContent = ''
            for(const error of errors){
                const li = document.createElement("li")
                li.innerText = error
                registerErrorUL.appendChild(li)
            }
            
        }
        else{
        
            const response = await fetch(BACKEND_URI+"account/sign-up", {
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
                    const errors = body.errorMessages
                    
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

                const errors = await response.json()
                
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
                page.appendChild(updateFeedback)
                page.appendChild(updateLink)
                page.appendChild(deleteDiv)


                document.getElementById("delete-feedback").addEventListener("click", async function(event){
                    event.preventDefault()	
                    
                    const uri = location.pathname
                    const id = uri.split("/")[2]

                    const response = await fetch(BACKEND_URI+"feedbacks/"+id,{	
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer "+accessToken
                        },
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
                            const errors = body.errorMessages
                                
                            if(errors.length > 0){
                                registerErrorUL.textContent = ''
                                for(error of errors){
                                    const li = document.createElement("li")
                                    li.innerText = error
                                    registerErrorUL.appendChild(li)
                                }
                                
                            }	

                        break
                    }
                    
                })
                
            break
            
            case 500:

                const errors = await response.json()
                
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

})	