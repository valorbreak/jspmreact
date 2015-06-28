"use strict";

var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
    User.findAll({}, {limit:10,sort:'username', fields: {_id:0,password:0}},function(err,users){
        res.json(users);
    });
});

router.get('/create/:username', function (req, res, next) {
    console.log('DB: created username' + req.params.username);
    var user = new User();
    user.set('username', req.params.username);
    user.save(function(err,response){
        if(err){
            res.json(err);
            return;
        }
        res.json(response);
    });

});

module.exports = router;
