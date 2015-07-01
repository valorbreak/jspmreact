'use strict';

var User = require('../models/user');

function requireLogin(req,res,next) {
    if(req.session && req.session.user){
        var username = req.session.user.username;
        User.findByUsername(username, function(err,response){
            if(err || !response){res.redirect('/login?destination='+req.originalUrl); return;}
            next();
        });
    } else {
        req.flash('info','Please login to view this section');
        res.redirect('/login?destination='+req.originalUrl);
        return;
    }
}

module.exports = {
    requireLogin: requireLogin
};
