'use strict';

import React from 'react';

let LogoutButton = React.createClass({
    render: function (){
        return (
            <form method='post' action='/logout'>
                <button type='submit' className='btn btn-danger'>Logout</button>
            </form>
        );
    }
});

export default LogoutButton;
