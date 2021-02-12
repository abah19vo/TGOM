const {Sequelize, DataTypes} = require("sequelize")

const sequelize = new Sequelize('sqlite::memory')

const Feedback = sequelize.define('feedback',{
    title:{
        type: DataTypes.STRING
    },
    content:{
        type: DataTypes.STRING
    },
    userId:{
        type:DataTypes.INTEGER,
        references: { model: 'user', key: 'id'},
        onDelete: 'CASCADE'
    },
    foreignKeyConstraint: true
})

Feedback.belongsTo('user')
Feedback.hasMany('comment')

module.exports =function(){
   
    exports.createFeedback= function(newFeedback,callback){
        Feedback.create(newFeedback).then(callback([])).catch(e=>{           
                callback(['internalError'])
        })
        
        
    }

    exports.getFeedbackById = function(id,callback){
        Feedback.findOne({where : {id},raw:true}).then(feedback =>callback([],feedback)).catch(e=>{
            callback(['internalError'])
        })
        
    }



    exports.getAllFeedbacks = function(callback){
        Posts.findAll({
            include: [{
              model: user,
              where: ["id = userId"]
             }]
          },{raw: true}).then(AllFeedbacks => callback([],AllFeedbacks)).catch(e=>callback(['internalError'],null))
    } 
    return exports
}