import React from 'react'
import PropTypes from 'prop-types'

export const spinnerTypes = {
    LineScale: 'LineScale',
    Pacman: 'Pacman',
    Ripple: 'Ripple'
}

const spinnerData = {
    [spinnerTypes.LineScale]: { className: 'line-scale', numOfChildren: 5 },
    [spinnerTypes.Pacman]: { className: 'pacman', numOfChildren: 5 },
    [spinnerTypes.Ripple]: { className: 'ball-scale-ripple-multiple', numOfChildren: 3 },
}

const defaultSpinnerType = spinnerTypes.Ripple;

class Spinner extends React.Component {
    render() {
        let spinnerType = spinnerTypes[this.props.type] || spinnerTypes[defaultSpinnerType],
            data = spinnerData[spinnerType];
        return (
            <div className={ 'loader-inner ' + data.className }>
                { Array.from(Array(data.numOfChildren).keys()).map(k => <div key={ k } /> ) }
            </div>
        );
    }
}

Spinner.propTypes = {
    type: PropTypes.string
}

export default Spinner;