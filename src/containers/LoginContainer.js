import { connect } from 'react-redux'
import Login from '../components/auth/Login'
import { login } from '../store/actions/App.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        authenticating: state.app.authenticating,
        user: state.app.user,
        message: state.app.loginError
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onPerformLogin: (username, password) => dispatch(login(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)