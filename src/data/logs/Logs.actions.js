'use strict';

import StoreHelper from '../../lib/StoreHelper';

export const LOGS_ACTION_TYPES = {
    EVENTS_FETCH: 'EVENTS_FETCH',
    EVENTS_FETCH_SUCCESS: 'EVENTS_FETCH_SUCCESS',
    EVENTS_FETCH_FAIL: 'EVENTS_FETCH_FAIL',
    EVENTS_CLEAR: 'LOCKS_CLEAR',
    AUDIT_ENTRIES_FETCH: 'AUDIT_ENTRIES_FETCH',
    AUDIT_ENTRIES_FETCH_SUCCESS: 'AUDIT_ENTRIES_FETCH_SUCCESS',
    AUDIT_ENTRIES_FETCH_FAIL: 'AUDIT_ENTRIES_FETCH_FAIL',
    AUDIT_ENTRIES_CLEAR: 'AUDIT_ENTRIES_CLEAR'
}
export const fetchEvents = () => StoreHelper.createAction(LOGS_ACTION_TYPES.EVENTS_FETCH);

export const clearEvents = () => StoreHelper.createAction(LOGS_ACTION_TYPES.EVENTS_CLEAR);

export const fetchAuditEntries = (eventId) => StoreHelper.createAction(LOGS_ACTION_TYPES.AUDIT_ENTRIES_FETCH, eventId);

export const clearAuditEntries = () => StoreHelper.createAction(LOGS_ACTION_TYPES.AUDIT_ENTRIES_CLEAR,);