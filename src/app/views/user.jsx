'use strict';

import React from 'react/addons';
import Layout from './layout.jsx';
import LogoutButton from './components/logout.button.jsx';
import clientCode from './client';

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
        //var thisTable = this.getDOMNode();
        var thisTable = React.findDOMNode(this);
        thisTable.style.color = '#309';
        console.log('did update');
    },
    render: function () {
        var rows = this.props.rows;
        console.log(rows,'rows');
        var computedRows = rows.map(function(row,i){
            return (
                <TableRow row={row} key={i}></TableRow>
            )
        });
        return (
            <table className="table table-responsive table-striped">
                <thead>
                <tr>
                    <th onClick={this.props.add}>Username</th>
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
        //setTimeout(function(){
        //    thisTable.style.background("#000");
        //}, 1000);
        console.log('rowUpdate');
        //console.log(props,state,'row update');
    },
    render: function render() {
        var row = this.props.row;
        return (
            <tr>
                <td>{row.username}</td>
                <td>{row.email}</td>
                <td>{ new Date(row.created).toDateString() }</td>
            </tr>
        )
    }
});

var Index = React.createClass({
    getInitialState: function() {
        return {
            ready: false
        }
    },
    callAPI: function(){
        var api = Client.api;
        api.getDota().then(function(data){
            console.log(data,'data');
        });
    },
    add: function(e){
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
        this.state.ready = true;
        this.setState(this.state);
    },
    render: function render() {
        var users = this.props.users;
        var title = this.props.title;
        var ready = this.state.ready;

        var buttons;
        if(ready){
            buttons = (
                <div>
                    <button className="btn btn-default" onClick={this.add}>Add</button>
                    <button className="btn btn-default" onClick={this.remove}>Remove</button>
                    <button className="btn btn-default" onClick={this.sort}>Sort</button>
                    <button className="btn btn-default" onClick={this.callAPI}>CallAPI</button>
                </div>
            )
        }
        return (
            <Layout title={title}>
                <div className="container">
                    <h2>{title}</h2>
                    {buttons}
                    <TableBody rows={users} add={this.add}></TableBody>
                    <LogoutButton></LogoutButton>
                </div>
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
