'use strict';

import StoreHelper from '../../lib/StoreHelper';

export const DASHBOARD_ACTION_TYPES = {
    SUMMARY_FETCH: 'SUMMARY_FETCH',
    SUMMARY_FETCH_SUCCESS: 'SUMMARY_FETCH_SUCCESS',
    SUMMARY_FETCH_FAIL: 'SUMMARY_FETCH_FAIL',
    SUMMARY_CLEAR: 'SUMMARY_CLEAR'
}

export const fetchSummary = () => StoreHelper.createAction(DASHBOARD_ACTION_TYPES.SUMMARY_FETCH)

export const clearSummary = () => StoreHelper.createAction(DASHBOARD_ACTION_TYPES.SUMMARY_CLEAR)