import React from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'

const denomValue = 300;

const defaults = {
    delay: 0,
    theme: 'cyan'
};
const themes = {
    cyan: { strokeColor: '#03A9F4' },
    purple: { strokeColor: '#ab47bc' }
}

class CircularProgress extends React.Component {
    constructor(props) {
        super(props);
        this.state = { started: false }
        this.theme = themes[this.props.theme] || themes[defaults.theme];

        this.calculateSpringStyle = this.calculateSpringStyle.bind(this);

        this.calculateSpringStyle(props);
    }

    calculateSpringStyle(props) {
        console.log(props);
        if(typeof props.value === 'number' && typeof props.totalValue === 'number') {
            let targetValue = denomValue * props.value / props.totalValue;

            this.springStyle = {
                from: { x: 0 },
                to: { x: spring(Math.round(targetValue * 100) / 100, { stiffness: 150, damping: 40, precision: 0.01 }) }
            };

            console.log('calculated spring style', this.springStyle.to);
        } else {
            this.springStyle = null;
            console.log('calculated spring style null');
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('received props', nextProps);
        this.calculateSpringStyle(nextProps);
    }

    componentDidMount() {
        setTimeout(this.setState({ started: true }), 
            typeof this.props.delay === 'number' && this.props.delay >= 0 ? this.props.delay : defaults.delay
        );
    }

    render() {
        if(!this.state.started || this.springStyle == null)
            return false;

        return (
            <Motion defaultStyle={ this.springStyle.from } style={ this.springStyle.to }>
                {
                    ({ x }) => (
                        <div style={ { width: '80px', height: '80px' } }>
                            <span style={ { whiteSpace: 'nowrap' }}>{ x }</span>
                            <svg viewBox="0 0 100 100">
                                <path d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94" stroke="#eee" strokeWidth="1" fillOpacity="0" />
                                <path d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94" stroke={ this.theme.strokeColor } strokeWidth="6" fillOpacity="0" 
                                    style={ { strokeDasharray: `${denomValue}, ${denomValue}`, strokeDashoffset: x } } />
                            </svg>
                        </div>
                    )
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