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
    freezeTableName: true,

  })

  const Feedback = sequelize.define('feedback',{
    title:{
        type: DataTypes.STRING
    },
    game:{
        type: DataTypes.STRING
    },
    content:{
        type: DataTypes.STRING
    },
}, {
    timestamps: false,
    freezeTableName: true,


  })

  const Comment = sequelize.define('comment',{
     content:{
         type: DataTypes.STRING
     },
 }, {
    timestamps: false,
    freezeTableName: true,
  })

 Comment.belongsTo(Feedback)
 Comment.belongsTo(User)

 Feedback.hasMany(Comment)
 Feedback.belongsTo(User)

 User.hasMany(Feedback)
 User.hasMany(Comment)
 User.sync()
 Feedback.sync()
 Comment.sync()
 
 

 const db = {
    User: User,
    Feedback: Feedback,
    Comment: Comment,
}

module.exports = db