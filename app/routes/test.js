"use strict";

var express = require('express');
var router = express.Router();
var entityRoute = require('./entity');
var api = require('../models/test');

router.get('/fetch/post', function (req, res, next) {
    var user = {
        name: 'username',
        password: 'password'
    };
    api.fetchPost(user).then(function(data){
        console.log(data,'data fetch');
        res.json({'well':'fech'});
    });
});

router.get('/req/post', function (req, res, next) {
    var user = {
        name: 'username',
        password: 'password'
    };
    api.requestPost(user,function(error, response, body){
        console.log(body,'callbackapi');
        res.json({'well':body});
    });
});

module.exports = router;