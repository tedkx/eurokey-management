import React        from 'react';
import { Switch, Route, Link }        from 'react-router-dom'

import DataGrid     from '../grid/DataGrid'

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

class KeysList extends React.Component {
    componentDidMount() {
        this.props.onMount();
    }

    componentWillUnmount() {
        this.props.onUnmount()
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <h4 className="page-title">Διαχείριση Κλειδιών</h4>
                </div>
                <div className="row">
                    <DataGrid columnDefs={ this.columnDefs }
                        rowData={ this.props.keyTypes }
                        loading={ this.props.fetching }
                        />
                </div>

                <Link to="/assign">/Assign</Link>
                <Link to="/keys/assign">/KeyTypes/Assign</Link>
                <Link to="/design">/Design</Link>
                <Link to="/keys/design">/KeyTypes/Design</Link>

                <Switch>
                    <Route path="/assign" component={ Asdf } />
                    <Route path="/design" component={ Qwer } />
                </Switch>
            </div>
        );
    }
}

export default KeyTypesList;