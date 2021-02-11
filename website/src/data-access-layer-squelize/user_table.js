const {Sequelize, DataTypes, UniqueConstraintError} = require("sequelize")

const sequelize = new Sequelize('sqlite::memory')

const User = sequelize.define('user',{
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING
    },
    name:{
        type:DataTypes.STRING
    }
})

sequelize.sync({force:true})

module.exports =function(){
    exports.createUser = function(user,callback){
        User.create(user).then(callback([])).catch(e=>{
            if(e instanceof UniqueConstraintError){
                callback(['usernameTaken'])
            }else{
                callback(['internalError'])
            }
        })
         
    }
     
    exports.getUserById = function(id,callback){
        User.findOne({where : {id},raw:true}).then(account => callback([],account)).catch(e => callback(['internalError'],null)) 
    }
     
    exports.getUserByUsername = function(username ,callback){
        User.findOne({where : {username},raw:true}).then(account => callback([],account)).catch(e => callback(['internalError'],null))
    }
     
     exports.getAllUsers = function(callback){
        User.findAll({raw:true}).then(accounts =>callback([],accounts)).catch(e=>callback(['internalError'],null))
    }
    return exports
}

