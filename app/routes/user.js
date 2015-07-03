"use strict";

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var requireLogin = require('./authrules').requireLogin;



/* GET user listing. */
router.get('/', requireLogin, function (req, res) {

    // ...can be rendered to a string on the server...
    User.findAll({},{})
        .then(function(results){
            res.render('user', {users:results});
        })
        .catch(function(err){
            res.render('user', err);
        });
});

var React = require('react');

var HelloMessage = React.createClass({displayName: "HelloMessage",
    render: function() {
        return React.createElement("div", null, "Hello ", this.props.name);
    }
});

//var HelloMessage = React.createClass({
//    render: function() {
//        return (<div>Hello {this.props.name}</div>);
//    }
//});

var HelloMessageInstance = React.createFactory(HelloMessage);

router.get('/react',function(req,res){
    res.send(React.renderToString(HelloMessageInstance({name: "John"})));
});

/* GET user detailed listing. */
router.get('/:id', requireLogin, function (req, res) {
    var userid = req.params.id;
    console.log(userid);
    User.findByUsername(userid)
        .then(function(result){
            res.json(result);
        })
        .catch(function(err){
            res.json(err);
        });

});


module.exports = router;
