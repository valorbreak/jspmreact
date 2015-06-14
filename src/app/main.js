'use strict';

import React from 'react';
import {bootstrap} from './bootstrap'; // Module-Loader

// Load Assets
import WebFont from 'webfontloader';
import 'jspm_packages/github/twbs/bootstrap@3.3.4/css/bootstrap.css!';
import './style.css!';

// Scoped Variables
let myVar = 'Scoped Variables';

// Immutable variablesjs
const immutableVar = 'I can\'t be changed';

// Arrow Functions 
let newMap = (x) => (x*2);

bootstrap();

WebFont.load({
    google: {
        families: ['Open Sans', 'Droid Serif']
    },
    timeout: 2000 // Set the timeout to two seconds
});

console.log(immutableVar,'Immutable Variables');
console.log(myVar,'Scoped Variable');
console.log(newMap(5),'New Maps, Neat!');

class HelloMessage extends React.Component {
    render() {
        return <div>React Shop {this.props.name}</div>
    }
}

React.render(<HelloMessage name="John" />, document.querySelector('#APP'));

