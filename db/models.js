/**
 * Created by luisandresgurmendez on 12/9/17.
 */


var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema;
var predictionSchema;
var groupSchema;
var eventSchema;

create_schemas = function(){

    predictionSchema  = new Schema({
        character: {type: String, required: true},
        chapter: {type:Number, required: true},
        status: {type:String, required: true},
        killedBy: String,
        timestamp:Date
    });


    userSchema = new Schema({
        username: {type: String, required: true},
        house: {type:String},
        uuid: {type:String},
        email: {type:String},
        platform: {type: String},
        predictions: [[predictionSchema]]
    });

    groupSchema = new Schema({
        users: [{type:Schema.Types.ObjectId, ref:'user'}],
        code: {type:String, required: true},
        name: {type:String, required: true},
        description: String,
        numMembers:Number
    });


    eventSchema  = new Schema({
        character: {type: String, required: true},
        chapter: {type:Number, required: true},
        status: {type:String, required: true},
        killedBy: String,
    });


}

// Get exports dictionary
var exports = module.exports = {};

create_models = function(){
    // Assign value to key User
    exports.User = mongoose.model('user', userSchema);
    exports.Prediction = mongoose.model('prediction', predictionSchema);
    exports.Group = mongoose.model('group', groupSchema);
    exports.Event = mongoose.model('event', eventSchema);
}

create_schemas();
create_models();





