import { BRANCHES_ACTION_TYPES } from '../actions/Branches.actions';
import Api from '../../lib/Api';

export const defaultState = {
    fetching: false,
    items: null
}

const branchesReducer = (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default branchesReducer;