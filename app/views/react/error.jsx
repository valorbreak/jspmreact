

var React = require('react');

module.exports = React.createClass({

    onButtonClick: function() {
        alert('I was rendered on server side but I am clickable because of client mounting!');
    },

    render: function render() {
        return (
            <div id='index'>
                <h1>Hello ERROR{this.props.name}!</h1>
                <button onClick={this.onButtonClick}>___Click Me___</button>
            </div>
        );
    }
});
