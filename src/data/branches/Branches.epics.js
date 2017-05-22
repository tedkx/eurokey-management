import { Observable }   from 'rxjs'
import { combineEpics } from 'redux-observable';

import Api              from '../../lib/Api'
import StoreHelper      from '../../lib/StoreHelper'
import { BRANCHES_ACTION_TYPES as AT }    
                        from './Branches.actions'

export const fetchBranchesEpic = (action$, store) => action$
    .ofType(AT.BRANCHES_FETCH)
    .mergeMap(action => Api.fetchBranches(action.payload)
        .map(content => StoreHelper.createAction(AT.BRANCHES_FETCH_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.BRANCHES_FETCH_FAIL, null, e)))
    )

export default combineEpics(
    fetchBranchesEpic
)