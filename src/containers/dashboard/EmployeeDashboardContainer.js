import { connect } from 'react-redux'
import EmployeeDashboard from '../../components/dashboard/EmployeeDashboard'
import { fetchSummary,clearSummary } from '../../data/dashboard/Dashboard.actions'
import { fetchUnlockerEmployeesForAssignment } from '../../data/unlockers/Unlockers.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        //myUnlockersFetching: state.unlockers.myUnlockersFetching,
        myUnlockers: state.dashboard.myUnlockers,
        //myPendingAcceptancesFetching: state.unlockers.myPendingAcceptancesFetching,
        myPendingAcceptances: state.dashboard.myPendingAcceptances,
        employeesForAssignmentFetching: state.unlockers.employeesForAssignmentFetching,
        employeesForAssignment: state.unlockers.employeesForAssignment

        //myUnlockers
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchData: () => dispatch(fetchSummary()),
        clearData: () => dispatch(clearSummary()),
        fetchEmployeesForAssignment: (type, id) => dispatch(fetchUnlockerEmployeesForAssignment(type, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDashboard)