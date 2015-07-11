'use strict';

/**
 * Server and Client SHARED CODE
 * Packages must be available for JSPM and NPM
 */
import React from 'react/addons';
import Layout from './layout.jsx';
import LogoutButton from './components/logout.button.jsx';
import AdminHeaderMenu from './components/admin-header-menu.jsx';
import clientCode from './client';
import Backbone from 'backbone';
import _ from 'lodash';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Client;

if(clientCode){
    Client = clientCode.dropkick;
}

var TableBody = React.createClass({
    getInitialState: function(){
        return {
            'animating': false
        };
    },
    componentDidMount: function(){
        console.log('did mount');
    },
    componentDidUpdate: function(props,state){
        var thisTable = React.findDOMNode(this); //var thisTable = this.getDOMNode();
        thisTable.style.color = '#309';
    },
    render: function () {
        var rows = this.props.rows || [];
        var computedRows = rows.map(function(row,i){
            return (
                <TableRow row={row} key={i}></TableRow>
            )
        });
        return (
            <table className="table table-responsive table-striped">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Date Created</th>
                </tr>
                </thead>
                <ReactCSSTransitionGroup transitionName="example" component="tbody">
                    {computedRows}
                </ReactCSSTransitionGroup>
            </table>
        )
    }
});

var TableRow = React.createClass({
    componentWillUnmount: function(){
        var thisTable = React.findDOMNode(this);
        //console.log('will unmount');
        thisTable.style.background = '#890';
    },
    componentWillLeave: function(){
        console.log('will leave');
    },
    componentDidUpdate: function(props,state){
        var thisTable = React.findDOMNode(this);
    },
    render: function render() {
        var row = this.props.row;
        var userLink = '/admin/user/'+ row.username;
        return (
            <tr>
                <td><a href={userLink}>{row.username}</a></td>
                <td>{row.email}</td>
                <td>{ new Date(row.created).toDateString() }</td>
            </tr>
        )
    }
});

// Backbone AppRouter
var AppRouter;

var UserAdd = React.createClass({
    getInitialState: function() {
        return {
            ready: false
        }
    },
    handleSubmit: function(e) {
        e.preventDefault();

        var formObj = {
            username: React.findDOMNode(this.refs.username).value.trim(),
            password: React.findDOMNode(this.refs.password).value,
            email: React.findDOMNode(this.refs.email).value.trim()
        };

        // Send request to the server
        Client.Actions.registerUser(formObj)
            .then(function(response) {
                if(!response.ok){
                    throw response;
                }
                return response.text();
            })
            .then(function(body) {
                return JSON.parse(body);
            })
            .then(function(data){
                React.findDOMNode(this.refs.username).value = '';
                React.findDOMNode(this.refs.password).value = '';

                AppRouter.navigate('/admin/users', {trigger: true});
            }.bind(this))
            .catch(function(response){
                console.log(response, 'Something wrong happened');
            });

    },
    handleChange: function(e){
        console.log('onChange',e.target.value,e);
    },
    componentDidMount: function(){
        this.state.ready = true;
        this.setState(this.state);
    },
    render: function() {
        var button;
        if(this.state.ready){
            button = (<button className="btn btn-default" onClick={this.handleSubmit}>Submit</button>);
        } else {
            button = (<button className="btn btn-default" disabled="disabled">Loading ...</button>);
        }

        return (
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <div className="form-group">
                    <label for="exampleInputPassword1">Username</label>
                    <input type="text" ref="username" className="form-control" id="exampleInputPassword1" placeholder="Username" />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Password</label>
                    <input type="password" ref="password" className="form-control" id="exampleInputEmail1" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Email</label>
                    <input type="email" ref="email" className="form-control" id="exampleInputPassword1" placeholder="Email" />
                </div>
                {button}
            </form>
        )
    }
});

