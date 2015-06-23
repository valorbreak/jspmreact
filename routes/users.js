"use strict";

var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/create/:username', function (req, res, next) {
    console.log('DB: created username' + req.params.username);

    var user = new User(req.db);
    user.username = req.params.username;
    user.create(function(err,data){
        if(err){console.log('Error: '+ err); res.json(err);;}
        else{
            res.json(user);
        }
    });

    //var userCreated = user.createPromise;
    //userCreated.then(function(err,res){
    //    console.log('successfully create user: ' + res);
    //    res.json(user);
    //}, function(err,res){
    //    console.log('Error??: '+ err);
    //    res.json(err);
    //});

});

module.exports = router;
