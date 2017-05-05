import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Helper               from '../../lib/Helper';

const defaults = {
    collapsible: false,
    containerClassName: 'col-lg-4',
};

export const features = {

}

class Box extends Component {
    renderDropdown() {
        if(this.collapsible !== true && Helper.isNil(this.props.dropdownMenu))
            return false;
        return (
            <div className="dropdown pull-right">
                <a href="#" className="dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="false">
                    <i className="zmdi zmdi-more-vert"></i>
                </a>
                <ul className="dropdown-menu" role="menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li className="divider"></li>
                    <li><a href="#">Separated link</a></li>
                </ul>
            </div>
        );
    }

    render() {
         
        return (
            <div className={ this.props.containerClassName || defaults.containerClassName }>
                <div className="card-box">
                    { renderDropdown() }
                    { 
                        Helper.isNullOrWhitespace(this.props.title)
                            ? false
                            : <h4 className="header-title m-t-0">title</h4>
                    }
                    { this.props.children }
                </div>
            </div>
        );
    }
}

Box.propTypes = {
    collapsible: PropTypes.bool,
    containerClassName: PropTypes.string,
    dropdownMenu: PropTypes.any,
    title: PropTypes.string
}

export default Box;