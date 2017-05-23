import { connect } from 'react-redux'
import AuditEntries from '../../components/logs/AuditEntries'
import { fetchAuditEntries, clearAuditEntries } from '../../data/logs/Logs.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        fetching: state.logs.auditEntriesFetching,
        data: state.logs.auditEntries,
        role: (state.user || {}).role
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchData: () => dispatch(fetchAuditEntries()),
        clearData: () => dispatch(clearAuditEntries()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuditEntries)