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
import UserProfileServer from './userprofile.jsx';

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
        console.log(data,'data');
        var fetching = fetch('/api/user', {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            return response.text();

        }).then(function(body) {
            return JSON.parse(body);
        });

        return fetching;
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

console.log(UsersStore,'rpower');

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
        return (<UserProfileServer {...this.props}></UserProfileServer>);
    },
    _onChange: function() {
        this.setState(getAppState());
    }
});

window['__DROPKICK__'].Actions = UserActions;

export default indexClient;
