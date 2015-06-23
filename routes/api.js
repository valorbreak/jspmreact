"use strict";

var express = require('express');
var router = express.Router();
var entityRoute = require('./entity');
var reddit = require('../models/reddit');
var janelia = require('../models/janelia');
var colors = require('colors'); // add functions to the String.prototype

var api = reddit;

/* GET home page. */
router.get('/', function (req, res, next) {
    api.dota2().then(function(data){
        console.log('REQUEST: [91m Dota 2'.green );
        res.render('test/index', {
            title: 'API Start',
            content: data,
            layout: 'newLayout',
            baseUrl: '/react'
        });
    });
});


/* Nest Routes */
router.use('/entity', entityRoute);

module.exports = router;
