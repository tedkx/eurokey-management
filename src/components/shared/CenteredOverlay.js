import React from 'react';

class CenteredOverlay extends React.Component {
    render() {
        return (
            <div className={ 'absolute-overlay' + (this.props.visible ? ' visible' : '' ) }>
                <div className="absolute-overlay-child" style={ { width: this.props.width || "85%" } }>
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default CenteredOverlay