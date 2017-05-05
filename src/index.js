import React                from 'react';
import ReactDOM             from 'react-dom';

import { Provider }         from 'react-redux';
import { ConnectedRouter }  from 'react-router-redux';

import Store                from './store/Store';
import App                  from './components/App';

import createHistory        from 'history/createBrowserHistory';

ReactDOM.render(
    <Provider store={ Store }>
        <ConnectedRouter history={ createHistory() }>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app-wrap')
);