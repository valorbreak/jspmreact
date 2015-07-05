'use strict';

import React from 'react';
import {Router,Route,DefaultRoute,RouteHandler,Link,State} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
//import HashHistory from 'react-router/lib/HashHistory';

import {bootstrap} from './bootstrap'; // Module-Loader
import API from './api';

// Set Base Url for Routes - must be the same for jspm
// System.serverBaseUrl
let baseUrl = "/r/";

bootstrap();    // Run Asset Loaders

class Homepage extends React.Component {
    constructor() {
        super();    // This sets arguments for the extended class: constructor(args)
        this.stylePoint = {
            padding: '20px 0'
        };
    }
    componentDidMount() {
        let api = new API;      // Classes are created using the `new` keyword
        api.getDota()
            .then(function(data){
                this.setState({data: data});
            }.bind(this));
    }
    render() {
        console.log(this.props,'client side');
        let baseUrl = this.props.route.path;
        let content = this.state ? this.state.data[0] : 'Loading';
        return (
            <div className="container" style={this.stylePoint}>
                <nav className="navbar navbar-default">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to={baseUrl}>React Shop</Link>
                    </div>
                </nav>
                <div><strong>Route:</strong> {this.props.location.pathname}</div>
                <div><strong>Label:</strong> {content}</div>
                <div>Menu:</div>
                <ul>
                    <li><Link to={baseUrl}>Root</Link></li>
                    <li><Link to={baseUrl+`home`}>HOME</Link></li>
                </ul>
                {/* This only way to pass props to children*/}
                <div>{this.props.children && React.cloneElement(this.props.children, {
                    content: content,
                    baseUrl: baseUrl
                })}</div>
            </div>
        )
    }
}

class NiceMessage extends React.Component {
    render() {
        let baseUrl = this.props.baseUrl;
        return (
            <div>
                <div><Link to={baseUrl+`home/about`}>About</Link></div>
                <div><Link to={baseUrl+`home/contact`}>Contact</Link></div>
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

class ContactMessage extends React.Component {
    render() {
        return (
            <div>
                Contact Message {this.props.children}
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
        component: Homepage,
        childRoutes: [
            {
                path: 'home',
                component: NiceMessage,
                childRoutes: [
                    { path: 'about', component: NiceInside },
                    { path: 'contact', component: ContactMessage }
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


var HelloMessage = React.createClass({displayName: "HelloMessage",
    render: function() {
        return React.createElement("div", null, "Hello ", this.props.name);
    }
});

React.render(React.createElement(HelloMessage, {name: "John"}), document.body);
//React.render(rootRouter,document.body);

function reqListener () {
    console.log(this.responseText);
}
var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "/api/users", true);
oReq.send();
