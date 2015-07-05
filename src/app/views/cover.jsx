'use strict';

import React from 'react';
import Layout from './cover.layout.jsx';

let Cover = React.createClass({
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
                                {
                                    (this.props.login) ?
                                        (<p className="lead">
                                            <a className="btn btn-default" href="/login">Login</a>
                                        </p>) :
                                        (<div></div>)
                                }
                            </div>
                            <div className="mastfoot">
                                <div className="inner">
                                    <p>AfterofficeIT</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
});

export default Cover;
