"use strict";

var mongodb = require('./mongoeasy');

describe('mongoeasy', function(){
   it('Mongoeasy should work', function(done){
       var newDB = mongodb.connect();
       newDB.then(function(db){
           done();
       });
   });
});