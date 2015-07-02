"use strict";

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var requireLogin = require('./authrules').requireLogin;

/* GET user listing. */
router.get('/', requireLogin, function (req, res) {
    User.findAll({},{})
        .then(function(results){
            res.render('user', {users:results});
        })
        .catch(function(err){
            res.render('user', err);
        });
});

/* GET user detailed listing. */
router.get('/:id', requireLogin, function (req, res) {
    var userid = req.params.id;
    console.log(userid);
    User.findByUsername(userid)
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.json(err);
        });

});


module.exports = router;
