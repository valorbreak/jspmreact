/*-------------------------------------------------------------------------------------------------------------------*\
 |  Copyright (C) 2015 PayPal                                                                                          |
 |                                                                                                                     |
 |  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance     |
 |  with the License.                                                                                                  |
 |                                                                                                                     |
 |  You may obtain a copy of the License at                                                                            |
 |                                                                                                                     |
 |       http://www.apache.org/licenses/LICENSE-2.0                                                                    |
 |                                                                                                                     |
 |  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed   |
 |  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for  |
 |  the specific language governing permissions and limitations under the License.                                     |
 \*-------------------------------------------------------------------------------------------------------------------*/

'use strict';

var React = require('react');
var Layout = require('./layout.jsx');

var LoginForm = React.createClass({
    render: function() {
        return (
            <form method="post">
                <input type="hidden" name="_csrf" value={this.props.csrfToken} />
                <div className="form-group">
                    <label for="exampleInputPassword1">Username</label>
                    <input type="text" name="username" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
                <a href="/register" className="btn btn-default">Register</a>
            </form>
        )
    }
});

var LoginPartial = React.createClass({

    onButtonClick: function() {
        alert('I was rendered on server side but I am clickable because of client mounting!');
    },

    render: function render() {
        return (
            <Layout>
                <div className="container">
                    <h2>{this.props.title}</h2>
                    { this.props.info.map(function(item) {
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
