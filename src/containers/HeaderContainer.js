import { connect }  from 'react-redux'

import Header       from '../components/layout/Header'
import { suggest, clearSuggestions } 
                    from '../data/app/App.actions';

const mapStateToProps = (state, ownProps) => {
    return {
        suggestions: state.app.suggestions,
        suggestionsLoading: state.app.suggestionsLoading,
        suggestionsSearchTerm: state.app.suggestionsSearchTerm
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClearSuggestions: () => dispatch(clearSuggestions()),
        onSearchTermChanged: (text) => dispatch(suggest(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)