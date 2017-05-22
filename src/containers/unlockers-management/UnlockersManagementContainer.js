import { connect } from 'react-redux'
import UnlockersManagement from '../../components/unlockers-management/UnlockersManagement'
import { fetchUnlockers, clearUnlockers } from '../../data/unlockers/Unlockers.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        fetching: state.unlockers.unlockersFetching,
        unlockers: state.unlockers.unlockers
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onMount: () => dispatch(fetchUnlockers()),
        onUnmount: () => dispatch(clearUnlockers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnlockersManagement)