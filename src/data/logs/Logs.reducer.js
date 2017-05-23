import { LOGS_ACTION_TYPES as AT }  from './Logs.actions'
import Api                          from '../../lib/Api'
import { GENERIC_ERROR }            from '../../lib/Constants'

export const defaultState = {
    eventsFetching: false,
    events: null,

    auditEntriesFetching: false,
    auditEntries: null
}

const logsReducer = (state = defaultState, action) => {
    let errorMessage = action.error && action.error.message ? action.error.message : null;

    switch (action.type) {
        case AT.EVENTS_FETCH:
            return Object.assign({}, state, { eventsFetching: true });
        case AT.EVENTS_FETCH_SUCCESS:
            return Object.assign({}, state, { eventsFetching: false, events: action.payload });
        case AT.EVENTS_FETCH_FAIL:
            return Object.assign({}, state, { eventsFetching: false, error: errorMessage || GENERIC_ERROR });
        case AT.EVENTS_CLEAR:
            return Object.assign({}, state, { eventsFetching: false, events: null });

        case AT.AUDIT_ENTRIES_FETCH:
            return Object.assign({}, state, { auditEntriesFetching: true });
        case AT.AUDIT_ENTRIES_FETCH_SUCCESS:
            return Object.assign({}, state, { auditEntriesFetching: false, auditEntries: action.payload });
        case AT.AUDIT_ENTRIES_FETCH_FAIL:
            return Object.assign({}, state, { auditEntriesFetching: false, error: errorMessage || GENERIC_ERROR });
        case AT.AUDIT_ENTRIES_CLEAR:
            return Object.assign({}, state, { auditEntriesFetching: false, auditEntries: null });

        default:
            return state;
    }
}

export default logsReducer;