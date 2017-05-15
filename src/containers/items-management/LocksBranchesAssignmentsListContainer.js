import { connect } from 'react-redux'
import LocksBranchesAssignmentsList from '../../components/items-management/LocksBranchesAssignmentsList'
import { fetchLockBranchesAssignments, clearLockBranchesAssignments,
    saveLockBranchesAssignments } from '../../store/actions/Items.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        fetching: state.items.lockBranchesAssignmentsFetching,
        data: state.items.lockBranchesAssignments,
        saved: state.items.lockBranchesAssignmentsSaved,
        saving: state.items.lockBranchesAssignmentsSaving
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clearData: () => dispatch(clearLockBranchesAssignments()),
        fetchData: () => dispatch(fetchLockBranchesAssignments(ownProps.params.id)),
        saveData: (assignments) => dispatch(saveLockBranchesAssignments(ownProps.params.id, assignments))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocksBranchesAssignmentsList)