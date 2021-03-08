const { Pool, Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'postgressDb',
    database:  'hello',
    password: 'abc123',
    port:5432,
})
client.connect()


module.exports = function(){
    const exports = {}
    
    exports.createUser = function(newUser,callback){
        const query = "INSERT INTO users(username,password,name) VALUES($1,$2,$3)"
        const values = [newUser.username,newUser.password,newUser.name]
        client.query(query, values, function(error){
            if(error){
                
                if(error.message.includes('users_username_key')){
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
        const query = " SELECT * FROM user WHERE id = $1"
        const values = [id]
        client.query(query,values,function(error,user){
            if(error){
                callback(['internalError'],null)
            }else{
                callback(null,user)
            }
        })
    }
    
    exports.getAllUsers = function(callback){
        const query = " SELECT * FROM user"
        client.query(query,function(error,users){
            if(error){
                callback(['internalError'],null)
            }else{
                callback([],users)
            }
        })
    }

       
    exports.getUserByUserName = function(username,callback){
        const values = [username]
        const query = {
            name: 'fetch-user',
            text: " SELECT * FROM users WHERE username = $1",
            values: [1],
          }
        
        client.query(query,values,function(error,user){
            if(error){
                callback(['internalError'],null)
            }else if(user.rows[0].length==0 || user.rows[0] == undefined){
                callback(['invalidUsername'],null)
            }else{
                callback([],user.rows[0])
            }
        })
    }

    exports.getPassword = function(username,callback){
        const query = "SELECT password FROM user WHERE username = 1$"
        const values = [username]
        client.query(query, values, function(error,hash){
            if(error){
                callback(['internalError'],null)
            }else{
                callback([],hash.rows[0])
            }
        })
    }

    return exports
}
