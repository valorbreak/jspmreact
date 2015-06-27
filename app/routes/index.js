"use strict";

var express = require('express');
var User = require('../models/user');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Dropkick', baseUrl: '/r',body:'Next Generation CMS'});
});


/* GET home page. */
router.route('/login')
    .get(function (req, res, next) {
        res.render('login', {title: 'Login', baseUrl: '/r',body:'Login'});
    })
    .post(function (req, res, next) {
        console.log(req.body,'nice');
        console.log(req.cookies,'cookie');
        var cookie = req.cookies.newcook;

        if(cookie === undefined){
            // no: set a new cookie
            var randomNumber=Math.random().toString();
            randomNumber=randomNumber.substring(2,randomNumber.length);
            res.cookie('newcook',randomNumber, { maxAge: 900000, httpOnly: true });
            console.log('cookie have created successfully');
        } else{
            console.log('cookie exist');
        }
        res.redirect('/?success=true');


    });

/* GET home page. */
router.route('/logout')
    .get(function (req, res, next) {
        if(req.cookies && req.cookies.newcook){
            res.clearCookie('newcook');
            res.render('index', {title: 'logout', baseUrl: '/r',body:'logout'});
        } else{
            res.render('login', {title: 'Login', baseUrl: '/r',body:'Login'});
        }
        //res.render('login', {title: 'Login', baseUrl: '/r',body:'Login'});
    });

/* GET home page. */
router.route('/register')
    .get(function (req, res, next) {
        res.render('register', {title: 'Login', baseUrl: '/r',body:'register'});
    })
    .post(function (req, res, next) {
        if(req.body.username && req.body.email && req.body.password){
            var username = req.body.username;
            var password = req.body.password;
            User.findByUsername(username,function(err,response){
                if(err){
                    res.render('register', {
                        baseUrl: '/r',
                        alert: {class: 'alert-danger', message: 'Opps, Something went wrong'}
                    });
                    return;
                }
                if(response.length === 0){
                    var user = new User(req.body);
                    user.setPassword(req.body.password);
                    user.save();
                    res.redirect('/user/'+req.body.username);
                } else{
                    res.render('register', {
                        baseUrl: '/r',
                        alert: {class: 'alert-info', message: 'Username is already used'}
                    });
                }


            });
        } else{
            res.render('register', {title: 'Register', baseUrl: '/r', alert: 'invalid parameters'});
        }
    });

module.exports = router;
