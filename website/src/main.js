const awilix = require('awilix')

const container = awilix.createContainer()

container.register({
    accountManager: awilix.asfunction(require('./business-logic-layer/account-manager')),
    commentManager: awilix.asfunction(require('./business-logic-layer/comment-manager')),
    feedbackManager: awilix.asfunction(require('./business-logic-layer/feedback-manager')),
    userRouter: awilix.asfunction(require('./presentaion-layer/routers/user-router')),
    app: awilix.asfunction(require)
})