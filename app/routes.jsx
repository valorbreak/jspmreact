'use strict';

var React = require('react');
var Router = require('react-router');

var App = require('./views/app.jsx');
var Account = require('./views/account.jsx');

var routes = module.exports = (
    <Router.Route path='/' handler={App}>
        <Router.DefaultRoute name='account' handler={Account} />
    </Router.Route>
);
