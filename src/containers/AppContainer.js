import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = (state, ownProps) => {
    return {
        authenticating: state.app.authenticating,
        initialLoadingComplete: state.app.initialLoadingComplete,
        user: state.app.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return { }
}

export default connect(mapStateToProps, mapDispatchToProps,)(App)