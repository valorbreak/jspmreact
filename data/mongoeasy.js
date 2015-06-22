"use strict";
var MongoClient = require('mongodb').MongoClient;
var url = require('../env.json').mongoUrl;
var Promise = require('promise');

var mongodb;

var connect = new Promise(function(resolve,reject){
    MongoClient.connect(url, function (err, db) {
        if (err) {throw err;}
        console.log("mongoDB: successfully connected");
        mongodb = db;
        resolve(db);
    });
});

var closeConnection = function(){
    mongodb.close();
};

module.exports = {
    connect: connect,
    close: closeConnection
};