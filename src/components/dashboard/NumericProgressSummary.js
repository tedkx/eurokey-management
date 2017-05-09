import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import SummaryBox           from './SummaryBox';
import CircularProgress     from '../widgets/CircularProgress'

class NumericProgressSummary extends Component {
    render() {
        var display = <CircularProgress { ...this.props } />
        return (
            <SummaryBox { ...this.props } display={ display }>
                { this.props.title }
            </SummaryBox>
        );
    }
}

NumericProgressSummary.propTypes = {
    delay: PropTypes.number,
    theme: PropTypes.string,
    title: PropTypes.string,
    totalValue: PropTypes.number,
    value: PropTypes.number
}

export default NumericProgressSummary;