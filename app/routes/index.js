"use strict";

var express = require('express');
var router = express.Router();
var usersRoute = require('./user');
var testRoute = require('./test');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('cover', {title: 'Dropkick',body:'Next Generation CMS'});
});

router.use('/user',usersRoute);
router.use('/test',testRoute);

module.exports = router;
