import { connect } from 'react-redux'
import LocksManagement from '../components/items-management/LocksManagement'
import { actionCreator } from 'actionCreatorPath'

const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch1: () => {
            dispatch(actionCreator)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(component)