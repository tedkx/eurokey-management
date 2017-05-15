import React from 'react';
import CSSTransitionGroup   from 'react-transition-group/CSSTransitionGroup'

import LinearProgress from '../widgets/LinearProgress'

class Step1 extends React.Component {
    render() {
        return (
            <div>
                <div className="mda-form-group">
                    <div class="mda-form-control">
                        <input type="email" placeholder="mail@example.com" name="email" className="form-control" />
                        <div className="mda-form-control-line"></div>
                        <label className="control-label">Email Address *</label>
                    </div>
                    <div className="text-danger"></div>
                </div>
            </div>
        )
    }
}

class LockCreation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1
        };

        this.data = {
            lockName: null,
            lockSignificance: null,
            lockCategory: null,
            keys: [],
            combinations: [],
            branches: []
        }
    }

    advance() {

    }

    render() {
        return (
            <div className="box">
                <div className="box-heading ">
                    <div className="box-title">Grid</div>
                    <LinearProgress value="0" />
                </div>
                <div className="box-body">
                    <CSSTransitionGroup
                        transitionName="page-transition"
                        transitionEnter={ true }
                        transitionLeave={ false }
                        transitionAppear= { true }
                        transitionAppearTimeout={ 500 }
                        transitionEnterTimeout={ 500 }>
                        <section key={ key }>{ this.props.children }</section>
                    </CSSTransitionGroup>
                </div>
                <div className="box-footer">
                    <button type="button" className="btn btn-sm btn-raised btn-primary pull-right" onClick={ this.advance.bind(this) }>Επόμενο</button>
                </div>
            </div>
        );
    }
}

export default LockCreation;