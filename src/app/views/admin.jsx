'use strict';

import React from 'react';
import Layout from './layout.jsx';
import Alert from './components/alert.jsx';

let Index = React.createClass({
    handleClick: function(event) {
        alert('clicked');
    },
    render: function render() {
        return (
            <Layout>
                <div className="container">
                    <a href="/react">react link</a>
                    <h1 style={{fontWeight:'200'}}>{this.props.title}</h1>
                    <p>{this.props.body}</p>
                    <Alert info={this.props.info}></Alert>
                    <button onClick={this.handleClick}>this is clickable</button>
                </div>
                <script type="text/javascript" src="javascripts/test.js"></script>
            </Layout>
        );
    }
});

export default Index;
