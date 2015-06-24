"use strict";
var http = require('http');
var fetch = require('node-fetch');
var request = require('request');

// new Buffer('string').toString('base64');
var url = 'http://requestb.in/1c346wd1';

var processStatus = function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    throw new Error(response.statusText)
};

var createPage = function nodemon(user) {
    var httpAuth = new Buffer(user.name+":"+user.password).toString('base64');

    var body = {
        "title": "Basic Services Examples",
        "body": "<div class=\"highlight\">JS Leslie Uri<\/div>",
        "slogan": "Slogan Here"
    };

    return fetch(url,{
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization': 'Basic ' + httpAuth,
                'size': 0,
                'Cache-Control': 'no-cache',
                'agent': null
            },
            body: JSON.stringify(body)
        })
        //.then(processStatus)
        .then(function(res) {
            console.log(res,'tesr');
            return res.text();
        })
        .then(function(body) {
            return body
        })
        .catch(function(error) {
            console.log('Request Failed', error)
        });
};

var requestPost = function (user,callback) {
    var httpAuth = new Buffer(user.name+":"+user.password).toString('base64');
    var body = {
        "title": "Basic Services Examples",
        "body": "<div class=\"highlight\">JS Contewwwnt<\/div>",
        "slogan": "Slogan Here"
    };
    var createPageRequest = {
        method: 'POST',
        url: url,
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization': 'Basic ' + httpAuth,
            'size': 0,
            'Cache-Control': 'no-cache',
            'agent': null
        },
        body: JSON.stringify(body)
    };

    return request(createPageRequest,
        function (error, response, body) {
            callback(error,response,body);
        }
    )
};


var fetchPost = function(user){
    return fetch(url, {
            method: 'POST',
            body: 'a=1'
        }).then(function(res) {
            return res.text();
        }).then(function(body){
            return body;
        })
};


module.exports = {
    requestPost: requestPost,
    fetchPost: fetchPost
};