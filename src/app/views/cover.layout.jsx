'use strict';

import React from 'react';

var Layout = React.createClass({
    render: function render() {
        return (
            <html>
            <head>
                <meta charSet='utf-8' />
                <title>{this.props.title}</title>
                <link rel="stylesheet" type="text/css" href="/stylesheets/bootstrap/css/bootstrap.min.css" />
                <link rel="stylesheet" type="text/css" href="/r/app/styles/style.css" />
            </head>
            <body>
                {this.props.children}
            <script src="/r/jspm_packages/system.js"></script>
            <script src="/r/config.js"></script>
            <script src="/r/index.js"></script>
            </body>
            </html>
        );
    }
});

export default Layout;

