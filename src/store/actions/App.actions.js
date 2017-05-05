'use strict';

import StoreHelper from '../../lib/StoreHelper';

export const APP_ACTION_TYPES = {
    LOGIN: 'LOGIN',
    LOGIN_COMPLETE: 'LOGIN_COMPLETE',
    LOGOUT: 'LOGOUT',
    SUGGESTIONS_FETCH: 'SUGGESTIONS_FETCH',
    SUGGESTIONS_FETCH_COMPLETE: 'SUGGESTIONS_FETCH_COMPLETE',
    SUGGESTIONS_CLEAR: 'SUGGESTIONS_CLEAR'
}

export const login = (credentials) => StoreHelper.createAction(APP_ACTION_TYPES.LOGIN, credentials);

export const loginComplete = (response, error) => StoreHelper.createAction(APP_ACTION_TYPES.LOGIN_COMPLETE, response, error);

export const logout = (credentials) => StoreHelper.createAction(APP_ACTION_TYPES.LOGOUT, credentials);

export const suggest = searchTerm => StoreHelper.createAction(APP_ACTION_TYPES.SUGGEST, searchTerm);

export const suggestComplete = (response, error) => StoreHelper.createAction(APP_ACTION_TYPES.SUGGEST_COMPLETE, response, error);

export const clearSuggestions = () =>  StoreHelper.createAction(APP_ACTION_TYPES.CLEAR_SUGGESTIONS);