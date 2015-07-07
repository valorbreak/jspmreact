'use strict';

import React from 'react';

let AdminHeaderMenu = React.createClass({
    render: function () {
        var items = this.props.menu.items || [];
        return (
            <div className="btn-group" style={{marginTop: '10px'}}>
                {items.map(function(row,i){
                    return (
                        <a className="btn btn-default" href={row.link} key={i}>{row.name}</a>
                    )
                })}
            </div>
        );
    }
});

export default AdminHeaderMenu;
