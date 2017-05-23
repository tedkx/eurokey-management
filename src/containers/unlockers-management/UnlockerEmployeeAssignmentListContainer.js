import { connect } from 'react-redux'
import UnlockerEmployeeAssignmentList   from '../../components/unlockers-management/UnlockerEmployeeAssignmentList'
import { fetchUnlockerEmployeesForAssignment, clearUnlockerEmployeesForAssignment,
    assignEmployee } from '../../data/unlockers/Unlockers.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        fetching: state.unlockers.employeesForAssignmentFetching,
        data: state.unlockers.employeesForAssignment,
        saved: state.unlockers.employeeAssigned,
        saving: state.unlockers.assigningEmployee
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clearData: () => dispatch(clearUnlockerEmployeesForAssignment()),
        fetchData: () => dispatch(fetchUnlockerEmployeesForAssignment(ownProps.params.type, ownProps.params.id)),
        saveData: (assignee, eventTypeId, reason) => dispatch(assignEmployee(ownProps.params.type, ownProps.params.id, assignee, eventTypeId, reason))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnlockerEmployeeAssignmentList)