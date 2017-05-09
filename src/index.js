import React                from 'react';
import ReactDOM             from 'react-dom';

import { Provider }         from 'react-redux';
import { ConnectedRouter }  from 'react-router-redux';

import Store, { history }   from './store/Store';
import App                  from './components/App';

ReactDOM.render(
    <Provider store={ Store }>
        <ConnectedRouter history={ history }>
            <App history={ history } />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app-wrap')
);