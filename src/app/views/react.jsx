'use strict';

import React from 'react';
import Layout from './layout.jsx';

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
    value: '',
    clicked: false,
    color: '#000'
};

let Index = React.createClass({
    handleClick: function(event) {
        this.state.clicked = !this.state.clicked;
        if(this.state.clicked){
            this.state.color = '#902';
        } else {
            this.state.color = '#000';
        }
        this.setState(this.state);
    },
    handleChange: function(event){
        this.state.value =  event.target.value;
        this.setState(this.state);
    },
    getInitialState : function() {
        return states;
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
        var value = this.state.value;
        return (
            <Layout>
                <div className="container">
                    <a href="/admin">admin link</a>
                    <p>Value: {value}</p>
                    <input type="text" value={value} onChange={this.handleChange} />
                    <h1 style={{color:this.state.color}}> Title: {this.state.color} {this.props.title}</h1>
                    <p>Body {this.props.body}</p>
                    <button className="btn btn-default" onClick={this.handleClick}>this is clickable</button>
                </div>
            </Layout>
        );
    }
});

export default Index;
