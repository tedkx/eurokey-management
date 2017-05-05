import React, { Component } from 'react';

class Box extends Component {
    render() {
        return (
            <div className={ this.props.className }>
                <div className="box">
                    <div className={ 'box-heading ' + (this.props.headingClassName || '') }>
                        <div className="box-title">{ this.props.title }</div>
                    </div>
                    <div className="box-body">
                        { this.props.children }
                    </div>
                    <div className="box-footer">
                        { this.props.footer }
                    </div>
                </div>
            </div>
        );
    }
}

export default Box;