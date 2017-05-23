import { connect } from 'react-redux'
import LocksManagement from '../../components/locks-management/LocksManagement'
import { fetchLocks, clearLocks } from '../../data/locks/Locks.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        fetching: state.locks.locksFetching,
        locks: state.locks.locks,
        role: (state.app.user || {}).role
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onMount: () => dispatch(fetchLocks()),
        onUnmount: () => dispatch(clearLocks()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocksManagement)