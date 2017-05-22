import React                from 'react'
import ReactDOM             from 'react-dom'
import { Provider }         from 'react-redux'
import { Router }           from 'react-router'

import Store, { history }   from './data/Store'
import Routes               from './components/routing/Routing'

ReactDOM.render(
    <Provider store={ Store }>
        <Router history={ history }>
            { Routes }
        </Router>
    </Provider>,
    document.getElementById('app-wrap')
);