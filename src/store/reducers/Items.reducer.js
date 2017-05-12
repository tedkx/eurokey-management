import { ITEMS_ACTION_TYPES as AT } from '../actions/Items.actions'
import Api                          from '../../lib/Api'
import { GENERIC_ERROR }            from '../../lib/Constants'

export const defaultState = {
    locksFetching: false,
    locks: null,

    lockBranchesAssignmentsFetching: false,
    lockBranchesAssignmentsSaving: false,
    lockBranchesAssignments: null,
    lockBranchesAssignmentsSaved: false
}

const itemsReducer = (state = defaultState, action) => {
    let errorMessage = action.error && action.error.message ? action.error.message : null;

    switch (action.type) {
        case AT.LOCKS_FETCH:
            return Object.assign({}, state, { locksFetching: true });
        case AT.LOCKS_FETCH_SUCCESS:
            return Object.assign({}, state, { locksFetching: false, locks: action.payload });
        case AT.LOCKS_FETCH_FAIL:
            return Object.assign({}, state, { locksFetching: false, error: errorMessage || GENERIC_ERROR });
        case AT.LOCKS_CLEAR:

            return Object.assign({}, state, { locksFetching: false, locks: null });
        case AT.LOCKS_BRANCHES_FETCH:
            return Object.assign({}, state, { locksFetching: true });
        case AT.LOCK_BRANCHES_ASSIGNMENTS_FETCH:
            return Object.assign({}, state, { lockBranchesAssignmentsFetching: true });
        case AT.LOCK_BRANCHES_ASSIGNMENTS_FETCH_SUCCESS:
            return Object.assign({}, state, { lockBranchesAssignmentsFetching: false, lockBranchesAssignments: action.payload });
        case AT.LOCK_BRANCHES_ASSIGNMENTS_FETCH_FAIL:
            return Object.assign({}, state, { lockBranchesAssignmentsFetching: false, error: errorMessage || GENERIC_ERROR });
        case AT.LOCK_BRANCHES_ASSIGNMENTS_CLEAR:
            return Object.assign({}, state, { 
                lockBranchesAssignmentsFetching: false, 
                lockBranchesAssignments: null,
                lockBranchesAssignmentsSaved: false
            });

        case AT.LOCK_BRANCHES_ASSIGNMENTS_SAVE:
            return Object.assign({}, state, { lockBranchesAssignmentsSaving: true });
        case AT.LOCK_BRANCHES_ASSIGNMENTS_SAVE_SUCCESS:
            return Object.assign({}, state, { lockBranchesAssignmentsSaving: false, lockBranchesAssignmentsSaved: true });
        case AT.LOCK_BRANCHES_ASSIGNMENTS_SAVE_FAIL:
            return Object.assign({}, state, { lockBranchesAssignmentsSaving: false, error: errorMessage || GENERIC_ERROR });
        default:
            return state;
    }
}

export default itemsReducer;