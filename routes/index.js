"use strict";

var express = require('express');
var users = require('./users');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/entity', function(req,res,next){
    res.render('index', {title: 'entity'});

});

router.use('/users', users);

module.exports = router;
