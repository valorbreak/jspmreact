var fetch = require('node-fetch');

var dota2 = function startFetching() {
    return fetch('http://www.reddit.com/r/dota2.json')
        .then(function(res) {
            return res.text();
        })
        .then(function(body) {
            var content = JSON.parse(body);
            return content.data.children.map(function(data){
                return data.data;
            });
        });
};

module.exports = {
    dota2: dota2
};