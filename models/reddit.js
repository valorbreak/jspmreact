var fetch = require('node-fetch');

var processStatus = function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    throw new Error(response.statusText)
};
var redditUrl = 'http://www.reddit.com/';

var dota2 = function startFetching() {
    return fetch(redditUrl+'r/dota2.json')
        .then(processStatus)
        .then(function(res) {
            return res.text();
        })
        .then(function(body) {
            var content = JSON.parse(body);
            return content.data.children.map(function(data){
                return data.data;
            });
        })
        .catch(function(error) {
            console.log('Request Failed', error)
        });
};

module.exports = {
    dota2: dota2
};