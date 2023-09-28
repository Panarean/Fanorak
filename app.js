var createError = require('http-errors');
var express = require('express');
var path = require('path');


var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const { MongoClient } = require('mongodb');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var nftsRouter = require('./routes/nfts');
var crossmintHookRouter = require('./routes/crossmintHook')
const config = require('./config')
var app = express();

MongoClient.connect(config.mongoURL, config.mongoOPTIONs).then(async (_client)=>{
	global.mongoClient = _client;
	console.log("DB Initialized");
	
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(cors());

 

  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/nfts', nftsRouter);
  app.use('/crossmintHook',crossmintHookRouter);
  app.get('/api/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    // Construct the path to the image based on its name or ID
    const imagePath = `${__dirname}/assets/${imageName}`;
    
    // Send the image file as a response
    res.sendFile(imagePath);
  });
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
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

}).catch((err)=> console.log(err));

// view engine setup

module.exports = app;
