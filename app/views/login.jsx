'use strict';

import React from 'react';
import Layout from './layout.jsx';

let LoginForm = React.createClass({
    render: function () {
        return (
            <form method="post">
                <input type="hidden" name="_csrf" value={this.props.csrfToken} />

                <div className="form-group">
                    <label for="exampleInputPassword1">Username</label>
                    <input type="text" name="username" className="form-control" id="exampleInputPassword1"
                           placeholder="Password"/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1"
                           placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
                <a href="/register" className="btn btn-default">Register</a>
            </form>
        )
    }
});

let LoginPartial = React.createClass({

    render: function render() {
        return (
            <Layout {...this.props}>
                <div className="container">
                    <h2>{this.props.title}</h2>
                    { this.props.info.map(function (item) {
                        return <div className="alert alert-warning">{item}</div>
                    })
                    }
                    <LoginForm {...this.props} ></LoginForm>
                </div>
            </Layout>
        );
    }
});

module.exports = LoginPartial;
