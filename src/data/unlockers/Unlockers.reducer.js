import { UNLOCKERS_ACTION_TYPES as AT } from './Unlockers.actions'
import Api                          from '../../lib/Api'
import { GENERIC_ERROR }            from '../../lib/Constants'

export const defaultState = {
    error: null,
    
    unlockersFetching: false,
    unlockers: null,
    
    unlockerEmployeeDefinitionsFetching: false,
    unlockerEmployeeDefinitionsSaving: false,
    unlockerEmployeeDefinitions: null,
    unlockerEmployeeDefinitionsSaved: false,

    employeesForAssignmentFetching: false,
    employeesForAssignment: null,
    assigningEmployee: false,
    employeeAssigned: false,

    myUnlockersFetching: false,
    myUnlockers: null,
    myPendingAcceptancesFetching: false,
    myPendingAcceptances: null
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
            return Object.assign({}, state, { unlockersFetching: false, unlockers: null, unlockerEmployeeDefinitionsSaved: false, employeeAssigned: false });

        case AT.MY_UNLOCKERS_FETCH:
            return Object.assign({}, state, { myUnlockersFetching: true });
        case AT.MY_UNLOCKERS_FETCH_SUCCESS:
            return Object.assign({}, state, { myUnlockersFetching: false, myUnlockers: action.payload });
        case AT.MY_UNLOCKERS_FETCH_FAIL:
            return Object.assign({}, state, { myUnlockersFetching: false, error: errorMessage || GENERIC_ERROR });
        
        case AT.UNLOCKER_EMPLOYEES_DEFINITIONS_FETCH:
            return Object.assign({}, state, { unlockerEmployeeDefinitionsFetching: true });
        case AT.UNLOCKER_EMPLOYEES_DEFINITIONS_FETCH:
            return Object.assign({}, state, { unlockerEmployeeDefinitionsFetching: true });
        case AT.UNLOCKER_EMPLOYEES_DEFINITIONS_FETCH_SUCCESS:
            return Object.assign({}, state, { unlockerEmployeeDefinitionsFetching: false, unlockerEmployeeDefinitions: action.payload });
        case AT.UNLOCKER_EMPLOYEES_DEFINITIONS_FETCH_FAIL:
            return Object.assign({}, state, { unlockerEmployeeDefinitionsFetching: false, error: errorMessage || GENERIC_ERROR });
        case AT.UNLOCKER_EMPLOYEES_DEFINITIONS_CLEAR:
            return Object.assign({}, state, { 
                unlockerEmployeeDefinitionsFetching: false, 
                unlockerEmployeeDefinitions: null,
                unlockerEmployeeDefinitionsSaved: false
            });
        case AT.UNLOCKER_EMPLOYEES_DEFINITIONS_SAVE:
            return Object.assign({}, state, { unlockerEmployeeDefinitionsSaving: true });
        case AT.UNLOCKER_EMPLOYEES_DEFINITIONS_SAVE_SUCCESS:
            return Object.assign({}, state, { unlockerEmployeeDefinitionsSaving: false, unlockerEmployeeDefinitionsSaved: true });
        case AT.UNLOCKER_EMPLOYEES_DEFINITIONS_SAVE_FAIL:
            return Object.assign({}, state, { unlockerEmployeeDefinitionsSaving: false, error: errorMessage || GENERIC_ERROR });

        case AT.UNLOCKER_FETCH_EMPLOYEES_FOR_ASSIGNMENT:
            return Object.assign({} , state, { employeesForAssignmentFetching: true });
        case AT.UNLOCKER_FETCH_EMPLOYEES_FOR_ASSIGNMENT_SUCCESS:
            return Object.assign({} , state, { employeesForAssignmentFetching: false, employeesForAssignment: action.payload });
        case AT.UNLOCKER_FETCH_EMPLOYEES_FOR_ASSIGNMENT_FAIL:
            return Object.assign({} , state, { employeesForAssignmentFetching: false, error: errorMessage || GENERIC_ERROR });

        case AT.UNLOCKER_ASSIGN_EMPLOYEE:
            return Object.assign({} , state, { assigningEmployee: true });
        case AT.UNLOCKER_ASSIGN_EMPLOYEE_SUCCESS:
            return Object.assign({} , state, { 
                assigningEmployee: false, 
                employeeAssigned: true, 
                employeesForAssignment: null 
            });
        case AT.UNLOCKER_ASSIGN_EMPLOYEE_FAIL:
            return Object.assign({} , state, { assigningEmployee: false, error: errorMessage || GENERIC_ERROR });
        default:
            return state;
    }
}

export default unlockersReducer;