"use strict";

var db;

var User = function (database) {
    db = database;

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

User.prototype.create = function(callback) {
    this.created = new Date();

    // MongoDB Specific
    var entity = db.collection('users');
    entity.insert(this,function(err,res){
        //if (err) {db.close(); return console.log(err);}
        if(callback){
            callback(err,res);
        }
    });

};

User.prototype.get = function(user,callback){

    var collection = db.collection('users');
    collection.find(user).toArray(function(err, items) {
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