'use strict';

import React from 'react/addons';
import _ from 'lodash';
import api from 'app/api';
import Backbone from 'backbone';
import {UserActions, IndexView} from './views/user.client.jsx';

// finally, boot whenever you are ready
// example:
document.addEventListener('DOMContentLoaded', function (event) {
    var data = window['__REACT_ENGINE__'];
    //var data = Client.data();
    //if(data){
    //    React.render(<NewComp {...data} />, document);
    //}

    if(data){
        React.render(<IndexView {...data} />, document);
    }

});

(function() {
var DOMloaded_event = new Event('DOMContentLoaded');
document.addEventListener('DOMloaded_event', function(e){ console.log(e); });
document.dispatchEvent(DOMloaded_event);
})();
