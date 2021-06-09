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
            include: db.User,
        },).then(function(feedback){
            const data = {
                id: feedback.dataValues.id,
                title: feedback.dataValues.title,
                game: feedback.dataValues.game,
                content: feedback.dataValues.content,
                userId: feedback.dataValues.userId,
                username: feedback.dataValues.user.dataValues.username,
            }
            console.log("🚀 ~ file: feedback-table.js ~ line 42 ~ feedback", data)

            callback([],data)
        }).catch(e=>{
            callback([], null)
        }) 
    }

    exports.updateFeedbackById= function(newFeedback,callback){
        const query = "UPDATE feedback SET title = $1, content = $2, game= $3 WHERE id= $4 AND userId = $5"
        const values = [newFeedback.title,newFeedback.content,newFeedback.game,newFeedback.id,newFeedback.userId]

        client.query(query,values,function(error){
            if(error){                
                callback(['internalError'])
            }else{
                callback([])
            }
        })
    }

    exports.deleteFeedBackById= function(feedback,callback){
        const query = "DELETE FROM feedBack AS F  WHERE F.id = $1 AND F.userId = $2"
        const values = [feedback.id,feedback.userId]

        client.query(query,values,function(error){
            if(error){                
                callback(['internalError'])
            }else{
                callback([])
            }
        })
    }

    



    exports.getAllFeedbacks = function(callback){
        const query = {
            text: "SELECT F.id, F.title, F.game, F.content FROM feedback AS F ",
            rowMode: 'struct'
        }
        client.query(query,function(error, feedbacks){
            if(error){
                callback(['internalError'],null)
            }else{
                callback([],feedbacks.rows)
            }
        })
    }
    return exports
}