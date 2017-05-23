import { Observable }   from 'rxjs'
import { combineEpics } from 'redux-observable';

import Api              from '../../lib/Api'
import StoreHelper      from '../../lib/StoreHelper'
import { LOGS_ACTION_TYPES as AT }    
                        from './Logs.actions'

export const fetchEventsEpic = (action$, store) => action$
    .ofType(AT.EVENTS_FETCH)
    .mergeMap(action => Api.fetchEvents(action.payload)
        .map(content => StoreHelper.createAction(AT.EVENTS_FETCH_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.EVENTS_FETCH_FAIL, null, e)))
    )

export const fetchAuditEntriesEpic = (action$, store) => action$
    .ofType(AT.AUDIT_ENTRIES_FETCH)
    .mergeMap(action => Api.fetchAuditEntries(action.payload)
        .map(content => StoreHelper.createAction(AT.AUDIT_ENTRIES_FETCH_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.AUDIT_ENTRIES_FETCH_FAIL, null, e)))
    )

export default combineEpics(
    fetchEventsEpic,
    fetchAuditEntriesEpic
)