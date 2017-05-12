import React, { Component } from 'react'
import CSSTransitionGroup   from 'react-transition-group/CSSTransitionGroup'

import Helper               from '../../lib/Helper' 

class Main extends Component {
    render() {
        let key = this.props.location ? Helper.getSubstringUntilNth(this.props.location.pathname, '/', 2) : '';

        return (
            <CSSTransitionGroup
                transitionName="page-transition"
                transitionEnter={ true }
                transitionLeave={ false }
                transitionAppear= { true }
                transitionAppearTimeout={ 500 }
                transitionEnterTimeout={ 500 }
                component="main"
                className="main-container">
                <section key={ key }>{ this.props.children }</section>
            </CSSTransitionGroup>
        );
    }
}

export default Main;