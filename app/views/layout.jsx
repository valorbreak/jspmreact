'use strict';

var React = require('react');

var Layout = React.createClass({
    onButtonClick: function() {
        alert('I was rendered on server side but I am clickable because of client mounting!');
    },
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
            </body>
            </html>
        );
    }
});

module.exports = Layout;


