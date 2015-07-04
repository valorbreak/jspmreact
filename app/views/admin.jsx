'use strict';

import React from 'react';
import Layout from './layout';
import Alert from './components/alert';

let Index = React.createClass({
    render: function render() {
        return (
            <Layout>
                <div className="container">
                    <h1 style={{fontWeight:'200'}}>{this.props.title}</h1>
                    <p>{this.props.body}</p>
                    <Alert info={this.props.info}></Alert>
                </div>
                <script type="text/javascript" src="javascripts/test.js"></script>
            </Layout>
        );
    }
});

export default Index;
