'use strict';

import React from 'react';
import Layout from './layout.jsx';

var TableBody = React.createClass({
    render: function render() {
        var rows = this.props.rows;
        var computedRows = rows.map(function(row){
            return (
                <TableRow row={row}></TableRow>
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
                {computedRows}
            </table>
        )
    }
});

var TableRow = React.createClass({
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
    render: function render() {
        var users = this.props.users;
        var title = this.props.title;
        return (
            <Layout title={title}>
                <div className="container">
                    <h2>{title}</h2>
                    <a href="/logout" className="btn btn-danger pull-right">Logout</a>
                    <TableBody rows={users}></TableBody>
                </div>
            </Layout>
        );
    }
});

export default Index;

