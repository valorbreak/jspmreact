'use strict';

var React = require('react');
var Layout = require('./layout');

//var TableRow = React.createClass({
//    render: function render() {
//        return
//    }
//});
var Index = React.createClass({
    render: function render() {
        var users = this.props.users;
        return (
            <Layout>
                <div className="container">
                    <h2>Users</h2>
                    <a href="/logout" className="btn btn-danger pull-right">Logout</a>
                    <table className="table table-responsive table-striped">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Date Created</th>
                        </tr>
                        </thead>
                        { users.map(function(user){
                            return (
                                <tr>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{ new Date(user.created).toDateString() }</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </Layout>
        );
    }
});

module.exports = Index;


