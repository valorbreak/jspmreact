"use strict";

var express = require('express');
var _ = require('lodash');
var router = express.Router();
var entityRoute = require('./entity');
var User = require('../models/user'); // add functions to the String.prototype

var csrf = require('csurf');
var csrfProtection = csrf();

let requireLoginApi = require('./authrules').requireLoginApi;

router.use(requireLoginApi);

/* GET users listing. */
router.route('/user')
    .get(function (req, res) {
        User.findAll({}, {limit:100,sort:'username', fields: {_id:0,password:0}})
            .then(function(items){
                res.json(items);
            },function(err){
                res.json(err);
            });
    })
    .post(function(req,res){
        var jsonBody = req.body;

        User.findByUsername(jsonBody.username)
            .then(function(data){
                jsonBody._id = data._id;
                var savedUser = new User(jsonBody);
                return savedUser.save();
            })
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.json(err);
            });
    })
    .put(function(req,res){
        var jsonBody = req.body;

        if(jsonBody.password && _.isString(jsonBody.password)){
            var user = new User(jsonBody);
            user.setPassword(jsonBody.password);

            user.save()
                .then(function(response){
                    res.json(response);
                },function(err){
                    res.json(err);
                });

        } else{
            res.status(400)
                .json({'error': 'Invalid Parameters'});
        }

    })
    .delete(function(req,res){

        var jsonBody = req.body;
        User.findByUsername(jsonBody.username)
            .then(function(data){
                var userEdit = new User(data);
                return userEdit.remove();
            })
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.status(400)
                    .json(err);
            });

        //res.status(400)
        //    .json({'nothing':'happened'});
    });


/* Nest Routes */
router.use('/entity', entityRoute);

//router.get('/auth/token', function(req,res){
//    res.json({'token': req.csrfToken()});
//});

module.exports = router;

export default router;
