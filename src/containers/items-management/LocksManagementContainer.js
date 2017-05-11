import { connect } from 'react-redux'
import LocksManagement from '../../components/items-management/LocksManagement'
import { fetchLocks, clearLocks } from '../../store/actions/Items.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        fetching: state.items.locksFetching,
        locks: state.items.locks
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onMount: () => dispatch(fetchLocks()),
        onUnmount: () => dispatch(clearLocks()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocksManagement)