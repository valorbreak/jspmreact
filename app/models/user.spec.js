'use strict';
var assert = require('assert');
var User = require('./user');

var mongodb = require('../lib/mongoeasy');


describe('User Model - Using MONGODB', function(){
    var newDB = mongodb.connect();
    var username = 'testuser';
    var changedUsername = 'saveduser';
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
            user.setPassword('test123');
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
                if(res.length > 0){
                    res.forEach(function(item){
                        var user = new User(item);
                        user.set('username',changedUsername);
                        user.save();
                    });
                }
                done();
            });
        });
    });

    it('User should only have fields in the schema', function(done){
        newDB.then(function(db){

            // Update the User Object with a new field and save
            User.findByUsername(changedUsername,function(err,res){
                if(res.length > 0){
                    res.forEach(function(item){
                        var user = new User(item);
                        user.set('newfield','error');
                        user.save();
                    });
                }
            });

            // newfield must not exist in the database
            User.findByUsername(changedUsername,function(err,res){
                if(res.length > 0){
                    res.forEach(function(item){
                        assert.equal(item.newfield,undefined,'Newfield must not exist in the database');
                    });
                    done();
                }
            });
        });
    });

    //it('User can be deleted from the database', function(done){
    //    newDB.then(function(db){
    //        User.findByUsername('saveduser',function(err,res){
    //            if(res[0]){
    //                var user = new User(res[0]);
    //                user.remove();
    //                done();
    //            }
    //        });
    //    });
    //})

});
