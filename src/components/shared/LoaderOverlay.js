import React                from 'react'
import PropTypes            from 'prop-types'
import CSSTransitionGroup   from 'react-transition-group/CSSTransitionGroup'

import Spinner, { spinnerTypes }
                            from '../shared/Spinner'

class LoaderOverlay extends React.Component {
    render() {
        let component = this.props.component || 'div'

        return (
            <CSSTransitionGroup
                transitionName={ this.props.semi ? 'cubic-bezier-opacity-semi' : 'cubic-bezier-opacity' }
                transitionAppear= { true }
                transitionAppearTimeout={ 500 }
                transitionEnterTimeout={ 500 }
                transitionLeaveTimeout={ 500 }
                component={ component }>
                {
                    this.props.loading === true
                        ? (
                            <div className={ 'loader' + (this.props.semi === true ? ' semi' : '') }>
                                <Spinner type={ spinnerTypes.Ripple } />
                            </div>
                        )
                        : false
                }
            </CSSTransitionGroup>
        );
    }
}

LoaderOverlay.propTypes = {
    component: PropTypes.string,
    loading: PropTypes.bool
}

export default LoaderOverlay