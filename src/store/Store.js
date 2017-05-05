import { combineReducers, createStore, applyMiddleware } from 'redux';

import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware, push } from 'react-router-redux';

import AppReducer, { defaultState as AppDefaults } from './reducers/App.reducer';
import DashboardReducer, { defaultState as DashboardDefaults } from './reducers/Dashboard.reducer';

const rootReducer = combineReducers({
    app: AppReducer,
    dashboard: DashboardReducer,
    routing: routerReducer
});

const defaultState = {
    app: AppDefaults,
    dashboard: DashboardDefaults
};

export const history = createHistory()
const middleware = routerMiddleware(history)

const Store = typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function'
    ? createStore(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(middleware)))
    : createStore(rootReducer, defaultState, applyMiddleware(middleware));
export default Store;