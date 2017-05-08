import React                from 'react'
import PropTypes            from 'prop-types'
import CSSTransitionGroup   from 'react-transition-group/CSSTransitionGroup'

import RippleLoader         from '../shared/RippleLoader'

class LoaderOverlay extends React.Component {
    render() {
        let component = this.props.component || 'div'

        return (
            <CSSTransitionGroup
                transitionName="cubic-bezier-opacity"
                transitionAppear= { true }
                transitionAppearTimeout={ 500 }
                transitionEnterTimeout={ 500 }
                transitionLeaveTimeout={ 500 }
                component={ component }>
                {
                    this.props.loading === true
                        ? (
                            <div className="loader">
                                <RippleLoader />
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