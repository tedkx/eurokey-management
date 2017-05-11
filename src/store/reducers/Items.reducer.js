import { ITEMS_ACTION_TYPES as AT } from '../actions/Items.actions'
import Api                          from '../../lib/Api'
import { GENERIC_ERROR }            from '../../lib/Constants'

export const defaultState = {
    keyTypesFetching: false,
    keyTypes: null,
    locksFetching: false,
    locks: null
}

const itemsReducer = (state = defaultState, action) => {
    let errorMessage = action.error && action.error.message ? action.error.message : null;

    switch (action.type) {
        case AT.LOCKS_FETCH:
            return state.locksFetching === true
                ? state
                : Object.assign({}, state, { locksFetching: true });
        case AT.LOCKS_FETCH_SUCCESS:
            return Object.assign({}, state, { locksFetching: false, locks: action.payload });
        case AT.LOCKS_FETCH_FAIL:
            return Object.assign({}, state, { locksFetching: false, error: errorMessage || GENERIC_ERROR });
        case AT.LOCKS_CLEAR:
            return Object.assign({}, state, { locksFetching: false, locks: null });
        default:
            return state;
    }
}

export default itemsReducer;