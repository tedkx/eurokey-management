import { combineReducers, createStore, applyMiddleware } from 'redux'

import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware, push } from 'react-router-redux'

import createSagaMiddleware from 'redux-saga'

/* Reducers */
import AppReducer, { defaultState as AppDefaults } from './reducers/App.reducer'
import DashboardReducer, { defaultState as DashboardDefaults } from './reducers/Dashboard.reducer'

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
import dashboardSagas from './sagas/Dashboard.sagas'
import itemsSaga from './sagas/Items.sagas'
// function* rootSaga() {
//     yield all([
//         itemsSaga()
//     ])
// }


/* Middleware */
// export const sagaMiddleware = createSagaMiddleware()
// export const history = createHistory()
// const middleware = applyMiddleware(sagaMiddleware, routerMiddleware(history));

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

const Store = typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function'
    ? createStore(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middleware))
    : createStore(rootReducer, defaultState, middleware);

sagaMiddleware.run(dashboardSagas);

export default Store;