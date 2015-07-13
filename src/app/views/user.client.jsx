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

// Actions -> Stores -> Views -> Actions

var UserActions = {
    doSomething: function(){
        console.log('do nothing');
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
            method: 'put',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },

    removeUsers: function(data){
        var deletedUsers =  data.map(function(data){
                                return data.username;
                            });
        var fetchPromises = deletedUsers.map(function(username){
            return fetch('/api/user', {
                method: 'delete',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username:username})
            });
        });

        return Promise.all(fetchPromises);
    },
    promiseUser: function(data){
        var fetchPromises = [fetch('/api/user'),fetch('/api/user')];

        return Promise.all(fetchPromises);
    },
    refreshUser: function(){
        return fetch('/api/user',{credentials: 'same-origin'})
            .then(function(response) {
                return response.text();
            })
            .then(function(body) {
                UsersStore._users = JSON.parse(body);
                UsersStore.emitChange();

                return JSON.parse(body);
            });
    },
    sort: function(data){
        console.log(data,'sorting');
    }
};

// Extend UsersStore with EventEmitter to add eventing capabilities
var UsersStore = EventEmitter({
    // Return Product data
    getUsers: function() {
        return this._users;
    },
    emitChange: function() {
        // Emit Change event
        this.emit('change');
    },
    addChangeListener: function(callback) {
        // Add change listener
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        // Remove change listener
        this.removeListener('change', callback);
    }
});

var IndexView = React.createClass({
    getInitialState: function() {
        // We are setting data from __REACT_ENGINE__
        // @todo: Replace with immutable props

        return _.cloneDeep(this.props);
    },
    componentDidMount: function() {
        // Listen for changes
        UsersStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        // Unbind change listener
        UsersStore.removeChangeListener(this._onChange);
    },
    render: function() {
        console.log('refresh props');
        return (<UserServer {...this.state}></UserServer>);
    },
    _onChange: function() {
        this.state.users = UsersStore._users;
        this.setState(this.state);
    }
});


// Global Variables
window['__DROPKICK__'] = {
    Actions: UserActions
};

export var UserActions = UserActions;
export var IndexView = IndexView;


//var TableStore = {
//    items: {},
//    addItem: function(data,key){
//        this.items[key] = data;
//        sessionStorage.setItem('userStore',JSON.stringify(this.items));
//    },
//    removeItem: function(key){
//        delete this.items[key];
//        sessionStorage.setItem('userStore',JSON.stringify(this.items));
//    },
//    fetchItem: function(){
//        try{
//            this.items = JSON.parse(sessionStorage.getItem('userStore')) || {};
//        } catch(e){
//            this.items = {};
//        }
//    }
//};
//
//TableStore.fetchItem();
