'use strict';
var assert = require('assert');
var User = require('./user');

var MongoClient = require('mongodb').MongoClient;


describe('User Model', function(){
    // asynchronous code needs the 'done' parameter
    it('User can be saved', function(){

        var user = new User();
        var newUser = user.save();
        assert.equal(newUser.saved,true,'user.save must be true');
    });

    it('Users can be fetched', function(done){
        var user = new User();
        user.getAll(function(items){
            //assert.equal(items[0].uid,0,'user[0].uid must be 0');
            done();
        });
    });
});