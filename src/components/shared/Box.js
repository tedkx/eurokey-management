import React from 'react'
import PropTypes from 'prop-types'

class Box extends React.Component {
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

Box.propTypes = {
    className: PropTypes.string,
    footer: PropTypes.any,
    headerClassName: PropTypes.string,
    title: PropTypes.string
}

export default Box;