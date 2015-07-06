'use strict';

import React from 'react';
import Layout from './layout.jsx';
import Alert from './components/alert.jsx';
import LogoutButton from './components/logout.button.jsx';

let LoginForm = React.createClass({
    render: function () {
        return (
            <form method="post">
                <input type="hidden" name="_csrf" value={this.props.csrfToken} />

                <div className="form-group">
                    <label for="exampleInputPassword1">Username</label>
                    <input type="text" name="username" className="form-control" id="username"
                           placeholder="Password"/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" name="password" className="form-control" id="password"
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
            <Layout>
                <div className="container">
                    <h2>{this.props.title}</h2>
                    <p>{this.props.body}</p>
                    <Alert info={this.props.info}></Alert>
                    {
                        (this.props.login) ?
                            (<LoginForm {...this.props} ></LoginForm>) :
                            (<LogoutButton></LogoutButton>)
                    }
                </div>
            </Layout>
        );
    }
});

export default LoginPartial;
