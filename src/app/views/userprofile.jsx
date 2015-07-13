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

var UserPropsItem = React.createClass({
    render: function (){
        return (
            <dl>
                <dt>{this.props.name}</dt>
                <dd>{this.props.value}</dd>
            </dl>
        );
    }
});


var UserProps = React.createClass({
    sanitizer: function (value) {
        if(_.isDate(value)){
            value = value.toDateString();
        } else if(_.isObject(value)){
            value = _.values(value).join(' ');
        }
        return value;
    },
    render: function () {
        var user = this.props.user || [];
        var userProps = Object.keys(user).map(function(key,index){
            user[key] = this.sanitizer(user[key]);
            return (
                <UserPropsItem key={index} name={key} value={user[key]}></UserPropsItem>
            )
        }.bind(this));

        return (
            <div>
                {userProps}
            </div>
        )
    }
});

var Index = React.createClass({
    render: function () {
        return (
            <Layout title={this.props.title}>
                <div className="container">
                    <h1>{this.props.title}</h1>
                    <div>
                        <UserProps user={this.props.user}></UserProps>
                    </div>
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
