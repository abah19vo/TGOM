const awilix = require('awilix')
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
    commentRouter: awilix.asFunction(require('./presentaion-layer/routers/comment-router')),

    userRouterAPI: awilix.asFunction(require('./presentaion-layer-REST-API/routers/user-router')),
    feedbackRouterAPI: awilix.asFunction(require('./presentaion-layer-REST-API/routers/feedback-router')),

    appGUI: awilix.asFunction(require('./presentaion-layer/app')),
    appAPI: awilix.asFunction(require('./presentaion-layer-REST-API/app')),

    app: awilix.asFunction(require('./app'))
})

const app = container.resolve("app")

app.listen(8000,function(){
    console.log("Running on 8000!")
})