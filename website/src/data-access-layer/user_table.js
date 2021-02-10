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
        callback(error)
    })
}

exports.getUserById = function(id,callback){
    const query = " SELECT * FROM user WHERE id = ?"
    const values = [id]
    connection.query(query,values,function(error,user){
        callback(error,user)
    })
}

exports.getAllUsers = function(id,callback){
    const query = " SELECT * FROM user WHERE id = ?"
    connection.query(query,function(error,user){
        callback(error,user)
    })
}



/*'SELECT * FROM `user`'*/