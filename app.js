var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var mongoose = require('mongoose');

var configuration = require('./configuration.js')
var app = express();

var utils = require('./db/utils')

var User = require('./db/user');
var Prediction = require('./db/prediction')
var Group = require('./db/group')




// Setup Mongoose and Schemas
mongoose.connect(configuration.database_url)
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;







// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.post('/signup',function(req,res,next){

    var user = User.createUser(username=req.body.username,house=req.body.house,uuid=req.body.uuid,email=req.body.email,platform=req.body.platform)
    utils.insert_instance(user,function(err,user){
        try{
            if(err) throw err
            res.send(JSON.stringify({user:user}))
        }catch(e){
            res.send(JSON.stringify({user:{},error:e.message}))
        }
    });
})



app.post('/group/create',function(req,res,next){

    var group = Group.createGroup(name=req.body.name,description=req.body.description)
    utils.insert_instance(group,function(err,group){
        try{
            if(err) throw err
            res.send(JSON.stringify({group:group}))
        }catch(e){
            console.log(e)
            res.send(JSON.stringify({user:{},error:e.message}))
        }
    })

})




app.post('/group/search',function(req,res,next){
    Group.getByCode(code=req.body.code,function(err,valid){
        try{
            if(err) throw err
            res.send(JSON.stringify({valid:valid}))
        }catch(e){
            res.send(JSON.stringify({error:e.message,group:{}}))
        }
    })

})



app.post('/group/join', function(req,res,next){
    Group.joinUserToGroup(code=req.body.code, userId=req.body.userId, function(err, data){
        try{
            if(err) throw err
            res.send(JSON.stringify({joined:data.userJoined,group:data.group}))
        }catch(e){
            res.send(JSON.stringify({error:e.message,group:{}}))

        }
    })
})


app.post('/user/update',function(req,res,next){
    console.log(req.body)

    User.updateUser(house=req.body.house,userId=req.body.userId,function(err,user){
        try{
            if(err) throw err
            res.send(JSON.stringify({user:user}))
        }catch(e){
            res.send(JSON.stringify({user:{},error:e.message}))
        }
    })
})



//http://localhost:3000/user?uuid=12Ds234FTR
app.get('/user',function(req,res,next){

    user = User.getUser(req.query.uuid,function(err,user){
        try{
            if(err) throw err
            res.send(JSON.stringify({user:user}))
        }catch(e){
            res.send(JSON.stringify({user:{},error:e.message}))
        }
    })
})

app.post('/prediction/create',function(req,res,next){


})




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
