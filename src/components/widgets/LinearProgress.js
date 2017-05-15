import React, { Component } from 'react';

const defaults = {
    value: 100,
    type: 'info' //warning, danger, success
}
class LinearProgress extends Component {
    render() {
        return (
            <div className="progress-xs m0 progress" value={ this.props.value } type="info">
                <div className={ 'progress-bar progress-bar-' + this.props.type } role="progressbar" 
                    aria-valuenow={ this.props.value } aria-valuemin="0" aria-valuemax="100" aria-valuetext={ this.props.value + '%' } 
                    aria-labelledby="progressbar" style={ { width: this.props.value + '%' } }></div>
            </div>
        );
    }
}

export default LinearProgress;