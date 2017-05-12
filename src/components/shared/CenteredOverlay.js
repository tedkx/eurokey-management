import React from 'react';

class CenteredOverlay extends React.Component {
    render() {
        return (
            <div className={ 'absolute-overlay' + (this.props.visible ? ' visible' : '' ) }>
                { this.props.children }
            </div>
        );
    }
}

export default CenteredOverlay