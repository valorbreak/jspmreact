'use strict';

import React from 'react';
import Layout from './layout.jsx';
import Alert from './components/alert.jsx';
import AdminHeaderMenu from './components/admin-header-menu.jsx';

let style = {
    panelStyle: {
        margin: '15px 0',
        padding: '8px 10px 8px 16px',
        borderLeft: '1px solid #AAA',
        background: '#FFF'
    },
    panelStyle2: {
        margin: '15px 0',
        padding: '8px 10px 8px 16px',
        borderLeft: '1px solid #AAA',
        background: '#EEE'
    },
    description: {
        color: '#666'
    },
    link: {
        fontSize: '16px'
    }
};

let AdminPanel = React.createClass({
    getInitialState: function () {
        return {hover: false};
    },
    mouseOver: function () {
        this.setState({hover: true});
    },
    mouseOut: function () {
        this.setState({hover: false});
    },
    componentDidMount: function(){
        console.info('react did mount');
    },
    render: function (){
        var row = this.props.row;
        var panelStyle = style.panelStyle;
        if (this.state.hover) {
            panelStyle = style.panelStyle2;
        }
        var children = (<div></div>);
        if(this.props.row.items && this.props.row.items.length > 0){
            var menu =  {
                items: this.props.row.items
            };
            children = (<AdminMenu menu={menu}></AdminMenu>);
        }
        return (
            <div onMouseOver={this.mouseOver}
                 onMouseOut={this.mouseOut}
                 style={panelStyle}>
                <div style={style.link}><a href={row.link}>{row.name}</a></div>
                <div style={style.description}>{row.description}</div>
                {children}
            </div>
        )
    }
});

let AdminMenu = React.createClass({
    render: function () {
        var items = this.props.menu.items;
        return (
            <div>
                {items.map(function(row,i){
                    return (
                        <AdminPanel row={row} key={i}></AdminPanel>
                    )
                })}
            </div>
        );
    }
});

let UserMenu = React.createClass({
    render: function () {
        return (
            <div className="pull-right" style={{margin: '20px 0px 20px 20px'}}>Welcome: {this.props.user.username}</div>
        )
    }
});

let Index = React.createClass({
    handleClick: function(event) {
        alert('clicked');
    },
    render: function () {
        return (
            <Layout>
                <div className="container">
                    <AdminHeaderMenu menu={this.props.menu}></AdminHeaderMenu>
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="pull-left" style={{fontWeight:'200'}}>{this.props.title}</h1>
                            <UserMenu user={this.props.session.user}></UserMenu>
                        </div>
                    </div>
                    <Alert info={this.props.info}></Alert>
                    <p>{this.props.body}</p>
                    <AdminMenu menu={this.props.menu}></AdminMenu>
                </div>
                <script type="text/javascript" src="javascripts/test.js"></script>
            </Layout>
        );
    }
});

export default Index;
