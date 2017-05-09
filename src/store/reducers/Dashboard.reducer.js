import { DASH_ACTION_TYPES as DAT } from '../actions/Dashboard.actions';

export const defaultState = {
    fetching: false,
    myItems: [],
    pendingAcceptancesCount: null,
    totalLockCount: null,
    totalKeyCount: null,
    totalCombinationCount: null,
    unassignedLockCount: null,
    unassignedKeyCount: null,
    unassignedCombinationCount: null
}

const dashboard = (state = defaultState, action) => {
    switch (action.type) {
        case DAT.FETCH_DATA:
            return Object.assign({}, state, { fetching: true });
        case DAT.FETCH_DATA_SUCCESS:
            return Object.assign({}, state, action.payload, { fetching: false });
        case DAT.FETCH_DATA_FAIL:
            return Object.assign({}, state, { fetching: false });
        default:
            return state;
    }
}

export default dashboard;