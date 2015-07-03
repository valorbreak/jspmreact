'use strict';

import React from 'react';
import Layout from './layout.jsx';

var errorPage = React.createClass({
    render: function render() {
        return (
            <Layout {...this.props}>
                <div className="container">
                    <h1>{this.props.message}</h1>
                    <pre>{this.props.error}</pre>
                    {/*<pre>{this.props.stack}</pre>*/}
                </div>
            </Layout>
        );
    }
});

export default errorPage;
