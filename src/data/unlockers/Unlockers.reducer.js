import { UNLOCKERS_ACTION_TYPES as AT } from './Unlockers.actions'
import Api                          from '../../lib/Api'
import { GENERIC_ERROR }            from '../../lib/Constants'

export const defaultState = {
    unlockersFetching: false,
    unlockers: null,

    unlockerEmployeesAssignmentsFetching: false,
    unlockerEmployeesAssignmentsSaving: false,
    unlockerEmployeesAssignments: null,
    unlockerEmployeesAssignmentsSaved: false
}

const unlockersReducer = (state = defaultState, action) => {
    let errorMessage = action.error && action.error.message ? action.error.message : null;

    switch (action.type) {
        case AT.UNLOCKERS_FETCH:
            return Object.assign({}, state, { unlockersFetching: true });
        case AT.UNLOCKERS_FETCH_SUCCESS:
            return Object.assign({}, state, { unlockersFetching: false, unlockers: action.payload });
        case AT.UNLOCKERS_FETCH_FAIL:
            return Object.assign({}, state, { unlockersFetching: false, error: errorMessage || GENERIC_ERROR });
        case AT.UNLOCKERS_CLEAR:
            return Object.assign({}, state, { unlockersFetching: false, unlockers: null });
        case AT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_FETCH:
            return Object.assign({}, state, { unlockerEmployeesAssignmentsFetching: true });
        case AT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_FETCH:
            return Object.assign({}, state, { unlockerEmployeesAssignmentsFetching: true });
        case AT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_FETCH_SUCCESS:
            return Object.assign({}, state, { unlockerEmployeesAssignmentsFetching: false, unlockerEmployeesAssignments: action.payload });
        case AT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_FETCH_FAIL:
            return Object.assign({}, state, { unlockerEmployeesAssignmentsFetching: false, error: errorMessage || GENERIC_ERROR });
        case AT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_CLEAR:
            return Object.assign({}, state, { 
                unlockerEmployeesAssignmentsFetching: false, 
                unlockerEmployeesAssignments: null,
                unlockerEmployeesAssignmentsSaved: false
            });
        case AT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_SAVE:
            return Object.assign({}, state, { unlockerEmployeesAssignmentsSaving: true });
        case AT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_SAVE_SUCCESS:
            return Object.assign({}, state, { unlockerEmployeesAssignmentsSaving: false, unlockerEmployeesAssignmentsSaved: true });
        case AT.UNLOCKER_EMPLOYEES_ASSIGNMENTS_SAVE_FAIL:
            return Object.assign({}, state, { unlockerEmployeesAssignmentsSaving: false, error: errorMessage || GENERIC_ERROR });
        default:
            return state;
    }
}

export default unlockersReducer;