'use strict';

import StoreHelper from '../../lib/StoreHelper';

export const APP_ACTION_TYPES = {
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    LOGOUT: 'LOGOUT',
    SUGGESTIONS_FETCH: 'SUGGESTIONS_FETCH',
    SUGGESTIONS_FETCH_COMPLETE: 'SUGGESTIONS_FETCH_COMPLETE',
    SUGGESTIONS_CLEAR: 'SUGGESTIONS_CLEAR'
}

export const login = (username, password) => StoreHelper.createAction(APP_ACTION_TYPES.LOGIN, { username, password });

export const logout = () => StoreHelper.createAction(APP_ACTION_TYPES.LOGOUT);

export const suggest = searchTerm => StoreHelper.createAction(APP_ACTION_TYPES.SUGGEST, searchTerm);

export const clearSuggestions = () =>  StoreHelper.createAction(APP_ACTION_TYPES.CLEAR_SUGGESTIONS);