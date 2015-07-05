'use strict';

import React from 'react';
import Layout from './layout';

let Index = React.createClass({
    render: function render() {
        console.log(this.props,'server');
        return (
            <Layout>
                <div className="container">
                    <h1 style={{fontWeight:'200'}}> Title: {this.props.title}</h1>
                    <p>body: {this.props.body}</p>
                </div>
            </Layout>
        );
    }
});

export default Index;
