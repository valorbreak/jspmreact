"use strict";

var express = require('express');
var users = require('./users');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Dropkick', baseUrl: '/r',body:'nice'});
});


/* GET home page. */
router.route('/login')
    .get(function (req, res, next) {
        res.render('login', {title: 'Login', baseUrl: '/r',body:'Login'});
    })
    .post(function (req, res, next) {
        console.log(req.body,'nice');
        res.redirect('/?success=true');
    });

/* GET home page. */
router.route('/register')
    .get(function (req, res, next) {
        res.render('register', {title: 'Login', baseUrl: '/r',body:'register'});
    })
    .post(function (req, res, next) {
        console.log(req.body,'nice');
        res.redirect('/?success=true');
    });

router.use('/users', users);

module.exports = router;
