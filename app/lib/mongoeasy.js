"use strict";
var MongoClient = require('mongodb').MongoClient;
var mongodbUrl = require('../../env.json').mongoUrl;
var Promise = require('promise');
var colors = require('colors');

var mongodb;

var connect = function(dbUrl) {

    var url = dbUrl || mongodbUrl;

    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) { console.error(' Can\'t connect the database, Exiting'); throw err;}
            console.log(" mongoEasy: ".cyan + "Successfully Connected");
            mongodb = db;
            resolve(db);
        });
    });
};

var closeConnection = function(){
    mongodb.close();
};

module.exports = {
    connect: connect,
    close: closeConnection
};