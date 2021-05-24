const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('hello', 'postgres', 'abc123', {
    host: 'postgressDb',
    dialect:'postgres',
    port:5432,
});



const User = sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    tableName: 'users', 
    freezeTableName: true,

  })

  const Feedback = sequelize.define('feedback',{
     title:{
         type: DataTypes.STRING
     },
     content:{
         type: DataTypes.STRING
     },
     userId:{
         type:DataTypes.INTEGER,
         references: { model: 'users', key: 'id'},
         onDelete: 'CASCADE'
     },
     foreignKeyConstraint: true
 }, {
    timestamps: false,
    tableName: 'feedback',
    freezeTableName: true,


  })

  const Comment = sequelize.define('comment',{
     content:{
         type: DataTypes.STRING
     },
     feedbackId:{
        type: DataTypes.INTEGER,
        references: { model: 'feedback', key: 'id'},
        onDelete: 'CASCADE'
    },
     userId:{
         type:DataTypes.INTEGER,
         references: { model: 'users', key: 'id'},
         onDelete: 'CASCADE'
     },
     
     //foreignKeyConstraint: true
 }, {
    timestamps: false,
    tableName: 'comment',
    freezeTableName: true,
  })

 Comment.belongsTo(Feedback)
 Feedback.hasMany(Comment)
 Feedback.belongsTo(User)
 User.hasMany(Feedback)
 User.hasMany(Comment)
 
  
 const db = {
    User: User,
    Feedback: Feedback,
    Comment: Comment,
}

module.exports = db