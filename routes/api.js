//"use strict";

var express = require('express');
var router = express.Router();
var entityRoute = require('./entity');
var reddit = require('../models/reddit');

var api = reddit;

/* GET home page. */
router.get('/', function (req, res, next) {
    api.dota2().then(function(data){
        console.log("\033[31mREQUEST: \033[91m Dota 2");
        res.render('test/index', {
            title: 'API Start',
            content: data,
            layout: 'newLayout',
            baseUrl: '/react'
        });
    })
});

/* Nest Routes */
router.use('/entity', entityRoute);

module.exports = router;
