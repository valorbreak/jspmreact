"use strict";

var express = require('express');
var User = require('../models/user');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('cover', {title: 'Dropkick', baseUrl: '/r',body:'Next Generation CMS'});
});

/* GET home page. */
router.get('/admin',requireLogin, function (req, res, next) {
    var info = req.flash('info');
    res.render('admin', {title: 'Admin Pages', baseUrl: '/r',body:'Next Generation CMS', info: info});
});

function requireLogin(req,res,next) {
    if(req.session && req.session.user){
        var username = req.session.user.username;
        User.findByUsername(username, function(err,response){
            if(err || !response){res.redirect('/login?destination=/admin'); return;}
            next();
        })
    } else {
        req.flash('info','Please login to view this section');
        res.redirect('/login?destination=/admin');
    }
}


/* Login Pages */
router.route('/login')
    .get(function (req, res, next) {
        var info = req.flash('info');
        if(req.session && req.session.user){
            var username = req.session.user.username;
            User.findByUsername(username, function(err,response){
                if(err || !response){
                    //req.session.destroy();
                    promptLogin();
                } else{
                    res.render('login', {title: 'Login', baseUrl: '/r',body:'Logout', login:false, info: info});
                }
            });
        } else{
            promptLogin();
        }

        function promptLogin() {
            res.render('login', {title: 'Login', baseUrl: '/r',body:'Login', login:true, info: info});
        }

    })
    .post(function (req, res, next) {
        var username = req.body.username;

        var destination = req.params.destination;
        User.findByUsername(username, function(err,result){
            if(err){res.redirect('/login');}

            if(result){
                var user = new User(result);
                if(user.validatePassword(req.body.password)){
                    delete user.data.password;
                    delete user.data._id;
                    req.session.user = user.data;
                    req.flash('info', 'Successful Login');
                    res.redirect(destination || '/admin');
                } else{
                    req.flash('info', 'Username and password does not match');
                    redirect();
                }
            } else{
                req.flash('info', 'Username and password does not match');
                redirect();
            }
            function redirect() {
                if(destination){
                    res.redirect('/login?destination='+destination);
                } else{
                    res.redirect('/login');
                }
            }
        });
    });

/* GET home page. */
router.route('/logout')
    .get(function (req, res, next) {
        if(req.session){
            req.session.destroy();
        }
        res.render('index', {title: 'logout', baseUrl: '/r',body:'logout'});
    });

/* GET home page. */
router.route('/register')
    .get(function (req, res, next) {
        var alert = req.flash('alert');
        res.render('register', {title: 'Login', baseUrl: '/r',body:'Welcome to drop',alert: alert});
    })
    .post(function (req, res, next) {
        if(req.body.username && req.body.email && req.body.password){
            var username = req.body.username;
            var password = req.body.password;
            User.findByUsername(username,function(err,user){
                if(err){
                    res.render('register', {
                        baseUrl: '/r',
                        alert: {class: 'alert-danger', message: 'Opps, Something went wrong'}
                    });
                    return;
                }
                if(!user){
                    var newUser = new User(req.body);
                    newUser.setPassword(password);
                    newUser.save();
                    res.redirect('/user/'+req.body.username);
                } else{
                    req.flash('alert','Username already exist');
                    res.redirect('/register');
                }
            });
        } else{
            req.flash('alert','Invalid Parameters');
            res.redirect('/register');
        }
    });

module.exports = router;
