import { connect } from 'react-redux'
import UnlockersManagement from '../../components/items-management/UnlockersManagement'
import { fetchUnlockers, clearUnlockers } from '../../store/actions/Items.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        fetching: state.items.unlockersFetching,
        unlockers: state.items.unlockers
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onMount: () => dispatch(fetchUnlockers()),
        onUnmount: () => dispatch(clearUnlockers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnlockersManagement)