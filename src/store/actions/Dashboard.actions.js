'use strict';

import StoreHelper from '../../lib/StoreHelper';

export const DASH_ACTION_TYPES = {
    FETCH_DATA: 'FETCH_DATA',
    FETCH_DATA_COMPLETE: 'FETCH_DATA_COMPLETE'
}

export const fetchData = () => StoreHelper.createAction(DASH_ACTION_TYPES.FETCH_DATA, credentials);

export const fetchDataComplete = (response, error) => StoreHelper.createAction(DASH_ACTION_TYPES.FETCH_DATA_COMPLETE, response, error);