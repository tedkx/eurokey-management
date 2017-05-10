import React                from 'react';
import ReactDOM             from 'react-dom';

import { Provider }         from 'react-redux';
import { ConnectedRouter }  from 'react-router-redux';

import Store, { history }   from './store/Store';
import App                  from './containers/AppContainer';

ReactDOM.render(
    <Provider store={ Store }>
        <ConnectedRouter history={ history }>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app-wrap')
);