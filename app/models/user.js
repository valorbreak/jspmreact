"use strict";

var _ = require('lodash');
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
    'name': {
        firstName: '',
        lastName: '',
        'middleInitial': ''
    },
    'username': '',
    'email': 'n/a',
    'phoneNumber': 0,
    'roles': [],
    'title': '',
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

User.prototype.create = function(callback) {
    this.data.changed = new Date();
    this.data.isNew = true;

    // MongoDB Specific
    db.insert(this.data,function(err,res){
        if (err) {console.log(err);}

        console.log(' User Object: Create new user to the database');
        if(callback){
            callback(err,res);
        }
    });
};

User.prototype.save = function(callback){
    this.data.changed = new Date();
    this.data.saved = true;

    db.save(this.data,function(err,res){
        if (err) {console.log(err);}

        if(callback){
            callback(err,res);
        }
    });
};

User.prototype.sanitize = function(data){
    data = data || {};
    return _.pick(_.defaults(data, User.schema), _.keys(User.schema));
};

User.prototype.remove = function(){
    db.remove({username: this.data.username});
};

User.findAll = function (searchObject,callback) {
    db.find(searchObject).toArray(function(err,res){
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