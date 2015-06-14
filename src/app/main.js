'use strict';

import React from 'react';
import {Router,Route,DefaultRoute,RouteHandler,Link} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
//import HashHistory from 'react-router/lib/HashHistory';

import {bootstrap} from './bootstrap'; // Module-Loader
import API from './api';

let baseUrl = System.serverBaseUrl; // Set Base Url for Routes - must be the same for jspm

bootstrap();    // Run Asset Loaders

class HelloMessage extends React.Component {
    render() {
        //  this.props.children = children components
        return (
            <div>
                1st Level React Shop
                <Link to={baseUrl+`/home`}>link here</Link>
                <div>{this.props.children}</div>
            </div>
        )
    }
}

class NiceMessage extends React.Component {
    render() {
        return (
            <div>
                <Link to={baseUrl+`/home/about`}>link here</Link>
                2nd Level React NICE {this.props.children}
            </div>
        )
    }
}


class NiceInside extends React.Component {
    render() {
        return (
            <div>
                3rd Level {this.props.children}
                <Link to={baseUrl+`/home`}>Home</Link>
            </div>
        )
    }
}

class notFoundMessage extends React.Component {
    render() {
        return (
            <div>NotFound {this.props.children}</div>
        )
    }
}

let routes = [
    {
        path: baseUrl,
        component: HelloMessage,
        childRoutes: [
            {
                path: 'home',
                component: NiceMessage,
                childRoutes: [
                    { path: 'about', component: NiceInside }
                ]
            }
        ]
    },
    {
        path: '*',
        component: notFoundMessage
    }
];

let rootRouter = (
    <Router children={routes} history={BrowserHistory}></Router>
);

let api = new API;      // Classes are created using the `new` keyword

api.getDota()
    .then(function(data){
        React.render(rootRouter,document.querySelector('#APP'));
    });

