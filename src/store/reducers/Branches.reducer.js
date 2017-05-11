import { BRANCHES_ACTION_TYPES as BAT } from '../actions/Branches.actions';
import Api from '../../lib/Api';
import { GENERIC_ERROR } from '../../lib/Constants'

export const defaultState = {
    error: '',
    fetching: false,
    branches: null
}

const branchesReducer = (state = defaultState, action) => {
    let errorMessage = action.error && action.error.message ? action.error.message : null;

    switch (action.type) {
        case BAT.BRANCHES_FETCH:
            return Object.assign({}, state, { fetching: true });
        case BAT.BRANCHES_FETCH_SUCCESS:
            return Object.assign({}, state, { fetching: false, branches: action.payload });
        case BAT.BRANCHES_FETCH_FAIL:
            return Object.assign({}, state, { fetching: false, error: errorMessage || GENERIC_ERROR });
        default:
            return state;
    }
}

export default branchesReducer;