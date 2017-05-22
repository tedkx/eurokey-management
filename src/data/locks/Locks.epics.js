import { Observable }   from 'rxjs'
import { combineEpics } from 'redux-observable';

import Api              from '../../lib/Api'
import StoreHelper      from '../../lib/StoreHelper'
import { LOCKS_ACTION_TYPES as AT }    
                        from './Locks.actions'

export const fetchLocksEpic = (action$, store) => action$
    .ofType(AT.LOCKS_FETCH)
    .mergeMap(action => Api.fetchLocks(action.payload)
        .map(content => StoreHelper.createAction(AT.LOCKS_FETCH_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.LOCKS_FETCH_FAIL, null, e)))
    )

export const fetchLockBranchesAssignmentsEpic = (action$, store) => action$
    .ofType(AT.LOCK_BRANCHES_ASSIGNMENTS_FETCH)
    .mergeMap(action => Api.fetchLockBranchesAssignments(action.payload)
        .map(content => StoreHelper.createAction(AT.LOCK_BRANCHES_ASSIGNMENTS_FETCH_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.LOCK_BRANCHES_ASSIGNMENTS_FETCH_FAIL, null, e)))
    )

export const saveLockBranchesAssignmentsEpic = (action$, store) => action$
    .ofType(AT.LOCK_BRANCHES_ASSIGNMENTS_SAVE)
    .mergeMap(action => Api.saveLockBranchesAssignments(action.payload)
        .map(content => StoreHelper.createAction(AT.LOCK_BRANCHES_ASSIGNMENTS_SAVE_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.LOCK_BRANCHES_ASSIGNMENTS_SAVE_FAIL, null, e)))
    )

export default combineEpics(
    fetchLocksEpic,
    fetchLockBranchesAssignmentsEpic,
    saveLockBranchesAssignmentsEpic
)