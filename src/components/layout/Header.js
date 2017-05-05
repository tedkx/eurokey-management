import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: ''
        };
    }

    render() {
        let toogleCssClass = 'visible-xs visible-sm hidden-md' + 
            (this.props.sidebarVisible === true ? ' active' : '');

        let getSuggestionValue = function() { console.log('[Autosuggest] getSuggestionValue()', arguments)},
            inputProps = { 
                className: 'form-control',
                onChange: (ev, args) => this.setState({ searchTerm: args.newValue }), //args.method
                placeholder: 'Αναζήτηση',
                value: this.state.searchTerm
            };

        return (
            <header className="header-container">
                <nav>
                    <ul>
                        <li className={ toogleCssClass }>
                            <a href="" onClick={ this.props.onSidebarToggle } className="menu-link menu-link-slide"><span><em></em></span></a>
                        </li>
                    </ul>
                    <div className="app-search mda-form-control">
                        <Autosuggest 
                            getSuggestionValue={ item => `${item.type}-${item.code}` }
                            inputProps={ inputProps }
                            onSuggestionsFetchRequested={ this.props.onSearchTermChanged }
                            onSuggestionsClearRequested={ this.props.onClearSuggestions }
                            renderSuggestion={ suggestion => <div>{ suggestion.type}: { suggestion.code }</div> }
                            shouldRenderSuggestions={ value => (value || '').length >= 3 }
                            suggestions={ this.props.suggestions }
                            />
                        <i className="fa fa-search"></i>
                    </div>
                </nav>
            </header>
        );
    }
}

Header.propTypes = {
    onClearSuggestions: PropTypes.func,
    onSearchTermChanged: PropTypes.func,
    suggestions: PropTypes.array,
    suggestionsLoading: PropTypes.bool,
    suggestionsSearchTerm: PropTypes.string    
}

/*
<form role="search" className="navbar-left app-search pull-left hidden-xs">
    <input type="text" placeholder="Search..." className="form-control" />
    <a href=""><i className="fa fa-search"></i></a>
</form>
*/

export default Header;