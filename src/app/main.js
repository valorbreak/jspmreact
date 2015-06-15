'use strict';

import React from 'react';
import {Router,Route,DefaultRoute,RouteHandler,Link} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
//import HashHistory from 'react-router/lib/HashHistory';

import {bootstrap} from './bootstrap'; // Module-Loader
import API from './api';

let baseUrl = System.serverBaseUrl + "/"; // Set Base Url for Routes - must be the same for jspm
console.log(baseUrl,'asdf');
bootstrap();    // Run Asset Loaders

class HelloMessage extends React.Component {
    componentDidMount() {
        let api = new API;      // Classes are created using the `new` keyword
        let self = this;
        api.getDota()
            .then(function(data){
                self.setState({data: data});
            });
    }
    render() {
        let content = this.state ? this.state.data[0] : 'Loading';
        return (
            <div>
                <div>Route: {this.props.location.pathname}</div>
                <div>State: {content}</div>
                <ul>
                    <li><Link to={baseUrl}>ROOT</Link></li>
                    <li><Link to={baseUrl+`home`}>HOME</Link></li>
                </ul>
                {/* This only way to pass props to children*/}
                <div>{this.props.children && React.cloneElement(this.props.children, {
                    content: content
                })}</div>
            </div>
        )
    }
}

class NiceMessage extends React.Component {
    render() {
        return (
            <div>
                <div><Link to={baseUrl+`home/about`}>About</Link></div>
                <div>Passed Prop {this.props.content}</div>
                <div>2nd Level React NICE {this.props.children}</div>
            </div>
        )
    }
}


class NiceInside extends React.Component {
    render() {
        return (
            <div>
                3rd Level {this.props.children}
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

React.render(rootRouter,document.querySelector('#APP'));