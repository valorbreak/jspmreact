'use strict';

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
    Client = window['__DROPKICK__'];
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
        console.log('will unmount');
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

var Index = React.createClass({
    getInitialState: function() {

        // Routing is done through Backbone
        var Router = Backbone.Router.extend({
            routes : {
                "admin/user/:id" : "user",
                "admin/users" : "index",
                "admin/users/add" : "addUser"
            },
            index : function(){
                this.state.router.route = 'index';
                this.setState(this.state);
            }.bind(this),
            user : function(id){
                console.log('admin',id);
                console.log(AppRouter.current(),'current');
                this.state.params.id = id;
                this.setState(this.state);
            }.bind(this),
            addUser : function(){
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
                    // NEW: Extracts the params using the internal
                    // function _extractParameters
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
            router: AppRouter.current(this.props.url.substr(1))
        }
    },
    callAPI: function(){
        var api = Client.api;
        api.getDota().then(function(data){
            console.log(data,'data');
        });
    },
    add: function(e){
        this.state.addUser = true;
        this.setState(this.state);
    },
    add2: function(e){
        var users = this.props.users;
        users.push(users[0]);
        this.setProps(this.props);
    },
    remove: function(e){
        var users = this.props.users;
        users.pop();
        this.setProps(this.props);
    },
    sort: function(e){
        var users = this.props.users;
        this.props.users = users.sort(objSort('email'));
        this.setProps(this.props);
    },
    componentDidMount: function(){
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

        Backbone.history.start({pushState:true});

        this.state.ready = true;
        this.setState(this.state);
    },
    render: function render() {
        var users = this.props.users;
        var title = this.props.title;
        var ready = this.state.ready;
        this.state.url = this.props.url;

        var styleColor = {
            marginBottom: '10px'
        };

        var buttons;
        if(ready){
            buttons = (
                <span>
                    <a href='/admin/users' className="btn btn-default">foo</a>
                    <a href='/admin/users/add' className="btn btn-default">Add</a>
                    <button className="btn btn-default" onClick={this.remove}>Remove</button>
                    <button className="btn btn-default" onClick={this.sort}>Sort</button>
                    <button className="btn btn-default" onClick={this.callAPI}>CallAPI</button>
                </span>
            )
        }

        var userAdd;

        if(this.state.router.route === 'addUser'){
            userAdd = (
                <div>User add form</div>
            )
        }

        return (
            <Layout title={title}>
                <div className="container">
                    <h1><a href="/admin/users">{title}</a></h1>
                    <ReactCSSTransitionGroup style={styleColor}
                                             component="div"
                                             className="btn-group"
                                             transitionName="example"
                                             role="group" aria-label="...">
                    {buttons}
                    </ReactCSSTransitionGroup>
                    {userAdd}
                    <TableBody rows={users}></TableBody>
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
