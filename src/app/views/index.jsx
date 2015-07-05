'use strict';

import React from 'react';

let Index = React.createClass({
    onButtonClick: function () {
        alert('I was rendered on server side but I am clickable because of client mounting!');
    },
    render: function render() {
        return (
            <div id='index'>
                <h1>Hello INDEX{this.props.name}!</h1>
                <button onClick={this.onButtonClick}>___Click Me___</button>
            </div>
        );
    }
});

export default Index;
