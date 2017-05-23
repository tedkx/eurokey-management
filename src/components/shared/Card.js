import React from 'react'

import LoaderOverlay    from './LoaderOverlay'
import Helper   from '../../lib/Helper'

class Box extends React.Component {
    render() {
        return (
            <div className={ this.props.className }>
                <div className="card">
                    <LoaderOverlay loading={ this.props.loading } semi={ this.props.semi === true } />
                    <div className={ 'card-heading ' + (this.props.headingClassName || '') }>
                        { this.props.headingTemplate }
                        <div className="card-title">{ this.props.title }</div>
                        { Helper.isNullOrWhitespace(this.props.subtitle) ? false : <small>{this.props.subtitle }</small> }
                    </div>
                    <div className="card-body">
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}

export default Box;