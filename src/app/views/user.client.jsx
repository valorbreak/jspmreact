'use strict';

/**
 * CLIENT SIDE CODE;
 * Packages must exist in JSPM
 */

import React from 'react/addons';
import backbone from 'backbone';
import _ from 'lodash';
import EventEmitter from 'event-emitter';

// Load Shared React Component
import UserServer from './user.jsx';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var UserActions = {
    doSomething: function(){
        console.log('doing something');
    },
    getUsers: function() {
        return fetch('/api/user',{credentials: 'same-origin'})
            .then(function(response) {
                return response.text();
            })
            .then(function(body) {
                return JSON.parse(body);
            });
    },
    registerUser: function(data){
        return fetch('/api/user', {
            method: 'delete',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

    },
    sort: function(data){
        console.log(data,'sorting');
    }
};

// Extend ProductStore with EventEmitter to add eventing capabilities
var UsersStore = _.extend({}, EventEmitter.prototype, {

    // Return Product data
    getUsers: function() {
        return _product;
    },
    // Emit Change event
    emitChange: function() {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

var indexClient = React.createClass({
    // Listen for changes
    componentDidMount: function() {
        //ShoeStore.addChangeListener(this._onChange);
    },

    // Unbind change listener
    componentWillUnmount: function() {
        //ShoesStore.removeChangeListener(this._onChange);
    },
    render: function() {
        return (<UserServer {...this.props}></UserServer>);
    },
    _onChange: function() {
        this.setState(getAppState());
    }
});

window['__DROPKICK__'].Actions = UserActions;

export default indexClient;
