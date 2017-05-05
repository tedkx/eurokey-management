import { connect }  from 'react-redux'

import Sidebar      from '../components/layout/Sidebar'

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.app.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)