'use strict';

import React from 'react';
import Layout from './layout.jsx';
import clientCode from './client';

var api;
var _;

if(clientCode){
    api = clientCode.dropkick.api;
    _ = clientCode.dropkick._;
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
        console.info('react did mount');
        console.log(this.props.url,'url');
        console.log(this.props.params,'params');
        console.log(this.props.query,'query');
    },
    callAPI: function(){
        api.getDota().then(function(data){
            console.log(data,'newdata');
        });
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
                    <div className="btn-group">
                        <button className="btn btn-default" onClick={this.callAPI}>CallAPI</button>
                        <button className="btn btn-default" onClick={this.handleClick}>this is clickable</button>
                    </div>
                </div>
            </Layout>
        );
    }
});

export default Index;
