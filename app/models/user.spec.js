'use strict';
require('babel/register');
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

    function findUsername(){
        return User.findByUsername(usernameLower);
    }

    function findChangedUsername(){
        return User.findByUsername(changedUsernameLower);
    }

    it('User can be created to the database', function(done){
        this.timeout(10000);

        newDB.then(function(){
            var user = new User({});
            user.set('username',username);
            user.set('email',email);
            user.set('phoneNumber','12345');
            user.setPassword('test123');
            return user.save();
        }).then(function(response){
            // ops only exist when a new item is created
            assert.equal(response.ops[0].username,usernameLower,'Created user must equal test username');
            done();
        });
    });

    it('User can be fetched from the database', function(done){
        newDB.then(findUsername).then(function(item){
            assert.equal(item.username,usernameLower,'Retrieved User must equal test username and lowercased');
            assert.equal(item.email,email.toLowerCase(),'Retrieved Email must equal test username and lowercased');
            done();
        });
    });

    it('User can be updated', function(done) {
        newDB.then(findUsername).then(function(item){
            console.log(item._id,'id-1');
            console.log(item.email,'item-2 email');
            var user = new User(item);
            user.set('username',changedUsername);
            user.set('email',email+'newemail');
            return user.save();
        }).then(function(response){
            assert.equal(response.result.ok,1,'Must be ok');
            done();
        });

    });

    it('User should only have fields in the schema', function(done){
        newDB.then(findChangedUsername)
            .then(function(item){
                console.log(item._id,'item-2');
                console.log(item.email,'item-2 email');
                var user = new User(item);
                user.set('newfield','this should not be set');
                return user.save();
            })
            .then(findChangedUsername)
            .then(done());


    });

    it('User can be deleted from the database', function(done){
        newDB.then(findChangedUsername)
            .then(function(item){
                var user = new User(item);
                return user.remove();
            })
            .then(function(res){
                console.log(res);
                done();
            });
    });

});
