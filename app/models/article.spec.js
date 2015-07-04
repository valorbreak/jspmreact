'use strict';

require('babel/register');
var assert = require('assert');
var Entity = require('./article');

var mongodb = require('../lib/mongoeasy');

describe('Entity Model - Using MONGODB', function(){
    var newDB = mongodb.connect();
    var testCollection = 'test_article';

    // Set Database Configuration for Entity Objects
    newDB.then(function(db){
        Entity.setDB(db,testCollection);
    });

    // it.only() to run single test
    it('Entity can be created to the database', function(done){
        this.timeout(10000);

        newDB.then(function(){
            var node = new Entity({});
            node.set('title','testtitle');
            node.set('blurb','blurb');
            return node.save();

        }).then(function(response){
            assert.equal(response.ops[0].title,'testtitle','Created Entity must equal test Entityname');
            done();
        });
    });

    it('Entity can be fetched from the database', function(done){
        newDB.then(function(){
            Entity.findAll({title:'testtitle'})
                .then(function(responses){
                    assert.equal(responses[0].title,'testtitle','Created Entity must equal test Entityname');
                    done();
                });
        });
    });

    it('Entity can be updated', function(done) {
        newDB.then(function(){
            return Entity.findAll({title:'testtitle'});
        }).then(function(responses){
            assert.equal(responses[0].title,'testtitle','Created Entity must equal test Entityname');
            return responses[0];
        }).then(function(response){
            var node = new Entity(response);
            node.set('body','<h2></h2>');
            return node.save();
        }).then(function(response){
            assert.equal(response.result.ok,1,'Must be ok');
            done();
        });
    });

    it('Entity should only have fields in the schema', function(done){
        newDB.then(function(){
                return Entity.findOne({title:'testtitle'});
            })
            .then(function(item){
                var node = new Entity(item);
                node.set('newfield','this should not be set');
                return Entity.save();
            })
            .then(done());
    });


    it('Entity can be deleted from the database', function(done){
        newDB.then(function(){
                return Entity.findOne({title:'testtitle'});
            })
            .then(function(item){
                var node = new Entity(item);
                node.remove();
                done();
            });
    });


});
