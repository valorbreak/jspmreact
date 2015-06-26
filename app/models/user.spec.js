'use strict';
var assert = require('assert');
var User = require('./user');

var mongodb = require('../lib/mongoeasy');


describe('User Model - Using MONGODB', function(){
    var newDB = mongodb.connect();
    var username = 'testuser';
    var testCollection = 'test_user';

    // Set Database Configuration for User Objects
    newDB.then(function(db){
        User.setDB(db,testCollection);
    });

    it('User can be created to the database', function(done){
        newDB.then(function(db){
            var user = new User({});
            user.set('username',username);
            user.save(function(err,res){
                if(err){throw err;}
                assert.equal(res.ops[0].username,username,'Created user must equal test username')
                done();
            });
        });
    });

    it('User can be fetched from the database', function(done){
        newDB.then(function(db){
            User.findByUsername(username,function(err,res){
                assert.equal(res[0].username,username,'Retrieved User must equal test username')
                done();
            });
        });
    });

    it('Non-existing user must return empty', function(done){
        newDB.then(function(db){
            User.findByUsername('errortest',function(err,res){
                assert.equal(res.length,0,'Should return empty');
                done();
            });
        });
    });

    it('User can be updated', function(done) {
        newDB.then(function(db){
            User.findByUsername(username,function(err,res){
                if(res[0]){
                    var user = new User(res[0]);
                    user.set('username','saveduser');
                    user.save();
                }
                done();
            });
        });
    });

    it('User can be deleted from the database', function(done){
        newDB.then(function(db){
            User.findByUsername('saveduser',function(err,res){
                if(res[0]){
                    var user = new User(res[0]);
                    user.remove();
                    done();
                }
            });
        });
    })

});
