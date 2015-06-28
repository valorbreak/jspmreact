"use strict";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var api = require('./routes/api');
var test = require('./routes/test');
var usersRoute = require('./routes/users');
var env = require('../env.json');

var app = express();


// Database Setup
var mongoEZ = require('./lib/mongoeasy');
var mongo = mongoEZ.connect();
var database;

var User = require('./models/user');

// Set Sessions and Flash Messages
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

mongo.then(function(db){
    database = db;
    User.setDatabase(db,'users');

});

// Initialize App SESSION using mongodb
app.use(session({
    secret: mongoEZ.getSessionSecret(),
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({url: mongoEZ.getCurrentUrl()})
}));

app.use(flash());

// set the db to be available on all Routes
app.use(function(req,res,next){
    req.db = database;
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', usersRoute);
app.use('/api', api);
app.use('/test', test);

// Static Files
//__dirname = current directory where this file is located
// .
var spaPath = path.resolve(".") + env.spaDir;
//var spaPath = path.join(__dirname, env.spaDir);
console.log('Setting SPA app on: '.cyan + spaPath);
app.use('/r', express.static(spaPath));
app.use('/r/*', express.static(spaPath));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.disable('x-powered-by');

module.exports = app;
