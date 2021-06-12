const { Pool, Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: 'postgressDb',
    database:  'hello',
    password: 'abc123',
    port:5432,
})
client.connect()

const db = require('./db')


module.exports =function(){
   
    exports.createFeedback= function(newFeedback,callback){
        db.Feedback.create(newFeedback)
			.then(a => callback([]))
			.catch(e => callback(['internalError']))	   
    }

    exports.getFeedbackById = function(id,callback){

        db.Feedback.findOne({
            where:{id:id},
            include: [{model:db.User,plain: true}],
            raw: true,
        },).then(function(feedback){
            const data = {
                id: feedback.id,
                title: feedback.title,
                game: feedback.game,
                content: feedback.content,
                authorId: feedback.userId,
                username: feedback['user.username'],
            }
            callback([],data)
        }).catch(e=>{
            callback([], null)
        }) 
    }

    exports.updateFeedbackById= function(newFeedback,callback){

        db.Feedback.update(newFeedback, { where: {id: newFeedback.id}})
			.then(a => callback([]))
			.catch(e => callback(['internalError']))
    }

    exports.deleteFeedbackById= function(id,callback){

        db.Feedback.destroy({
            where:{id:id},
            
        },).then(() => callback([])).catch(e=>{
            callback(['internalError'])
        }) 
    }

    exports.getAllFeedbacks = function(callback){
        db.Feedback.findAll({
            raw: true,
        }
        ).then(feedbacks => callback([],feedbacks)
        ).catch(e => {
            callback(["internalError"], null)
        })
    }
    return exports
}