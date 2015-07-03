'use strict';

var React = require('react');
var Layout = require('./layout');

module.exports = React.createClass({
    onButtonClick: function() {
        alert('I was rendered on server side but I am clickable because of client mounting!');
    },
    render: function render() {
        return (
            <Layout {...this.props}>
                <div className="site-wrapper">
                    <div className="site-wrapper-inner">
                        <div className="cover-container">
                            <div className="masthead clearfix">
                                <div className="inner">
                                    <nav>
                                        <ul className="nav masthead-nav">
                                            <li className="active"><a href="#">Home</a></li>
                                            <li><a href="#">Register</a></li>
                                            <li><a href="#">Contact</a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="inner cover">
                                <h1 className="cover-heading">{this.props.title}</h1>
                                <p className="lead">Next Generation CMS</p>
                                <p className="lead">
                                    <a className="btn btn-default" href="/login">Login</a>
                                </p>
                            </div>
                            <div className="mastfoot">
                                <div className="inner">
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
});
