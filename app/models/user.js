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
var bcrypt = require('bcryptjs');

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
        'firstName': '',
        'lastName': '',
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

/**
 * Unique fields must be sanitized properly
 * other fields can be sanitize during form submission
 * @type {{username: Function, email: Function}}
 */
User.schemaSanitize = {
    username: function(data){
        var output = '';
        if(typeof data === 'string') {
            output = data.toLowerCase().trim();
        }
        return output;
    },
    email: function(data){
        var output = '';
        if(typeof data === 'string') {
            output = data.toLowerCase().trim();
        }
        return output;
    }
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

/**
 * setPassword:
 * @param password
 */
User.prototype.setPassword = function(password){
    var salt = bcrypt.genSaltSync(10) + 'jspmreact';
    this.data.password = bcrypt.hashSync(password, salt);
};

User.prototype.validatePassword = function(password){
    return bcrypt.compareSync(password,this.data.password);
};

/**
 * sanitize
 * Usage:
 * @param data
 * @returns {*}
 */

User.prototype.sanitize = function(data){
    data = data || {};

    var cherryPicked = _.pick(_.defaults(data, User.schema), _.keys(User.schema));
    var sanitizeFields = _.pick(cherryPicked, _.keys(User.schemaSanitize));

    _.mapKeys(sanitizeFields,function(value,key){
        if(User.schemaSanitize[key]){
            cherryPicked[key] = User.schemaSanitize[key](value);
        }
    });

    return cherryPicked;
};

User.prototype.remove = function(){
    db.remove({username: this.data.username});
};

/**
 * findAll
 * @param searchObject
 * @param options: refer to mongodb
 * @param callback
 */

User.findAll = function (searchObject,options,callback) {
    db.find(searchObject,options).toArray(function(err,res){
        if(err){ console.error(' User Object: can\'t find username' ); }

        if(callback){
            callback(err,res);
        }
    });
};

User.findByUsername = function (username,callback) {
    db.findOne({username:username}, function(err,res){
        if(err){ console.error(' User Object: can\'t find username' ); }

        if(callback){
            callback(err,res);
        }
    });
};

module.exports = User;
