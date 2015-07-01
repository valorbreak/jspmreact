"use strict";

var express = require('express');
var User = require('../models/user');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();

var requireLogin = require('./authrules').requireLogin;

/* GET home page. */
router.get('/admin',requireLogin, function (req, res, next) {
    var info = req.flash('info');
    res.locals.sessid = req.cookies.sessid;
    if(req.session && req.session.user){
        res.locals.session = req.session;
    }
    res.render('admin', {title: 'Admin Pages', baseUrl: '/r',body:'Next Generation CMS', info: info});
});

/* Login Pages */
router.route('/login')
    .get(csrfProtection,function (req, res, next) {
        var info = req.flash('info');
        res.locals.csrfToken = req.csrfToken();
        if(req.session && req.session.user){
            var username = req.session.user.username;
            User.findByUsername(username, function(err,response){
                if(err || !response){
                    req.session.destroy();
                    promptLogin();
                } else{
                    res.render('login', {title: 'Login',body:'Logout', login:false, info: info});
                }
            });
        } else{
            promptLogin();
        }

        function promptLogin() {
            res.render('login', {
                title: 'Login',
                body:'Login',
                login:true,
                info: info
            });
        }

    })
    .post(csrfProtection,function (req, res, next) {
        var username = req.body.username;
        var destination = req.params.destination;
        User.findByUsername(username, function(err,result){
            if(err){res.redirect('/login');}

            if(result){
                var user = new User(result);
                if(user.validatePassword(req.body.password)){
                    delete user.data.password;
                    delete user.data._id;
                    req.session['user-agent'] = req.headers['user-agent'];
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
        });

        function redirect() {
            if(destination){
                res.redirect('/login?destination='+destination);
            } else{
                res.redirect('/login');
            }
        }
    });

/* GET home page. */
router.route('/logout')
    .get(function (req, res, next) {
        if(req.session){
            req.session.destroy();
        }
        res.render('index', {title: 'logout',body:'logout'});
    });

/* GET home page. */
router.route('/register')
    .get(function (req, res) {
        var alert = req.flash('alert');
        res.render('register', {title: 'Login',body:'Welcome to dropkick',alert: alert});
    })
    .post(function (req, res) {
        if(req.body.username && req.body.email && req.body.password){
            var username = req.body.username;
            var password = req.body.password;
            var email = req.body.email;

            User.findAll({$or: [{username:username},{email:email}]},{limit:1},function(err,results){
                if(err){
                    retry('Username or Email already exist');
                }
                if(results.length === 0){
                    var newUser = new User(req.body);
                    newUser.setPassword(password);
                    newUser.save(function(err,item){
                        if(err){
                            // Secondary Check when the username is indexed as unique
                            retry('Username or Email already exist');
                        } else{
                            if(item.ops[0].username){
                                var newUsername = item.ops[0].username;
                                res.redirect('/user/'+newUsername);
                            } else {
                                retry('Error Occured');
                            }
                        }
                    });
                } else{
                    retry('Username or Email already exist');
                }
            });
        } else{
            retry('Invalid Parameters');
        }

        function retry(message){
            req.flash('alert',message);
            res.redirect('/register');
        }
    });

module.exports = router;
