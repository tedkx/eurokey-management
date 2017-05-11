import { connect } from 'react-redux'
import Dashboard from '../components/dashboard/Dashboard';
import { fetchData } from '../store/actions/Dashboard.actions';

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state.dashboard, { user: state.app.user });
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchData: () => dispatch(fetchData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)