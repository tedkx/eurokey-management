import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import SummaryBox           from './SummaryBox';

class NumericSummary extends Component {
    render() {
        var display = <span className={ 'badge badge-60 ' + (this.props.colorClassName || 'bg-info') }>{ this.props.value }</span>;
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