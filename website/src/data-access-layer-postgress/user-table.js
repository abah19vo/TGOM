const { UniqueConstraintError } = require('sequelize')
const db = require('./db')

module.exports = function(){
    const exports = {}


    exports.createUser = async function(user, callback){	
          db.User.create(user)
			.then(u => callback([], u.id))
			.catch(e => {
				if(e instanceof UniqueConstraintError){
					callback(['usernameTaken'], null)
				}else{
					callback(['internalError'], null)
				}
			})	
	}

    exports.getUserByUserName = function(username, callback){
		db.User.findOne({where: {username}, raw: true})
			.then(user => callback([], user))
			.catch(e => callback(["internalError"], null))
    }
    return exports
}
