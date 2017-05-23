import { connect } from 'react-redux'
import Dashboard from '../../components/dashboard/Dashboard';

const mapStateToProps = (state, ownProps) => {
    return { user: state.app.user }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return { };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)