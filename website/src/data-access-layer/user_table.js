const mysql = require("../data-access-layer-array/node_modules/mysql2")



const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    database: 'hello',
    password: "abc123"
})

exports.createUser = function(username,password,name,callback){
    const query = " INSERT INTO user(username,password,name) VALUES(?,?,?)"
    const values = [username,password,name]
    connection.query(query, values, function(error){

        if(error){
            if(error.sqlMessage.includes('usernameUnique')){
                callback(['usernameTaken'])
            }else{
               callback(['internalError']) 
            }
        }else{
            callback([])
        }
        
    })
}

exports.getUserById = function(id,callback){
    const query = " SELECT * FROM user WHERE id = ?"
    const values = [id]
    connection.query(query,values,function(error,user){
        if(error){
            callback(['internalError'],null)
        }else{
            callback([],user)
        }
        
    })
}

exports.getUserById = function(username,callback){
    const query = " SELECT * FROM user WHERE username = ?"
    const values = [username]
    connection.query(query,values,function(error,user){
        if(error){
            callback(['internalError'],null)
        }else{
            callback([],user)
        }
        
    })
}

exports.getAllUsers = function(callback){
    const query = " SELECT * FROM user"
    connection.query(query,function(error,users){
        if(error){
            callback(['internalError'],null)
        }else{
            callback([],users)
        }
    })
}



/*'SELECT * FROM `user`'*/