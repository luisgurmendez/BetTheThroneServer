/**
 * Created by luisandresgurmendez on 12/9/17.
 */


var Prediction = require('./models').Prediction;


createPrediction = function(character,chapter,status,killedBy){
    return new Prediction({'character':character, 'chapter': chapter, 'status': status,'killedBy':killedBy})
}


var exports = module.exports = {};

// Export methods
exports.createPrediction = createPrediction;
