/**
 * Created by luisandresgurmendez on 16/9/17.
 */

var Group = require('./models').Group;


function createCode() {
    var code = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        code += possible.charAt(Math.floor(Math.random() * possible.length));

    return code;
}



createGroup = function(name,description){
    var code = createCode();
    return new Group({'name':name, 'code':code, 'description': description})
}

getByCode = function(code,cb){


    Group.findOne({'code':code}).populate("users").exec(function(err,group){
        if(err) return cb(err)
        console.log(group)
        if(group == null){
            cb(null,false)
        }else{
            cb(null,true)
        }
    })

}


joinUserToGroup = function(code,userId,cb){
    console.log(code)

    Group.findOne({'code':code},function(err,group){
        if(err) return cb(err,{userJoined:false});
        if(group == null) return cb(null,{userJoined:false})
        group.users.push(userId)
        group.save(function(err,groupUpdated){
            if(err) return cb(err,{userJoined:false});
            groupUpdated.populate('users',function(err,groupPopulated){
                if(err) return cb(err,{userJoined:false});
                console.log(groupPopulated)
                cb(null,{userJoined:true,group:groupPopulated})
            })

        })

    })




}


var exports = module.exports = {};

// Export methods
exports.createGroup = createGroup;
exports.getByCode = getByCode;
exports.joinUserToGroup = joinUserToGroup;



