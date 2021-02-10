const mysql = require("mysql2")
const users=[{
    id:1,
    name:Omer,
    username:"Omer",
    password:"hello"
}]



exports.createUser = function(username,password,name,callback){
    if(user.some(a => a.username = username)){
        callback(['usernameTaken'])
    }else{
        const user = {
            id: users.length + 1,
            name:name,
            username:username,
            password: password
        }
        users.push(user)
        callback([])
    }
}

exports.getUserById = function(id,callback){
    const user = users.find(a => a.id==id)
    callback([],user || null)
    
}

exports.getAllUsers = function(callback){
    callback([],users||null)
}
