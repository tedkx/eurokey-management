import { combineReducers, createStore, 
    applyMiddleware }       from 'redux'

import createHistory        from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware, 
        push }              from 'react-router-redux'

import createSagaMiddleware from 'redux-saga'
import { all }              from 'redux-saga/effects'

/* Reducers */
import AppReducer, { defaultState as AppDefaults } 
                            from './reducers/App.reducer'
import DashboardReducer, { defaultState as DashboardDefaults } 
                            from './reducers/Dashboard.reducer'

const rootReducer = combineReducers({
    app: AppReducer,
    dashboard: DashboardReducer,
    routing: routerReducer
});

const defaultState = {
    app: AppDefaults,
    dashboard: DashboardDefaults
};

/* Sagas */
import appSagas         from './sagas/App.sagas'
import dashboardSagas   from './sagas/Dashboard.sagas'
import branchesSagas    from './sagas/Branches.sagas'
import itemsSagas       from './sagas/Items.sagas'

function* rootSaga() {
    yield all([
        appSagas(),
        dashboardSagas(),
        branchesSagas(),
        itemsSagas()
    ])
}

/* Middleware */
export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

const Store = typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function'
    ? createStore(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middleware))
    : createStore(rootReducer, defaultState, middleware);

sagaMiddleware.run(rootSaga);

export default Store;