"use strict";

import express from 'express';
import User from '../models/user';
import csrf from 'csurf';

let router = express.Router();
let csrfProtection = csrf();

/* Login Pages */
router.route('/login')
    .get(csrfProtection, (req, res) => {
        let info = req.flash('info');
        res.locals.csrfToken = req.csrfToken();

        if(req.session && req.session.user){
            let username = req.session.user.username;
            User.findByUsername(username)
                .then(function(response){
                    //res.redirect('/admin');
                    res.render('login', {title: 'Login',body:'Logout', login:false, info: info});
                })
                .catch(function(err){
                    promptLogin();
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
    .post(csrfProtection, (req, res) => {
        let username = req.body.username;
        let destination = req.params.destination;
        let password = req.body.password;

        User.findByUsername(username)
            .then(function(result){
                if(result){
                    let user = new User(result);
                    if(user.validatePassword(password)){
                        delete user.data.password;
                        delete user.data._id;
                        req.session['user-agent'] = req.headers['user-agent'];
                        req.session.user = user.data;
                        req.flash('info', 'Successful Login');
                        res.redirect('/admin');
                    } else{
                        req.flash('info', 'Username and password does not match');
                        redirect();
                    }
                } else{
                    req.flash('info', 'Username and password does not match');
                    redirect();
                }
            })
            .catch(function(){
                req.flash('info', 'Username and password does not match');
                redirect();
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
    .post((req, res) => {
        if(req.session){
            req.session.destroy();
        }
        res.render('index', {title: 'logout',body:'logout'});
    });

/* GET home page. */
router.route('/register')
    .get((req, res) => {
        let info = req.flash('info');
        res.render('register', {title: 'Login',body:'',info: info});
    })
    .post((req, res) => {
        if(req.body.username && req.body.email && req.body.password){
            let username = req.body.username;
            let password = req.body.password;
            let email = req.body.email;

            User.findAll({$or: [{username:username},{email:email}]},{limit:1})
                .then(function(results){
                    let newUser = new User(req.body);
                    newUser.setPassword(password);
                    return newUser.save();
                })
                .then(function(item){
                    if(item.ops[0].username){
                        let newUsername = item.ops[0].username;
                        res.redirect('/user/'+newUsername);
                    } else {
                        retry('Error Occured');
                    }
                })
                .catch(function(err){
                    retry('Invalid Parameters');
                });

        } else{
            retry('Invalid Parameters');
        }

        function retry(message){
            req.flash('info',message);
            res.redirect('/register');
        }
    });

export default router;
