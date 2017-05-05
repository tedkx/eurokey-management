import React, { Component } from 'react';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup' // ES6

class Main extends Component {
    render() {
        return (
            <main className="main-container">
                <CSSTransitionGroup  transitionName="cubic-bezier-opacity"
                    transitionEnterTimeout={500} transitionLeaveTimeout={300}
                    component="section">
                    { this.props.children }
                </CSSTransitionGroup>
            </main>
        );
    }
}

export default Main;