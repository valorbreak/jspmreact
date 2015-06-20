'use strict';
var assert = require('assert');
var test = require('../models/test');

describe('httpRequest', function(){
   // asynchronous code needs the 'done' parameter
   it('request library should work', function(done){
       test.requestPost({},function(error,response,data){
           if(data == 'ok'){
               done();
           }
       });
   });

    it('node-fetch library should work', function(done){
        test.fetchPost({}).then(function(data){
            if(data == 'ok'){
                done();
            }
        });
    })
});