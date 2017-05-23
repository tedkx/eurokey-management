import { connect }          from 'react-redux'
import SecurityDashboard    from '../../components/dashboard/SecurityDashboard'
import { fetchSummary, clearSummary }     from '../../data/dashboard/Dashboard.actions';
import { fetchEvents, clearEvents }      from '../../data/logs/Logs.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        totalLockCount: state.dashboard.totalLockCount,
        unassignedLockCount: state.dashboard.unassignedLockCount,
        pendingLockAcceptancesCount: state.dashboard.pendingLockAcceptancesCount,
        notAcceptedLockCount: state.dashboard.notAcceptedLockCount,
        eventsFetching: state.logs.eventsFetching,
        events: state.logs.events
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchData: () => {
            dispatch(fetchSummary());
            dispatch(fetchEvents());
        },
        clearData: () => {
            dispatch(clearSummary());
            dispatch(clearEvents());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecurityDashboard)