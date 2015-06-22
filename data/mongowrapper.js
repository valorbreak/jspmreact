"use strict";
var MongoClient = require('mongodb').MongoClient;
var mongodbUrl = require('../env.json').mongoUrl;

var mongodb;
var db = function(){
    return mongodb;
};

var connect = function (dbUrl, callback){
    var url = dbUrl || mongodbUrl;
    console.log("mongoDB: starting to connect");
    MongoClient.connect(url, function (err, db) {
        if (err) {throw err;}
        console.log("mongoDB: successfully connected");
        mongodb = db;
        if(callback){
            callback(err,db);
        }
    });
};

var close = function(){
    mongodb.close();
};

module.exports = {
    db: db,
    connect: connect,
    close: close
};

// Usage
//var mongo = require('./data/mongowrapper');
//var db;
//mongo.connect(null,function(){
//    db = mongo.db();
//});