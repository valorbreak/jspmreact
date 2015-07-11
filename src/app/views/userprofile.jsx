'use strict';

/**
 * Server and Client SHARED CODE
 * Packages must be available for JSPM and NPM
 */
import React from 'react/addons';
import Layout from './layout.jsx';
import clientCode from './client';
import Backbone from 'backbone';
import _ from 'lodash';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Client;

if(clientCode){
    Client = clientCode.dropkick;
}

var Index = React.createClass({
    render: function render() {
        console.log(this.props,'props');
        return (
            <Layout title={this.props.title}>
                <div className="container">
                    <h1>{this.props.title}</h1>
                    <p>User: {this.props.user.username}</p>
                    <div className="debug">{this.props.debug}</div>
                </div>
            </Layout>
        );
    }
});

function objSort(prop){
    return function (a, b) {
        if (a[prop] > b[prop]) {return 1;}
        if (a[prop] < b[prop]) {return -1;}
        return 0;
    }
}
export default Index;
