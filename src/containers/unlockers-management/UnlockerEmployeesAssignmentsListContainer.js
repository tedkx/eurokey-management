import { connect } from 'react-redux'
import UnlockerEmployeesAssignmentsList from '../../components/unlockers-management/UnlockerEmployeesAssignmentsList'
import { fetchUnlockerEmployeesAssignments, clearUnlockerEmployeesAssignments,
    saveUnlockerEmployeesAssignments } from '../../data/unlockers/Unlockers.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        fetching: state.unlockers.unlockerEmployeesAssignmentsFetching,
        data: state.unlockers.unlockerEmployeesAssignments,
        saved: state.unlockers.unlockerEmployeesAssignmentsSaved,
        saving: state.unlockers.unlockerEmployeesAssignmentsSaving
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clearData: () => dispatch(clearUnlockerEmployeesAssignments()),
        fetchData: () => dispatch(fetchUnlockerEmployeesAssignments(ownProps.params.type, ownProps.params.id)),
        saveData: (assignments) => dispatch(saveUnlockerEmployeesAssignments(ownProps.params.type, ownProps.params.id, assignments))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnlockerEmployeesAssignmentsList)