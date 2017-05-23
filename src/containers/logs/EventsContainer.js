import { connect } from 'react-redux'
import Events from '../../components/logs/Events'
import { fetchEvents, clearEvents } from '../../data/logs/Logs.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        fetching: state.logs.eventsFetching,
        data: state.logs.events,
        role: (state.user || {}).role
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchData: () => dispatch(fetchEvents()),
        clearData: () => dispatch(clearEvents()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)