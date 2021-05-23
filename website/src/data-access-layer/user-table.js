const connection = require('./db')

module.exports = function(){

    const exports = {}

    exports.createUser = function(newUser,callback){
        const query = " INSERT INTO user(username,password) VALUES(?,?)"
        const values = [newUser.username,newUser.password]
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

    return exports
}


