'use strict';

import React from 'react/addons';
import _ from 'lodash';
import api from 'app/api';
import Backbone from 'backbone';

//import Component from './views/react.jsx';
//import NewComp from './views/user.jsx';

// finally, boot whenever you are ready
// example:
document.addEventListener('DOMContentLoaded', function (event) {
    var data = window['__REACT_ENGINE__'];
    //var data = Client.data();
    //if(data){
    //    React.render(<NewComp {...data} />, document);
    //}

    if(data){
        var Component = System.import('./app/views/'+ data.__meta.view);
        Component.then(function(comp){
            var NewComp = comp.default;
            React.render(<NewComp {...data} />, document);
        });
    }
});

//React.render(<NewComp {...data} />, document);

(function() {
var DOMloaded_event = new Event('DOMContentLoaded');
document.addEventListener('DOMloaded_event', function(e){ console.log(e); });
document.dispatchEvent(DOMloaded_event);
})();

window['__DROPKICK__'] = {
    _ : _,
    api: api,
    Backbone: Backbone
};
