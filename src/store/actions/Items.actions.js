'use strict';

import StoreHelper from '../../lib/StoreHelper';

export const ITEMS_ACTION_TYPES = {
    KEYS_FETCH: 'KEYS_FETCH',
    KEYS_FETCH_SUCCESS: 'KEYS_FETCH_SUCCESS',
    KEYS_FETCH_FAIL: 'KEYS_FETCH',
    LOCKS_FETCH: 'LOCKS_FETCH',
    LOCKS_FETCH_SUCCESS: 'LOCKS_FETCH_SUCCESS',
    LOCKS_FETCH_FAIL: 'LOCKS_FETCH_FAIL'
}

export const fetchKeys = () => StoreHelper.createAction(ITEMS_ACTION_TYPES.KEYS_FETCH)

export const fetchLocks = () => StoreHelper.createAction(ITEMS_ACTION_TYPES.LOCKS_FETCH)