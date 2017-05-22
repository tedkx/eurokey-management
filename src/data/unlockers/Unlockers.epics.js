import { Observable }   from 'rxjs'
import { combineEpics } from 'redux-observable';

import Api              from '../../lib/Api'
import StoreHelper      from '../../lib/StoreHelper'
import { UNLOCKERS_ACTION_TYPES as AT }    
                        from './Unlockers.actions'

export const fetchUnlockersEpic = (action$, store) => action$
    .ofType(AT.UNLOCKERS_FETCH)
    .mergeMap(action => Api.fetchUnlockers(action.payload)
        .map(content => StoreHelper.createAction(AT.UNLOCKERS_FETCH_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.UNLOCKERS_FETCH_FAIL, null, e)))
    )

export const fetchUnlockerEmployeesAssignmentsEpic = (action$, store) => action$
    .ofType(AT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_FETCH)
    .mergeMap(action => Api.fetchUnlockerEmployeesAssignments(action.payload)
        .map(content => StoreHelper.createAction(AT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_FETCH_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_FETCH_FAIL, null, e)))
    )

export const saveUnlockerEmployeesAssignmentsEpic = (action$, store) => action$
    .ofType(AT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_SAVE)
    .mergeMap(action => Api.saveUnlockerEmployeesAssignments(action.payload)
        .map(content => StoreHelper.createAction(AT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_SAVE_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_SAVE_FAIL, null, e)))
    )

export default combineEpics(
    fetchUnlockersEpic,
    fetchUnlockerEmployeesAssignmentsEpic,
    saveUnlockerEmployeesAssignmentsEpic
)