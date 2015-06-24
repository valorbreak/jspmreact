"use strict";

var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({"entity":"what"});
});

router.get('/create', function (req, res, next) {
    var products = Array.apply(null,new Array(20))
                        .map(function(){
                            return new Product();
                        });
    res.json({
        "data":products,
        "meta": {}
    });
});

module.exports = router;
