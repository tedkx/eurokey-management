import { connect }          from 'react-redux'
import ManagerDashboard     from '../../components/dashboard/ManagerDashboard'
import { fetchSummary, clearSummary }   from '../../data/dashboard/Dashboard.actions';
import { fetchEvents, clearEvents }     from '../../data/logs/Logs.actions';

const mapStateToProps = (state, ownProps) => {
    return {
        fetching: state.dashboard.fetching,        
        pendingAcceptances: state.dashboard.pendingAcceptances,
        totalKeyCount: state.dashboard.totalKeyCount,
        totalCombinationCount: state.dashboard.totalCombinationCount,
        unassignedKeyCount: state.dashboard.unassignedKeyCount,
        unassignedCombinationCount: state.dashboard.unassignedCombinationCount,
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDashboard)