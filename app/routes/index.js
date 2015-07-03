"use strict";

import express from "express";
import usersRoute from "./user";
import testRoute from "./test";

let router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('cover', {title: 'Dropkick',body:'Next Generation CMS'});
});

router.use('/user',usersRoute);
router.use('/test',testRoute);

module.exports = router;
