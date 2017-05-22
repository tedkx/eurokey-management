import { connect } from 'react-redux'
import LocksBranchesAssignmentsList from '../../components/locks-management/LocksBranchesAssignmentsList'
import { fetchLockBranchesAssignments, clearLockBranchesAssignments,
    saveLockBranchesAssignments } from '../../data/locks/Locks.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        fetching: state.locks.lockBranchesAssignmentsFetching,
        data: state.locks.lockBranchesAssignments,
        saved: state.locks.lockBranchesAssignmentsSaved,
        saving: state.locks.lockBranchesAssignmentsSaving
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