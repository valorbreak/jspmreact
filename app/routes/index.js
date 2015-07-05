"use strict";

var express = require('express');
var usersRoute = require('./user');

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

router.use('/react',function(req,res){
    res.render('react', {title:'testexample'});
});

router.use('/user',usersRoute);
//router.use('/test',testRoute);

module.exports = router;
