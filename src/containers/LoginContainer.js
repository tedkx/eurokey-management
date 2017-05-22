import { connect } from 'react-redux'
import Login from '../components/user/Login'
import { login } from '../data/app/App.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        authenticating: state.app.authenticating,
        user: state.app.user,
        error: state.app.loginError
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onPerformLogin: (username, password) => dispatch(login(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)