import { APP_ACTION_TYPES } from './App.actions'

import Crypto   from '../../lib/Crypto'

export const defaultState = {
    authenticating: false,
    initialLoadComplete: false,
    loading: false,
    suggestions: [],
    suggestionsLoading: false,
    suggestionsSearchTerm: '',
    //user: { firstName: 'Γιώργος', lastName: 'Παπαδάκης', role: 'manager', accessToken: 'ekakalos' }
    user: null
}

const app = (state = defaultState, action) => {
    switch (action.type) {
        case APP_ACTION_TYPES.LOGIN:
            return Object.assign({}, state, { authenticating: true });
        case APP_ACTION_TYPES.LOGIN_SUCCESS:
            action.payload.accessToken = Crypto.encryptToken(action.payload.accessToken);
            delete action.payload.password;
            return Object.assign({}, state, { authenticating: false, user: action.payload });
        case APP_ACTION_TYPES.LOGOUT:
            return Object.assign({}, state, { user: null });
        case APP_ACTION_TYPES.SUGGEST:
            return Object.assign({}, state, { 
                suggestionsSearchTerm: action.payload,
                suggestionsLoading: true
            });
        case APP_ACTION_TYPES.SUGGEST_COMPLETE:
            return Object.assign({}, state, { 
                suggestions: action.payload,
                suggestionsLoading: false                
            });
        case APP_ACTION_TYPES.CLEAR_SUGGESTIONS:
            return Object.assign({}, state, { suggestions: [] });
        default:
            return state;
    }
}

export default app;