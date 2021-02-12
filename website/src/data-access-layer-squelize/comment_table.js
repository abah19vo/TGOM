const {Sequelize, DataTypes} = require("sequelize")

const sequelize = new Sequelize('sqlite::memory')

const Comment = sequelize.define('comment',{
    content:{
        type: DataTypes.STRING
    },
    userId:{
        type:DataTypes.INTEGER,
        references: { model: 'user', key: 'id'},
        onDelete: 'CASCADE'
    },
    feedbackId:{
        type: DataTypes.INTEGER,
        references: { model: 'feedback', key: 'id'},
        onDelete: 'CASCADE'
    },
    foreignKeyConstraint: true
})
Comment.belongsTo('comment')
Comment.belongsTo('feedback')

exports.createComment = function(newComment,callback){
    Comment.create(newComment).then(callback([])).catch(e=>{           
        callback(['internalError'])
    })
}

exports.getCommentsByFeedbackId = function(feedbackId,userId,callback){
    Comment.findAll({where : {id},raw:true}).then(feedback =>callback([],feedback)).catch(e=>{
        callback(['internalError'])
    })
}