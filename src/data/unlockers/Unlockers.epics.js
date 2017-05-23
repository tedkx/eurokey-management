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

export const fetchMyUnlockersEpic = (action$, store) => action$
    .ofType(AT.UNLOCKERS_MY_FETCH)
    .mergeMap(action => Api.fetchMyUnlockers(action.payload)
        .map(content => StoreHelper.createAction(AT.UNLOCKERS_MY_FETCH_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.UNLOCKERS_MY_FETCH_FAIL, null, e)))
    )

export const fetchUnlockerEmployeeDefinitionsEpic = (action$, store) => action$
    .ofType(AT.UNLOCKER_EMPLOYEES_DEFINITIONS_FETCH)
    .mergeMap(action => Api.fetchUnlockerEmployeeDefinitions(action.payload)
        .map(content => StoreHelper.createAction(AT.UNLOCKER_EMPLOYEES_DEFINITIONS_FETCH_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.UNLOCKER_EMPLOYEES_DEFINITIONS_FETCH_FAIL, null, e)))
    )

export const saveUnlockerEmployeeDefinitionsEpic = (action$, store) => action$
    .ofType(AT.UNLOCKER_EMPLOYEES_DEFINITIONS_SAVE)
    .mergeMap(action => Api.saveUnlockerEmployeeDefinitions(action.payload)
        .map(content => StoreHelper.createAction(AT.UNLOCKER_EMPLOYEES_DEFINITIONS_SAVE_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.UNLOCKER_EMPLOYEES_DEFINITIONS_SAVE_FAIL, null, e)))
    )

export const fetchEmployeesForAssignmentEpic = (action$, store) => action$
    .ofType(AT.UNLOCKER_FETCH_EMPLOYEES_FOR_ASSIGNMENT)
    .mergeMap(action => Api.fetchEmployeesForUnlockerAssignment(action.payload)
        .map(content => StoreHelper.createAction(AT.UNLOCKER_FETCH_EMPLOYEES_FOR_ASSIGNMENT_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.UNLOCKER_FETCH_EMPLOYEES_FOR_ASSIGNMENT_FAIL, null, e)))
    )

export const assignEmployeeToUnlockerEpic = (action$, store) => action$
    .ofType(AT.UNLOCKER_ASSIGN_EMPLOYEE)
    .mergeMap(action => Api.assignEmployeeToUnlocker(action.payload)
        .map(content => StoreHelper.createAction(AT.UNLOCKER_ASSIGN_EMPLOYEE_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.UNLOCKER_ASSIGN_EMPLOYEE_FAIL, null, e)))
    )

export const acceptUnlockerEpic = (action$, store) => action$
    .ofType(AT.UNLOCKER_ACCEPT)
    .mergeMap(action => Api.acceptUnlocker(action.payload)
        .map(content => StoreHelper.createAction(AT.UNLOCKER_ACCEPT_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.UNLOCKER_ACCEPT_FAIL, null, e)))
    )

export const fetchMyPendingAcceptancesEpic = (action$, store) => action$
    .ofType(AT.UNLOCKERS_MY_PENDING_ACCEPTANCES_FETCH)
    .mergeMap(action => Api.fetchMyPendingAcceptances(action.payload)
        .map(content => StoreHelper.createAction(AT.UNLOCKERS_MY_PENDING_ACCEPTANCES_FETCH_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.UNLOCKERS_MY_PENDING_ACCEPTANCES_FETCH_FAIL, null, e)))
    )


export default combineEpics(
    fetchUnlockersEpic,
    fetchUnlockerEmployeeDefinitionsEpic,
    saveUnlockerEmployeeDefinitionsEpic,
    fetchEmployeesForAssignmentEpic,
    assignEmployeeToUnlockerEpic,
    fetchMyUnlockersEpic,
    acceptUnlockerEpic,
    fetchMyPendingAcceptancesEpic
)