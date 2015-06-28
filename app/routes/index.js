"use strict";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('cover', {title: 'Dropkick',body:'Next Generation CMS'});
});

module.exports = router;
