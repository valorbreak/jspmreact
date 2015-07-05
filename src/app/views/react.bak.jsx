'use strict';

import React from 'react';
import Layout from './layout2.jsx';

var api;
var _;
if(typeof window !== 'undefined' && window.document){
    api = System.import('app/views/api')
        .then(function(data){
           return data.default;
        });

    _ = System.import('lodash')
        .then(function(data){
            return data;
        });
}

var states = {
    'clicked': {
        wut : "#902"
    },
    'unclicked': {
        wut : "#000"
    }
};

let Index = React.createClass({
    handleClick: function(event) {
        this.setState(states.clicked);
    },
    getInitialState : function() {
        return states.unclicked;
    },
    componentDidMount: function(){
        api.then(function(api){
            return api.getDota();
        }).then(function(data){
            console.log(data,'newdata');
        });
        console.log(this.state,'state');
    },
    render: function () {
        return (
            <Layout>
                <div className="container">
                    <h1 style={{color:this.state.wut}}> Title: {this.state.wut} {this.props.title}</h1>
                    <p>Body {this.props.body}</p>
                    <button onClick={this.handleClick}>this is clickable</button>
                </div>
            </Layout>
        );
    }
});

export default Index;
