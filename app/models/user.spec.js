'use strict';
var assert = require('assert');
var User = require('./user');

var mongodb = require('../lib/mongoeasy');


describe('User Model - Using MONGODB', function(){
    var newDB = mongodb.connect();
    var username = 'TestUSER';
    var usernameLower = username.toLowerCase();
    var email = 'TEST@gmail.com';
    var changedUsername = 'savedUser';
    var changedUsernameLower = changedUsername.toLowerCase();
    var testCollection = 'test_user';

    // Set Database Configuration for User Objects
    newDB.then(function(db){
        User.setDB(db,testCollection);
    });

    it('User can be created to the database', function(done){
        this.timeout(10000);
        newDB.then(function(db){
            var user = new User({});
            user.set('username',username);
            user.set('email',email);
            user.set('phoneNumber',email);
            user.setPassword('test123');
            user.save(function(err,res){
                if(err){throw err;}
                assert.equal(res.ops[0].username,usernameLower,'Created user must equal test username');
                done();
            });
        });
    });

    it('User can be fetched from the database', function(done){
        newDB.then(function(db){
            User.findByUsername(usernameLower,function(err,item){
                assert.equal(item.username,usernameLower,'Retrieved User must equal test username and lowercased');
                assert.equal(item.email,email.toLowerCase(),'Retrieved Email must equal test username and lowercased');
                done();
            });
        });
    });


    it('User can be updated', function(done) {
        newDB.then(function(db){
            User.findByUsername(usernameLower,function(err,item){
                var user = new User(item);
                user.set('username',changedUsername);
                user.save();
                done();
            });
        });
    });

    it('User should only have fields in the schema', function(done){
        newDB.then(function(db){

            // Update the User Object with a new field and save
            User.findByUsername(changedUsernameLower,function(err,item){
                var user = new User(item);
                user.set('newfield','error');
                user.save();
            });

            // newfield must not exist in the database
            User.findByUsername(changedUsernameLower,function(err,item){
                assert.equal(item.newfield,undefined,'Newfield must not exist in the database');
                done();
            });
        });
    });

    it('User can be deleted from the database', function(done){
        newDB.then(function(db){
            User.findByUsername(changedUsernameLower,function(err,item){
                var user = new User(item);
                user.remove();
                done();
            });
        });
    });

});
