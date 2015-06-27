"use strict";

/**
 * User Functions:
 * var User = require('./user');
 * User.setDatabase(db);
 *
 * New User Object:
 * var user = new User(User.schema);
 * user.save();
 *
 */

var _ = require('lodash');
var bcrypt = require('bcrypt');

var db;

// Constructor
var User = function(data) {
    this.data = this.sanitize(data);
};

// Static Functions
User.setDatabase = setDatabase;
User.setDB = setDatabase;

function setDatabase(database, collection){
    collection = collection || 'users';
    db = database.collection(collection);
}

User.schema = {
    '_id': null,    // Mongo Specific
    'name': {
        firstName: '',
        lastName: '',
        'middleInitial': ''
    },
    'username': null,
    'password': null,
    'email': 'null',
    'phoneNumber': null,
    'roles': [],
    'title': null,
    'isNew': false,
    'changed': new Date(),
    'created': new Date(),
    'saved': false
};

User.prototype.get = function (name) {
    return this.data[name];
};

User.prototype.set = function (name, value) {
    this.data[name] = value;
};

User.prototype.save = function(callback){
    this.data.changed = new Date();
    this.data.saved = true;

    this.data = this.sanitize(this.data);
    db.save(this.data,function(err,res){
        if (err) {console.log(err);}

        if(callback){
            callback(err,res);
        }
    });
};

User.prototype.setPassword = function(password){
    var salt = bcrypt.genSaltSync(14) + 'jspmreact';
    this.data.password = bcrypt.hashSync(password, salt);
};

User.prototype.sanitize = function(data){
    data = data || {};
    return _.pick(_.defaults(data, User.schema), _.keys(User.schema));
};

User.prototype.remove = function(){
    db.remove({username: this.data.username});
};

User.findAll = function (searchObject,options,callback) {
    db.find(searchObject,options).toArray(function(err,res){
        if(err){ console.error(' User Object: can\'t find username' )};

        if(callback){
            callback(err,res);
        }
    });
};

User.findByUsername = function (username,callback) {
    db.find({username:username}).toArray(function(err,res){
        if(err){ console.error(' User Object: can\'t find username' )};

        if(callback){
            callback(err,res);
        }
    });
};

module.exports = User;
