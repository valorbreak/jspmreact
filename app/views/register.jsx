'use strict';

import React from 'react';
import Layout from './layout';
import Alert from './components/alert';

let Index = React.createClass({
    render: function render() {
        return (
            <Layout {...this.props}>
                <div className="container">
                    <h2>Register</h2>
                    <div>{this.props.body}</div>
                    <Alert info={this.props.info}></Alert>
                    <form method="post">
                        <div className="form-group">
                        <label for="exampleInputPassword1">Username</label>
                        <input type="text" name="username" className="form-control" id="exampleInputPassword1" placeholder="Username" />
                        </div>
                        <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" name="email"  className="form-control" id="exampleInputEmail1" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>
            </Layout>
        );
    }
});

export default Index;
