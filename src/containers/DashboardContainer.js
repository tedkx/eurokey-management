import { connect } from 'react-redux'
import Dashboard from '../components/dashboard/Dashboard';
import { fetchSummary } from '../data/dashboard/Dashboard.actions';
import { fetchUnlockerEmployeesForAssignment } from '../data/unlockers/Unlockers.actions';

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state.dashboard, { user: state.app.user },
        {
            employeesForAssignmentFetching: state.unlockers.employeesForAssignmentFetching,
            employeesForAssignment: state.unlockers.employeesForAssignment,
        });
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchData: () => dispatch(fetchSummary()),
        fetchEmployeesForAssignment: (type, id) => dispatch(fetchUnlockerEmployeesForAssignment(type, id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)