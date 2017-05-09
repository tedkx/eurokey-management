import React, { Component } from 'react';
import PropTypes            from 'prop-types';

const defaults = {
    containerClassName: 'col-xs-6 col-lg-3'
}

class SummaryBox extends Component {
    render() {
        return (
            <div className={ (this.props.containerClassName || defaults.containerClassName) + ' summary-box' }>
                <div className="card">
                    <div className="card-body pv">
                        <div className="clearfix">
                            <div className="pull-left summary-title">
                                { this.props.children }
                            </div>
                            <div className="pull-right">
                                { this.props.display }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SummaryBox.propTypes = {
    containerClassName: PropTypes.string,
    display: PropTypes.any
}

export default SummaryBox;