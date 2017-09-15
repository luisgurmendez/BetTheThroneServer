/**
 * Created by luisandresgurmendez on 12/9/17.
 */


var User = require('./models').User;




createUser = function(username,house,uuid,email,platofrm){
    return new User({'username':username, 'house': house, 'uuid': uuid,'email':email,'platform':platofrm})
}

getUser = function(userId,cb){
    User.findOne({'_id':userId},function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })
}


updateUser = function(house,userId,cb){
    User.findOne({'_id':userId},function(err,user){
        if(err) return cb(err)
        user.house = house
        user.save(function(err,userUpdated){
            if(err) return cb(err)
            cb(null,userUpdated)
        })
    })
}


var exports = module.exports = {};

// Export methods
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.getUser = getUser;

