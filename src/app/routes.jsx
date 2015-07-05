'use strict';

import React from 'react';
import { Route, DefaultRoute } from 'react-router';

// -- View Components
import ReactRoute from './views/react.jsx';

const routes = (
    <Route path='/' handler={ ReactRoute }>
        <DefaultRoute handler={ ReactRoute }/>
        <Route path='/components' handler={ ReactRoute }/>
        <Route path="/about" handler={ ReactRoute }/>
    </Route>
);

export default routes;
