import React from 'react';

import { Switch, Route, Link } from 'react-router-dom'

import DataGrid from '../grid/DataGrid'


class Asdf extends React.Component{
    render() {
        return <div>ASDF</div>
    }
}
class Qwer extends React.Component{
    render() {
        return <div>Qwer</div>
    }
}
class Zxcv extends React.Component{
    render() {
        return <div>Zxcv</div>
    }
}

class LocksManagement extends React.Component {
    constructor(props) {
        super(props);

        this.columnDefs = [
            { headerName: 'Ονομασία', field: 'title' },
            { headerName: 'Κατηγορία', valueGetter: (params) => params.data.category && params.data.category.title || '' },
            { headerName: 'Τύπος', valueGetter: (params) => params.data.significance.title }
        ]
    }
    
    componentWiiReceiveProp() {
        this.setState({ current: !this.state.current });
    }

    componentDidMount() {
        console.log('locks mounted', this.props);
        this.props.onMount();
    }

    componentWillUnmount() {
        this.props.onUnmount();
        console.log('locks UNmounted');
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <h4 className="page-title">Διαχείριση Κλειδιών</h4>
                </div>
                <div className="row">
                    <DataGrid columnDefs={ this.columnDefs }
                        rowData={ this.props.locks }
                        loading={ this.props.fetching }
                        style={ { width: '100%' } }
                        />
                </div>

                <div className="card">
                    <Switch>
                        <Route exact path="/locks" component={ Asdf } />
                        <Route exact path="/locks/assign" component={ Zxcv } children={ <div>zxcv</div> } />
                        <Route path="/locks/design" component={ Qwer } />
                    </Switch>
                </div>

                <Link to="/locks/assign" onClick={ () => this.setState({ current: 'assign' }) }>/KeyTypes/Assign</Link>
                <br />
                <Link to="/locks/design" onClick={ () => this.setState({ current: 'design' }) }>/KeyTypes/Design</Link>
            </div>
        );
    }
}

export default LocksManagement;

