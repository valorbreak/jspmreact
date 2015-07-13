"use strict";

var express = require('express');
var _ = require('lodash');
var router = express.Router();
var entityRoute = require('./entity');
//var reddit = require('../models/reddit');
//var janelia = require('../models/janelia');
var colors = require('colors'); // add functions to the String.prototype
var User = require('../models/user'); // add functions to the String.prototype

//var api = reddit;

/* GET home page. */
//router.get('/', function (req, res) {
//    api.dota2().then(function(data){
//        console.log('REQUEST: [91m Dota 2'.green );
//        res.render('test/index', {
//            title: 'API Start',
//            content: data,
//            layout: 'newLayout',
//            baseUrl: '/react'
//        },
//        function(err,html){
//            console.log(html,'teml');
//        });
//    });
//});

/* GET users listing. */
router.route('/users')
    .get(function (req, res) {
        if( (req.session && req.session.user) || req.headers.demo){
            var users = User.findAll({}, {limit:10,sort:'username', fields: {_id:0,password:0}});
            users.then(function(items){
                res.json(items);
            },function(err){
                res.json(err);
            });
        } else{
            res.status(404)        // HTTP status 404: NotFound
                .json({message: '404 not found', code: 404});
        }
    })
    .post(function(req,res){
        var jsonBody = req.body;

        var foundPromise = User.findByUsername(jsonBody.username);

        foundPromise.then(function(data){
            jsonBody._id = data._id;
            var savedUser = new User(jsonBody);
            savedUser.save()
                .then(function(data){
                    res.json(data);
                },function(err){
                    res.json(err);
                });
        },function(err){
            res.json(err);
        });
    })
    .put(function(req,res){
        var jsonBody = req.body;

        if(jsonBody.password && _.isString(jsonBody.password)){
            var user = new User(jsonBody);
            user.setPassword(jsonBody.password);

            user.save().then(function(response){
                res.json(response);
            },function(err){
                res.json(err);
            });

        } else{
            res.json({'error': 'Invalid Parameters'});
        }

    });


/* Nest Routes */
router.use('/entity', entityRoute);

module.exports = router;

export default router;