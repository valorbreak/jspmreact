'use strict';

var User = require('../models/user');

function requireLogin(req,res,next) {
    if(req.session && req.session.user){
        var username = req.session.user.username;
        User.findByUsername(username)
            .then(function(response){
                if(!response){
                    redirect();
                }else{
                    next();
                }
            });

    } else {
        redirect();
    }

    function redirect(){
        req.flash('info','Please login to view this section');
        res.redirect('/login?destination='+req.originalUrl);
    }
}

function requireLoginApi(req,res,next) {
    if(req.session && req.session.user){
        var username = req.session.user.username;
        User.findByUsername(username)
            .then(function(response){
                if(!response){
                    redirect();
                }else{
                    next();
                }
            });

    } else {
        res.status(404)
            .json({'error':'required auth'});
    }
}

function requireRole(roles){
    return function (req,res,next) {
        if(req.session && req.session.user){
            var username = req.session.user.username;
            User.findByUsername(username)
                .then(function(response){
                    if(!response){
                        redirect();
                    } else {
                        next();
                    }
                });

        } else {
            redirect();
        }

        function redirect(){
            req.flash('info','Please login to view this section');
            res.redirect('/login?destination='+req.originalUrl);
        }
    }
}


module.exports = {
    requireLogin: requireLogin,
    requireLoginApi: requireLoginApi,
    requireRole: requireRole
};
