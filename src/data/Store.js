import { combineReducers, createStore, 
    applyMiddleware }       from 'redux'

import { browserHistory }   from 'react-router'
import { syncHistoryWithStore, 
    routerReducer }         from 'react-router-redux'

/* Reducers */
import AppReducer, { defaultState as AppDefaults } 
                            from './app/App.reducer'
import DashboardReducer, { defaultState as DashboardDefaults } 
                            from './dashboard/Dashboard.reducer'
import BranchesReducer, { defaultState as BranchesDefaults } 
                            from './branches/Branches.reducer'
import LocksReducer, { defaultState as LocksDefaults } 
                            from './locks/Locks.reducer'
import UnlockersReducer, { defaultState as UnlockersDefaults } 
                            from './unlockers/Unlockers.reducer'

const rootReducer = combineReducers({
    app: AppReducer,
    dashboard: DashboardReducer,
    branches: BranchesReducer,
    locks: LocksReducer,
    unlockers: UnlockersReducer,
    routing: routerReducer
});

const defaultState = {
    app: AppDefaults,
    dashboard: DashboardDefaults,
    branches: BranchesDefaults,
    locks: LocksDefaults,
    unlockers: UnlockersDefaults
};

/* Observable Epix */
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import AppEpics         from './app/App.epics'
import DashboardEpics   from './dashboard/Dashboard.epics'
import BranchesEpics    from './branches/Branches.epics'
import LocksEpics       from './locks/Locks.epics'
import UnlockersEpics   from './unlockers/Unlockers.epics'
const epicMiddleware = createEpicMiddleware(combineEpics(
    AppEpics, DashboardEpics, BranchesEpics, LocksEpics, UnlockersEpics
));

/* Middleware */
const middleware = applyMiddleware(epicMiddleware);

const Store = typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function'
    ? createStore(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middleware))
    : createStore(rootReducer, defaultState, middleware);

/* Router History */
export const history = syncHistoryWithStore(browserHistory, Store)

export default Store;