'use strict';

import React from 'react';
import {bootstrap} from './bootstrap'; // Module-Loader
import 'fetch'; // Run the Global Variable

bootstrap();    // Run Asset Loaders

class HelloMessage extends React.Component {
    render() {
        return <div>React Shop {this.props.name}</div>
    }
}

let dotaData = getDota;

function getDota() {
    return fetch('http://www.reddit.com/r/dota2.json')
        .then(function(response) {
            return response.text();
        })
        .then(function(body) {
            return JSON.parse(body);
        });
}


dotaData().then(function(data){
    let kind =  data.kind;
    React.render(<HelloMessage name={kind} />, document.querySelector('#APP'));
});

