import { connect } from 'react-redux'
import UnlockersManagement from '../../components/unlockers-management/UnlockersManagement'
import { fetchUnlockers, clearUnlockers } from '../../data/unlockers/Unlockers.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        fetching: state.unlockers.unlockersFetching,
        role: (state.app.user || {}).role,
        unlockers: state.unlockers.unlockers,
        saved: state.unlockers.unlockerEmployeeDefinitionsSaved || state.unlockers.employeeAssigned
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchData: () => dispatch(fetchUnlockers()),
        clearData: () => dispatch(clearUnlockers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnlockersManagement)