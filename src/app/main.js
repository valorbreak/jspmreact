'use strict';

import React from 'react';
import {Router,Route,DefaultRoute,RouteHandler} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';

import {bootstrap} from './bootstrap'; // Module-Loader
import API from './api';

bootstrap();    // Run Asset Loaders

class HelloMessage extends React.Component {
    render() {
        return <div>React Shop</div>
    }
}

let api = new API;      // Classes are created using the `new` keyword

let routes = (
    <Router history={BrowserHistory}>
        <Route path="/" component={HelloMessage}>
        </Route>
    </Router>
);



api.getDota()
    .then(function(data){
        let kind =  data[0];
        //Router.run(routes, (Root) => {
        //    React.render(<Root/>, document.body);
        //});
        React.render(routes,document.querySelector('#APP'));

        //React.render(<HelloMessage name={kind} />, document.querySelector('#APP'));
    });

