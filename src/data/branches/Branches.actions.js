'use strict';

import StoreHelper from '../../lib/StoreHelper';

export const BRANCHES_ACTION_TYPES = {
    BRANCHES_FETCH: 'BRANCHES_FETCH',
    BRANCHES_FETCH_SUCCESS: 'BRANCHES_FETCH_SUCCESS',
    BRANCHES_FETCH_FAIL: 'BRANCHES_FETCH_FAIL'
}

export const fetchBranches = () => StoreHelper.createAction(BRANCHES_ACTION_TYPES.BRANCHES_FETCH);