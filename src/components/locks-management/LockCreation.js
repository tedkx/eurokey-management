import React from 'react';
import CSSTransitionGroup   from 'react-transition-group/CSSTransitionGroup'

import LinearProgress from '../widgets/LinearProgress'

class Step1 extends React.Component {
    constructor(props) {
        super(props);
        console.log('step props', props);
    }
    render() {
        return (
            <div>
                <div className="form-group">
                    <label className="col-md-2 control-label">Ονομασία</label>
                    <div className="col-md-10">
                        <input type="text" placeholder="Ονομασία" name="title" className="form-control" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">Κατηγορία</label>
                    <div className="col-md-10">
                        <select className="form-control">
                            <option value="1">Διαχείριση Χρηματικού / Αξιών</option>
                            <option value="2">Είσοδος στο κατάστημα</option>
                            <option value="3">Θυρίδες</option>
                            <option value="4">Βοηθητικά</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

class Step2 extends React.Component { render() { return <div>Δημιουργία Κλειδιών</div> } } 
class Step3 extends React.Component { render() { return <div>Δημιουργία Συνδιασμών</div> } } 
class Step4 extends React.Component { render() { return <div>Ανάθεση</div> } } 

const steps = [
    { title: 'Δημιουργία Θέσης', component: Step1 },
    { title: 'Δημιουργία Κλειδιών', component: Step2 },
    { title: 'Δημιουργία Συνδιασμών', component: Step3 },
    { title: 'Ανάθεση σε καταστήματα', component: Step4 }
];

class LockCreation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIdx: 0
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
        this.setState({ stepIdx: this.state.stepIdx + 1 });
    }

    backtrack() {
        this.setState({ stepIdx: this.state.stepIdx - 1});
    }

    onDataChange(key, value) {
        this.data[key] = value;
    }

    onSubmit(e) {
        if(e && typeof e.preventDefault === 'function')
            e.preventDefault();
        console.log('submitted with data', this.data);
    }

    componentDidMount() {
        //setInterval(() => this.setState({ stepIdx: this.state.stepIdx >= steps.length - 1 ? 0 : this.state.stepIdx + 1 }), 2000);
    }

    render() {
        const currentStep = steps[this.state.stepIdx];
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="box">
                        <div className="box-heading ">
                            <div className="box-title mb">Δημιουργία Θέσης</div>
                            <p className="text-right">{ this.state.stepIdx + 1 } / { steps.length }</p>
                            <LinearProgress value={ 100 * (this.state.stepIdx + 1) / (steps.length) } />
                        </div>
                        <div className="box-body">
                            <form className="form-horizontal" action="/" onSubmit={ this.onSubmit.bind(this) }>
                                <CSSTransitionGroup
                                    transitionName="page-transition"
                                    transitionEnter={ true }
                                    transitionLeave={ false }
                                    transitionAppear= { true }
                                    transitionAppearTimeout={ 500 }
                                    transitionEnterTimeout={ 500 }>
                                    {
                                        <currentStep.component key={ this.state.stepIdx } onDataChange={ this.onDataChange.bind(this) } />
                                    }
                                </CSSTransitionGroup>
                            </form>
                        </div>
                        <div className="box-footer text-right">
                            {
                                this.state.stepIdx > 0
                                    ? <button type="button" className="btn btn-sm btn-raised btn-default pull-left" 
                                        onClick={ this.backtrack.bind(this) }>Προηγούμενο</button>
                                    : false
                            }
                            {
                                this.state.stepIdx == steps.length - 1
                                    ? <button type="submit" className="btn btn-sm btn-raised btn-primary" 
                                            onClick={ this.advance.bind(this) }>Ολοκλήρωση</button>
                                    : <button type="button" className="btn btn-sm btn-raised btn-primary" 
                                            onClick={ this.advance.bind(this) }>Επόμενο</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LockCreation;