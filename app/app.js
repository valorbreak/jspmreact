"use strict";

// ES6 Capable
require("babel/register");

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var api = require('./routes/api');
var authRoutes = require('./routes/auth');
var env = require('../env.json');

// Single Page Application Path
// React Components are shared between the server and the client
var spaPath = path.resolve(".") + env.spaDir;


var app = express();

/**
 * Database, Model Setup
 */
var mongoEZ = require('./lib/mongoeasy');
var mongo = mongoEZ.connect();
var database;

var User = require('./models/user');
var Articles = require('./models/article');

mongo.then(function(db){
    database = db;
    User.setDatabase(db,'users');
    Articles.setDatabase(db,'articles');
});

/**
 * Initialize App SESSION using mongodb
 */
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: mongoEZ.getSessionSecret(),
    name: 'sessid',
    resave: false,
    cookie: {
        httpOnly:false
    },
    saveUninitialized: false,
    store: new MongoStore({
        url: mongoEZ.getCurrentUrl(),
        ttl: 3 * 24 * 60 * 60, // = 3 days. Default
        autoRemove: 'native'
    })
}));

/**
 * Middleware for flash messages
 */
var flash = require('connect-flash');
app.use(flash());

// set the db to be available on all Routes
app.use(function(req,res,next){
    req.db = database;
    next();
});

/**
 * Set View Engine + template setup
 */
var renderer = require('react-engine');
var engine = renderer.server.create();

// set `react-engine` as the view engine
app.engine('.jsx', engine);
//app.set('views', path.join(__dirname, 'views'));
app.set('views', spaPath+ "/app/views");
app.set('view engine', 'jsx');
app.set('view', renderer.expressView);
//app.set('view cache', true);

// view engine setup
//app.set('views', path.join(__dirname, 'views/hbs'));
//app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Template Locals before Routes
app.use(templateLocals);

function templateLocals(req,res,next){
    res.locals.baseUrl = '/r';
    res.locals.params = req.params;
    res.locals.url = req.url;
    res.locals.query = req.query;
    next();
}

/**
 * Set Routing
 */
app.use(authRoutes);
app.use('/api', api);
app.use('/', routes);

/**
 * Static Files
 * __dirname = current directory where this file is located
 */
var oneDay = 86400000;

var staticOptions = {
    maxAge: oneDay,
    etag: true
};
//var spaPath = path.join(__dirname, env.spaDir);

app.use(express.static(path.join(__dirname, 'public'), staticOptions));

console.log(' Setting SPA app on: '.cyan + spaPath);
app.use('/r', express.static(spaPath, staticOptions ));
app.use('/r/*', express.static(spaPath,  staticOptions));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
console.log(" Environment: ".cyan + app.get('env'));
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
    staticOptions.etag = false;
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

// DISABLE ETAG?
//app.disable('etag');
app.disable('x-powered-by');

module.exports = app;
