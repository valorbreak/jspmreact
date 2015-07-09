"use strict";

/**
 * Article Functions:
 * var Article = require('./Article');
 * Article.setDatabase(db);
 *
 * New Article Object:
 * var Article = new Article(Article.schema);
 * Article.save();
 *
 */

var _ = require('lodash');
var PromiseJS = require('promise');
var shortid = require('shortid');

var db;

// Constructor
var Article = function(data) {
    this.data = this.sanitize(data);
};

// Static Functions
Article.setDatabase = setDatabase;
Article.setDB = setDatabase;

function setDatabase(database, collection){
    collection = collection || 'articles';
    db = database.collection(collection);
}

Article.schema = {
    '_id': null,    // Mongo Specific
    'nid': shortid.generate(),    // Mongo Specific
    'title': null,
    'author': '',
    'body': '',
    'slug': '',
    'brief': '',
    'state': [],
    'categories': [],
    'keywords': [],
    'publishedDate': new Date(),
    'changed': new Date(),
    'created': new Date(),
    'saved': false
};

/**
 * Unique fields must be sanitized properly
 * other fields can be sanitize during form submission
 * @type {{Articlename: Function, email: Function}}
 */
Article.schemaSanitize = {

};

Article.prototype.get = function (name) {
    return this.data[name];
};

Article.prototype.set = function (name, value) {
    this.data[name] = value;
};

Article.prototype.save = function(){
    return new PromiseJS(function(resolve,reject){
        this.data.changed = new Date();
        this.data.saved = true;

        this.data = this.sanitize(this.data);

        db.save(this.data,function(err,response){
            if (err) {console.log(err,'err'); reject(err); }
            resolve(response);
        });
    }.bind(this));
};

/**
 * sanitize
 * Usage:
 * @param data
 * @returns {*}
 */

Article.prototype.sanitize = function(data){
    data = data || {};

    var cherryPicked = _.pick(_.defaults(data, Article.schema), _.keys(Article.schema));
    var sanitizeFields = _.pick(cherryPicked, _.keys(Article.schemaSanitize));

    _.mapKeys(sanitizeFields,function(value,key){
        if(Article.schemaSanitize[key]){
            cherryPicked[key] = Article.schemaSanitize[key](value);
        }
    });

    return cherryPicked;
};

Article.prototype.remove = function(){
    db.remove({_id: this.data._id});
};

/**
 * FindAll
 * @param searchObject
 * @param options
 * @param callback
 * @returns Promise
 */

Article.findAll = function (searchObject,options) {
    options = options || {};
    return new PromiseJS(function(resolve,reject) {
        db.find(searchObject,options).toArray(function(err,res){
            if(err){
                console.error(' Article Object: can\'t find Article' );
                reject(err);
            }
            resolve(res);
        });
    });
};

Article.findOne = function (searchObject){
    return new PromiseJS(function(resolve,reject){
        db.findOne(searchObject, function(err,res){
            if(err){
                console.error(' Article Object: can\'t find Article' );
                resolve(err);
            }
            resolve(res);
        });
    });
};

module.exports = Article;
