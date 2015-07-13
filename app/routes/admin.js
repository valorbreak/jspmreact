"use strict";

import express from 'express';
import User from '../models/user';
import userRoute from './user';

let router = express.Router();
let requireLogin = require('./authrules').requireLogin;

// RequireLogin Applies to all routes under admin
router.use(requireLogin);

router.get('/', (req, res) => {
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
                    description: 'Manage user accounts',
                    link: '/admin/users',
                    items: [
                        {
                            name: 'Manage',
                            description: 'Manage user accounts',
                            link: '/admin/users/manage'
                        }
                    ]
                },
                {
                    name: 'System',
                    description: 'System-Wide Settings',
                    link: '/admin/settings',
                    items: [
                        {
                            name: 'Manage',
                            description: 'Manage user accounts',
                            link: '/admin/users/manage'
                        }
                    ]
                },
                {
                    name: 'Structure',
                    description: 'Content types and taxonomies',
                    link: '/admin/structure',
                    items: [
                        {
                            name: 'Manage1',
                            description: 'Manage user accounts',
                            link: '/admin/users/manage',
                            items: [
                                {
                                    name: 'Manage2',
                                    description: 'Manage user accounts',
                                    link: '/admin/users/manage'
                                },
                                {
                                    name: 'Manage2',
                                    description: 'Manage user accounts',
                                    link: '/admin/users/manage'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        info: info
    });
});


router.use('/users', (req,res) => {
    User.findAll({},{limit:100,sort:'username', fields: {_id:0,password:0}})
        .then(function(results){
            res.render('user', {title:'Users', users:results, params: req.params, query: req.query});
        })
        .catch(function(err){
            res.render('user', err);
        });
});

router.use('/user', userRoute);

//res.locals.sessid = req.cookies.sessid;
//if(req.session && req.session.user){
//    res.locals.session = req.session;
//}


export default router;
