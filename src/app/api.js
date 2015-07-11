"use strict";

import 'fetch'; // window.fetch polyfill

let api = {
    getDota: function() {
        return fetch('http://www.reddit.com/r/dota2.json')
            .then(function(response) {
                return response.text();
            })
            .then(function(body) {
                return JSON.parse(body)
                    .data.children
                    .map(x => x.data.title);
            });
    },
    getUsers: function() {
        return fetch('/api/user',{credentials: 'same-origin'})
            .then(function(response) {
                return response.text();
            })
            .then(function(body) {
                return JSON.parse(body);
            });

    }
};

export default api;

// Normal Way of using XMLHttpRequest();

//console.log(document.cookie,'cookie');
//function reqListener () {
//    console.log(this.responseText);
//}
//var oReq = new XMLHttpRequest();
//oReq.onload = reqListener;
//oReq.open("get", "/api/user", true);
//oReq.send();
