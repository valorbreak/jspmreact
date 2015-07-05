'use strict';

import React from 'react';
import Client from 'react-engine/lib/client';
import routes from './routes.jsx';

//var data = Client.data();
//var Component = System.import('./app/views/'+ data.__meta.view);

function resolveView (viewName) {
    var view;
    System.import('./app/views/'+ viewName)
        .then(function(comp){
            view = comp.default;
            return comp.default;
        });

    return view;
}

// boot options
var options = {
    viewResolver: function(viewName) {
        console.log(resolveView(viewName),'resolev');
        return viewName; //Example: return require('./views/' + viewName);
    }
};

// finally, boot whenever you are ready
// example:
document.addEventListener('DOMContentLoaded', function (event) {
    // `onBoot` - Function (optional)
    // returns data that was used
    // during rendering as the first argument
    console.log(event,'event');
    Client.boot(options, function onBoot(data) {
        console.log(data,'dataclient');
    });
});

(function() {
var DOMloaded_event = new Event('DOMContentLoaded');
document.addEventListener('DOMloaded_event', function(e){ console.log(e); });
document.dispatchEvent(DOMloaded_event);
})();

// if the data is needed before booting on
// client, call `data` function anytime to get it.
// example:
//Component.then(function(comp){
//    var NewComp = comp.default;
//    React.render(<NewComp {...data} />, document);
//});


//React.render(<ReactRoute {...data} />, document);
