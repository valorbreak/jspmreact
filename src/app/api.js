import 'fetch'; // window.fetch polyfill

class api {
    getDota() {
        return fetch('http://www.reddit.com/r/dota2.json')
            .then(function(response) {
                return response.text();
            })
            .then(function(body) {
                return JSON.parse(body)
                    .data.children
                    .map(x => x.data.title);
            });
    }
}

export default api;