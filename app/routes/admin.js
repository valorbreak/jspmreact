"use strict";

import express from 'express';
import User from '../models/user';

let router = express.Router();
let requireLogin = require('./authrules').requireLogin;

// Routes for '/admin'

router.get('/',requireLogin, (req, res) => {
    let info = req.flash('info');

    if(req.session && req.session.user){
        res.locals.session = req.session;
    }
    res.render('admin', {
        title: 'Admin',
        baseUrl: '/r',
        body: '',
        menu: {
            items: [
                {
                    name: 'Users',
                    description: 'Configure user settings',
                    link: '/admin/users'
                },
                {
                    name: 'System',
                    description: 'System-Wide Settings',
                    link: '/admin/settings'
                },
                {
                    name: 'Structure',
                    description: 'Content types and taxonomies',
                    link: '/admin/structure'
                }
            ]
        },
        info: info
    });
});


router.use('/users',requireLogin, (req,res) => {
    User.findAll({},{limit:10,sort:'username', fields: {_id:0,password:0}})
        .then(function(results){
            res.render('user', {title:'Users', users:results, params: req.params, query: req.query});
        })
        .catch(function(err){
            res.render('user', err);
        });
});


//res.locals.sessid = req.cookies.sessid;
//if(req.session && req.session.user){
//    res.locals.session = req.session;
//}


export default router;
