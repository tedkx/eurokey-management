import { connect } from 'react-redux'
import BranchesList from '../components/branches/BranchesList'
import { fetchBranches } from '../data/branches/Branches.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        branches: state.branches.branches,
        fetching: state.branches.fetching
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchBranches: () => dispatch(fetchBranches())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BranchesList)