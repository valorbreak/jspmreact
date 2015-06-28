"use strict";
var MongoClient = require('mongodb').MongoClient;
var mongodbUrl = require('../../env.json').mongoUrl;
var Promise = require('promise');
var colors = require('colors');

var mongodb;
var currentUrl;
var connect = function(dbUrl) {

    currentUrl = dbUrl || mongodbUrl;

    return new Promise(function (resolve, reject) {
        MongoClient.connect(currentUrl, function (err, db) {
            if (err) { console.error(' Can\'t connect the database, Exiting'); throw err;}
            console.log(" mongoEasy: ".cyan + "Successfully Connected");
            mongodb = db;
            resolve(db);
        });
    });
};

function getCurrentUrl() {
    return currentUrl;
}

function getSessionSecret() {
    return 'secret';
}

var closeConnection = function(){
    mongodb.close();
};

module.exports = {
    getCurrentUrl: getCurrentUrl,
    getSessionSecret: getSessionSecret,
    connect: connect,
    close: closeConnection
};
