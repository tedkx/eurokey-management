import React from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'

import CSSTransitionGroup   from 'react-transition-group/CSSTransitionGroup'

import Spinner, { spinnerTypes } from '../shared/Spinner'
import Helper from '../../lib/Helper'

const denomValue = 300;

const defaults = {
    delay: 0,
    theme: 'cyan'
};
const themes = {
    cyan: { strokeColor: '#03A9F4' },
    purple: { strokeColor: '#ab47bc' },
    red: { strokeColor: '#e91e63' },
    green: { strokeColor: '#4caf50' }
}

class CircularProgress extends React.Component {
    constructor(props) {
        super(props);
        this.state = { springStyle: null };
        this.theme = themes[this.props.theme] || themes[defaults.theme];
        this.delay = typeof this.props.delay === 'number' && this.props.delay >= 0 ? this.props.delay : defaults.delay;

        Helper.bind(this, ['calculateSpringStyle', 'renderTemplate']);
    }

    calculateSpringStyle(props) {
        if(typeof props.value === 'number' && typeof props.totalValue === 'number') {
            setTimeout(() => {
                let targetValue = denomValue - (denomValue * props.value / props.totalValue);

                this.setState({
                    springStyle: {
                        from: { x: denomValue },
                        to: { x: spring(Math.round(targetValue * 100) / 100, { stiffness: 200, damping: 40, precision: 1 }) }
                    }
                });
            }, this.delay);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.delay != nextProps.delay && typeof nextProps.delay === 'number' && nextProps.delay >= 0)
            this.delay = nextProps.delay;

        if(this.props.value != nextProps.value)
            this.calculateSpringStyle(nextProps);
    }

    componentDidMount() {
        this.calculateSpringStyle(this.props);
    }

    renderTemplate(obj) {
        let loaded = !Helper.isNil(obj) && !Helper.isNil(obj.x) 
        return (
            <div className="circular-progress">
                <CSSTransitionGroup
                    transitionName="cubic-bezier-opacity"
                    transitionEnterTimeout={ 500 }
                    transitionLeaveTimeout={ 500 }
                    component="div">
                    {
                        loaded ? false : <Spinner type={ spinnerTypes.LineScale } />
                    }
                </CSSTransitionGroup>
                { 
                    loaded
                        ?   <div className="circular-progress-label">
                                { Math.round(this.props.totalValue - (obj.x * this.props.totalValue / denomValue)) }/{ this.props.totalValue }
                            </div>
                        :   false
                        
                }
                <svg viewBox="0 0 100 100">
                    <path d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94" stroke="#eee" strokeWidth="1" fillOpacity="0" />
                    <path d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94" stroke={ this.theme.strokeColor } strokeWidth="6" fillOpacity="0" 
                        style={ { strokeDasharray: `${denomValue}, ${denomValue}`, strokeDashoffset: loaded ? obj.x : denomValue } } />
                </svg>
            </div>
        );
    }

    render() {
        if(this.state.springStyle == null)
            return this.renderTemplate();


        return (
            <Motion defaultStyle={ this.state.springStyle.from } style={ this.state.springStyle.to }>
                {
                    this.renderTemplate
                }
            </Motion>
        );
    }
}

CircularProgress.propTypes = {
    delay: PropTypes.number,
    theme: PropTypes.string,
    totalValue: PropTypes.number,
    value: PropTypes.number
}

export default CircularProgress;