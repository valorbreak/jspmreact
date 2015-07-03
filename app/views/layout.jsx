'use strict';

var React = require('react');

var Layout = React.createClass({
    render: function render() {
        return (
            <html>
            <head>
                <meta charSet='utf-8' />
                <title>{this.props.title}</title>
                <link rel="stylesheet" type="text/css" href="/stylesheets/bootstrap/css/bootstrap.min.css" />
                <link rel="stylesheet" type="text/css" href={this.props.baseUrl + "/app/styles/style.css"} />
            </head>
            <body>
                {this.props.children}
            </body>
            </html>
        );
    }
});

module.exports = Layout;


