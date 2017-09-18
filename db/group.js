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

    Group.findOne({'code':code},function(err,group){
        if(err) return cb(err)

        if(group !=null){
            // TODO: traer a los users
        }


        cb(null,group)
    })

}


var exports = module.exports = {};

// Export methods
exports.createGroup = createGroup;
exports.getByCode = getByCode;



