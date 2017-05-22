import { Observable }   from 'rxjs'
import { combineEpics } from 'redux-observable';

import Api              from '../../lib/Api'
import StoreHelper      from '../../lib/StoreHelper'
import { DASHBOARD_ACTION_TYPES as AT }    
                        from './Dashboard.actions'

export const fetchSummaryEpic = (action$, store) => action$
    .ofType(AT.SUMMARY_FETCH)
    .mergeMap(action => Api.fetchDashboardData(action.payload)
        .map(content => StoreHelper.createAction(AT.SUMMARY_FETCH_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.SUMMARY_FETCH_FAIL, null, e)))
    )

export default combineEpics(
    fetchSummaryEpic
)