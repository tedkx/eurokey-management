'use strict';

import StoreHelper from '../../lib/StoreHelper';

export const DASH_ACTION_TYPES = {
    FETCH_DATA: 'FETCH_DATA',
    FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
    FETCH_DATA_FAIL: 'FETCH_DATA_FAIL'
}

export const fetchData = () => StoreHelper.createAction(DASH_ACTION_TYPES.FETCH_DATA)

//export const fetchDataSuccess = (response, error) => StoreHelper.createAction(DASH_ACTION_TYPES.FETCH_DATA_SUCCESS, response, error);