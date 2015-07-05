import React from 'react';
import Layout from './layout2.jsx';

let Index = React.createClass({
    handleClick: function(event) {
        alert('clicked');
    },
    componentDidMount(){
        console.log(window,'nice');
        console.log(this.props,'component props');
    },
    render: function render() {
        return (
            <Layout>
                <div className="container">
                    <h1 style={{color:'#000'}}> Title: {this.props.title}</h1>
                    <p>Body {this.props.body}</p>
                    <button onClick={this.handleClick}>this is clickable</button>
                </div>
            </Layout>
        );
    }
});

export default Index;
