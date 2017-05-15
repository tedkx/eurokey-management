import { connect } from 'react-redux'
import UnlockerEmployeesAssignmentsList from '../../components/items-management/UnlockerEmployeesAssignmentsList'
import { fetchUnlockerEmployeesAssignments, clearUnlockerEmployeesAssignments,
    saveUnlockerEmployeesAssignments } from '../../store/actions/Items.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        fetching: state.items.unlockerEmployeesAssignmentsFetching,
        data: state.items.unlockerEmployeesAssignments,
        saved: state.items.unlockerEmployeesAssignmentsSaved,
        saving: state.items.unlockerEmployeesAssignmentsSaving
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