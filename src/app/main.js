import React from 'react';
import client from 'react-engine/lib/client';
import ReactRoute from './views/react.jsx';

// boot options
var options = {};

// finally, boot whenever you are ready
// example:
document.addEventListener('DOMContentLoaded', function onLoad() {
    // `onBoot` - Function (optional)
    // returns data that was used
    // during rendering as the first argument
    client.boot(options, function onBoot(data) {
        console.log(data,'dataclient');
    });
});

// if the data is needed before booting on
// client, call `data` function anytime to get it.
// example:
var data = client.data();

React.render(<ReactRoute {...data} />, document);