var MenuButtons = React.createClass({
    componentDidMount: function() {
        // Running on Client after server render
        var compDOM = React.findDOMNode(this);

        // Backbone Configuration
        // Enable HTML5 History API - Push State
        $(compDOM).on("click", "a[href^='/']", function(e) {
            var href, url;
            href = $(e.currentTarget).attr('href');
            if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                url = href.replace(/^\//, '').replace('\#\!\/', '');
                AppRouter.navigate(url, {
                    trigger: true
                });
                return false;
            }
        });
    },
    remove: function() {
        Client.Actions.doSomething();
    },
    callAPI: function() {
        Client.Actions.getUsers()
            .then(function(data){
                console.log(data);
            });
    },
    render: function(){
        return (
            <span>
                <a href='/admin/users' className="btn btn-default">Index</a>
                <a href='/admin/users/add' className="btn btn-default">Add</a>
                <button className="btn btn-default" onClick={this.remove}>Remove</button>
                <button className="btn btn-default" onClick={this.sort}>Sort</button>
                <button className="btn btn-default" onClick={this.callAPI}>CallAPI</button>
            </span>
        );
    }
});

var Index = React.createClass({
    getDefaultProps: function() {
        //
    },
    getInitialState: function() {
        // Running on Both Client and Server

        // Routing is done through Backbone
        var Router = Backbone.Router.extend({
            routes : {
                "admin/user/:id" : "user",
                "admin/users" : "index",
                "admin/users/add" : "addUser"
            },
            index : function(){
                this.state.router = AppRouter.current(this.props.url.substr(1));
                this.state.router.route = 'index';
                this.setState(this.state);
            }.bind(this),
            user : function(id){
                this.state.router = AppRouter.current(this.props.url.substr(1));
                this.state.router.route = 'user';
                this.setState(this.state);
            }.bind(this),
            addUser : function(){
                this.state.router = AppRouter.current(this.props.url.substr(1));
                this.state.router.route = 'addUser';
                this.setState(this.state);
            }.bind(this),
            current : function(serverUrl) {
                // http://stackoverflow.com/questions/7563949/backbone-js-get-current-route
                var Router = this,
                    fragment = Backbone.history.fragment,
                    routes = _.pairs(Router.routes),
                    route = null, params = null, matched;

                if(serverUrl){
                    fragment = serverUrl;
                }

                matched = _.find(routes, function(handler) {
                    route = _.isRegExp(handler[0]) ? handler[0] : Router._routeToRegExp(handler[0]);
                    return route.test(fragment);
                });

                if(matched) {
                    params = Router._extractParameters(route, fragment);
                    route = matched[1];
                }

                return {
                    route : route,
                    fragment : fragment,
                    params : params
                };
            }
        });

        AppRouter = new Router();

        return {
            params: this.props.params,
            url: this.props.url,
            ready: false,
            addUser: false,
            router: AppRouter.current(this.props.url.substr(1)),
            stores: {}
        }
    },
    componentWillMount: function(){
        // Running on Both Client and Server

        // But make it only work for the server
        if(!clientCode){
            console.log(this.state,'state');
            console.log(this.props,'props');
        }
    },
    componentDidMount: function(){
        Backbone.history.start({pushState:true});

        this.state.ready = true;
        this.setState(this.state);
    },

    render: function render() {
        var styleColor = {
            marginBottom: '10px'
        };

        var buttons;
        if(this.state.ready){
            buttons = (<MenuButtons></MenuButtons>)
        }

        var comp = {};

        var route = this.state.router.route;
        console.log(this.state.router,'route');
        if(route === 'addUser'){
            comp.addUser = (
                <div style={{margin: '20px 0'}}>
                    <UserAdd></UserAdd>
                </div>
            )
        } else if(route === 'user') {
            comp.user = (
                <div>User Profile: <div>{this.props.user.username || ''}</div></div>
            )
        } else{
            comp.default = (
                <TableBody rows={this.props.users}></TableBody>
            )
        }

        return (
            <Layout title={this.props.title}>
                <div className="container">
                    <h1><a href="/admin/users">{this.props.title}</a></h1>
                    <ReactCSSTransitionGroup style={styleColor}
                                             component="div"
                                             className="btn-group"
                                             transitionName="example"
                                             role="group" aria-label="...">
                    {buttons}
                    </ReactCSSTransitionGroup>
                    {comp.addUser}
                    {comp.default}
                    {comp.user}
                    <LogoutButton></LogoutButton>
                </div>
                <div className="debug">{this.props.debug}</div>
            </Layout>
        );
    }
});

function objSort(prop){
    return function (a, b) {
        if (a[prop] > b[prop]) {return 1;}
        if (a[prop] < b[prop]) {return -1;}
        return 0;
    }
}
export default Index;
