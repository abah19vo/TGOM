const express = require("express")

module.exports = function({appGUI,appAPI}){
    const app = express()

    app.use('/api',appAPI)     
    app.use('/',appGUI)

    return app
}

