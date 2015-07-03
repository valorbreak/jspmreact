'use strict';

import React from 'react';
import Layout from './layout';
import Alert from './components/alert';

let Index = React.createClass({
    render: function render() {
        return (
            <Layout {...this.props}>
                <div className="container">
                    <h1>{this.props.title}</h1>
                    <p>{this.props.body}</p>
                    <Alert info={this.props.info}></Alert>
                </div>
                <script type="text/javascript" src="javascripts/test.js"></script>
            </Layout>
        );
    }
});

export default Index;
