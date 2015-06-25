"use strict";

var Promise = require('promise');

/**
 * User model
 */

var db;
var users;

var User = function (database) {
    // Mongodb Specific
    db = database;
    users = db.collection('users');

    //this._id = 0;
    //this.uid = 6;
    this.username = 'uri';
    this.name = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.description = '';
    this.isNew = true;
    this.sku = '';
    this.created = new Date();
    this.changed = new Date();
    this.saved = false;
};

User.prototype.sayHello = function(){

};

User.prototype.load = function(){

};

User.prototype.createPromise = new Promise(function(resolve,reject){
    this.created = new Date();

    // MongoDB Specific
    users.insert(this,function(err,res){
        console.log(err,'error');
        console.log(res,'response');
        if (err) {
            reject(err,res);
            //return console.log(err);
        }
        resolve(err,res);
    });
}.bind(this));

User.prototype.create = function(callback) {
    this.created = new Date();

    // MongoDB Specific
    users.insert(this,function(err,res){
        if (err) {console.log(err);}
        if(callback){
            callback(err,res);
        }
    });

};

User.prototype.get = function(user,callback){

    // Mongodb specific
    users.find(user).toArray(function(err, items) {
        if(callback){
            callback(items);
        }
    });

};


User.prototype.getAll = function(callback) {

};

User.prototype.save = function(callback) {
    this.changed = new Date();
    this.saved = true;

    if(callback){
        callback(this);
    }

    return this;
};

module.exports = User;