var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({"entity":"what"});
});

router.get('/test', function (req, res, next) {
    res.json({"entity":"test"});
});

module.exports = router;
