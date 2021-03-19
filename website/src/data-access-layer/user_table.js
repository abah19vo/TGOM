const mysql = require("mysql2")
const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    database: 'hello',
    password: "abc123"
})

module.exports = function(){

    const exports = {}

    exports.createUser = function(newUser,callback){
        const query = " INSERT INTO user(username,password,name) VALUES(?,?,?)"
        const values = [newUser.username,newUser.password,newUser.name]
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
                callback(null,user)
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

       
    exports.getUserByUserName = function(username,callback){
        const query = " SELECT * FROM user WHERE username = ?"
        const values = [username]
        connection.query(query,values,function(error,user){
            if(error){
                callback(['internalError'],null)
            }else if(user.length==0 || user[0] == undefined){
                callback(['invalidUsername'],null)
            }else{
                callback([],user[0])
            }
        })
    }

    exports.getPassword = function(username,callback){
        const query = "SELECT password FROM user WHERE username = ?"
        const values = [username]
        connection.query(query, values, function(error,hash){
            if(error){
                callback(['internalError'],null)
            }else{
                callback([],hash)
            }
        })
    }

    return exports
}


/*'SELECT * FROM `user`'*/