"use strict";

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var requireLogin = require('./authrules').requireLogin;

/* GET users listing. */
router.get('/', requireLogin, function (req, res) {
    res.render('users');
});

//router.get('/create/:username', function (req, res, next) {
//    console.log('DB: created username' + req.params.username);
//    var user = new User();
//    user.set('username', req.params.username);
//    user.save(function(err,response){
//        if(err){
//            res.json(err);
//            return;
//        }
//        res.json(response);
//    });
//});

module.exports = router;
