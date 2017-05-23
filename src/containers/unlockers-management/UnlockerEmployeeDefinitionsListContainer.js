import { connect } from 'react-redux'
import UnlockerEmployeeDefinitionsList   from '../../components/unlockers-management/UnlockerEmployeeDefinitionsList'
import { fetchUnlockerEmployeeDefinitions, clearUnlockerEmployeeDefinitions,
    saveUnlockerEmployeeDefinitions }  from '../../data/unlockers/Unlockers.actions'

const mapStateToProps = (state, ownProps) => {
    return {
        fetching: state.unlockers.unlockerEmployeeDefinitionsFetching,
        data: state.unlockers.unlockerEmployeeDefinitions,
        saved: state.unlockers.unlockerEmployeeDefinitionsSaved,
        saving: state.unlockers.unlockerEmployeeDefinitionsSaving
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clearData: () => dispatch(clearUnlockerEmployeeDefinitions()),
        fetchData: () => dispatch(fetchUnlockerEmployeeDefinitions(ownProps.params.type, ownProps.params.id)),
        saveData: (assignments) => dispatch(saveUnlockerEmployeeDefinitions(ownProps.params.type, ownProps.params.id, assignments))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnlockerEmployeeDefinitionsList)