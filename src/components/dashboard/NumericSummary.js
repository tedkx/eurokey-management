import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import CSSTransitionGroup   from 'react-transition-group/CSSTransitionGroup'

import SummaryBox           from './SummaryBox';

class NumericSummary extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.title != nextProps.title || 
            this.props.value != nextProps.value;
    }

    render() {
        let display = <CSSTransitionGroup
            transitionName="cubic-bezier-opacity"
            transitionEnterTimeout={ 500 }
            transitionLeaveTimeout={ 500 }
            component="div">
            {
                this.props.value != null ? <span className={ 'badge badge-60 ' + (this.props.colorClassName || 'bg-info') }>{ this.props.value }</span> : false
            }
        </CSSTransitionGroup>
        return (
            <SummaryBox { ...this.props } display={ display }>
                { this.props.title }
            </SummaryBox>
        );
    }
}

NumericSummary.propTypes = {
    colorClassName: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.number
}

export default NumericSummary;