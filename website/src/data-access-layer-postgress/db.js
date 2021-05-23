const { Sequelize, DataTypes, UniqueConstraintError } = require('sequelize')

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
    timestamps: false
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
 })

  const Comment = sequelize.define('comment',{
     content:{
         type: DataTypes.STRING
     },
     userId:{
         type:DataTypes.INTEGER,
         references: { model: 'users', key: 'id'},
         onDelete: 'CASCADE'
     },
     feedbackId:{
         type: DataTypes.INTEGER,
         references: { model: 'feedback', key: 'id'},
         onDelete: 'CASCADE'
     },
     foreignKeyConstraint: true
 })
  

  module.exports = {
     User: User,
     Feedback: Feedback,
     Comment: Comment,

  }