"use strict";

var express = require('express');
var userRoute = require('./user');
var adminRoute = require('./admin');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    var props = {};
    if(req.session && req.session.user){
        props = {title: 'Dropkick',body:'Next Generation CMS', login:false};
    } else{
        props = {title: 'Dropkick',body:'Next Generation CMS', login:true};
    }
    res.render('cover', props);
});

// Admin Access
router.use('/admin', adminRoute);

// Handle routing on the client side
router.use('/react',function(req,res){
    res.render('react', {title:'testexample',url:req.url, params: req.params,query: req.query});
});

// Handle routing on the client side
router.get('/test',function(req,res){
    res.render('react', {title:'testexample',url:req.url, params: req.params,query: req.query});
});

//router.use('/test',testRoute);

module.exports = router;
