import React from 'react';

let Alert = React.createClass({
    render: function render(){
        var info = this.props.info;
        return (
            <div>
                {info.map(function(data){
                    return (<div className="alert alert-info">{data}</div>);
                })}
            </div>
        );
    }
});

export default Alert;
