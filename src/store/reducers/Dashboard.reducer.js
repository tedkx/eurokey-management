import { DASH_ACTION_TYPES } from '../actions/Dashboard.actions';
import Api from '../../lib/Api';

export const defaultState = {
    fetching: false,
    myItems: [],
    pendingAcceptancesCount: null,
    totalLocks: null,
    totalKeyCount: null,
    totalCombinationCount: null,
    unassignedLockCount: null,
    unassignedKeyCount: null,
    unassignedCombinationCount: null
}

const dashboard = (state = defaultState, action) => {
    switch (action.type) {
        case DASH_ACTION_TYPES.FETCH:
            Api.fetchDashboardData();
            return Object.assign({}, state, { fetching: true });
        case DASH_ACTION_TYPES.FETCH_COMPLETE:
            return Object.assign({}, state, { 
                fetching: false, 
                pendingAcceptancesCount: action.payload.pendingAcceptancesCount,
                totalLocks: action.payload.totalLocks,
                totalKeyCount: action.payload.totalKeyCount,
                totalCombinationCount: action.payload.totalCombinationCount,
                unassignedLockCount: action.payload.unassignedLockCount,
                unassignedKeyCount: action.payload.unassignedKeyCount,
                unassignedCombinationCount: action.payload.unassignedCombinationCount
            });
        default:
            return state;
    }
}

export default dashboard;