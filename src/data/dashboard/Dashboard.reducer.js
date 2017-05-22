import { DASHBOARD_ACTION_TYPES as DAT } from './Dashboard.actions';

export const defaultState = {
    events: null,
    fetchingSummary: false,
    myUnlockers: null,
    myPendingAcceptances: null,
    pendingAcceptances: null,
    totalLockCount: null,
    totalKeyCount: null,
    totalCombinationCount: null,
    unassignedLockCount: null,
    unassignedKeyCount: null,
    unassignedCombinationCount: null,
}

const dashboard = (state = defaultState, action) => {
    switch (action.type) {
        case DAT.SUMMARY_FETCH:
            return Object.assign({}, state, { fetchingSummary: true });
        case DAT.SUMMARY_FETCH_SUCCESS:
            return Object.assign({}, state, action.payload, { fetchingSummary: false });
        case DAT.SUMMARY_FETCH_FAIL:
            return Object.assign({}, state, { fetchingSummary: false });
        default:
            return state;
    }
}

export default dashboard;