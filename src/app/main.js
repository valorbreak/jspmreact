'use strict';

import React from 'react';
import {bootstrap} from './bootstrap'; // Module-Loader

// Load Assets
import 'jspm_packages/github/twbs/bootstrap@3.3.4/css/bootstrap.css!';
import './style.css!';

// Scoped Variables
let myVar = 'Scoped Variables';

// Immutable variables
const immutableVar = 'I can\'t be changed';

// Arrow Functions 
let newMap = (x) => (x*2);

bootstrap();

console.log(immutableVar,'Immutable Variables');
console.log(myVar,'Scoped Variable');
console.log(newMap(5),'New Maps, Neat!');

class HelloMessage extends React.Component {
    render() {
        return <div>Hello {this.props.name}</div>
    }
}

React.render(<HelloMessage name="John" />, document.querySelector('#APP'));

