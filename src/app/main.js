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
        //var Component = System.import('./app/views/'+ data.__meta.view);
        var view = data.__meta.view;
        view = view.substr(0, view.lastIndexOf('.')) || view;

        var Component = System.import('./app/views/'+view+'.client.jsx');
        Component
            .catch(function(err){
                console.info(view+'.client.jsx does not exist, defaulting to '+view+'.jsx');
                return System.import('./app/views/'+data.__meta.view);
            })
            .then(renderComp);

    }

    function renderComp (comp){
        var NewComp = comp.default;
        React.render(<NewComp {...data} />, document);
    }
});

//React.render(<NewComp {...data} />, document);

(function() {
var DOMloaded_event = new Event('DOMContentLoaded');
document.addEventListener('DOMloaded_event', function(e){ console.log(e); });
document.dispatchEvent(DOMloaded_event);
})();

// Global Variables
window['__DROPKICK__'] = {
    _ : _,
    api: api,
    Backbone: Backbone
};
