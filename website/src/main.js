const awilix = require('awilix')
const express = require("express")

const container = awilix.createContainer()

container.register({
    accountManager: awilix.asFunction(require('./business-logic-layer/account-manager.js')),
    commentManager: awilix.asFunction(require('./business-logic-layer/comment-manager.js')),
    feedbackManager: awilix.asFunction(require('./business-logic-layer/feedBack-manager.js')),

    accountRepository: awilix.asFunction(require('./data-access-layer/user_table.js')),
    commentRepository: awilix.asFunction(require('./data-access-layer/comment_table.js')),
    feedbackRepository: awilix.asFunction(require('./data-access-layer/feedBack_table.js')),

    variusRouter: awilix.asFunction(require('./presentaion-layer/routers/varius-router')),
    userRouter: awilix.asFunction(require('./presentaion-layer/routers/user-router')),
    feedbackRouter: awilix.asFunction(require('./presentaion-layer/routers/feedback-router')),
    app: awilix.asFunction(require('./presentaion-layer/app')),
})
//const app = express()

/*app.get("/",function(req,res){
    console.log("hello")
    res.send("hello")
})*/
const app = container.resolve("app")

app.listen(8000,function(){
    console.log("Running on 8000!")
})