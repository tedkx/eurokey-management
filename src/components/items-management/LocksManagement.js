import React from 'react';

//import { Switch, Route, Link } from 'react-router-dom'
import { Route, Link }  from 'react-router'

import CenteredOverlay  from '../shared/CenteredOverlay'
import DataGrid         from '../grid/DataGrid'

class LocksManagement extends React.Component {
    constructor(props) {
        super(props);

        console.log('lm props', this.props);

        this.columnDefs = [
            { headerName: 'Ονομασία', field: 'title' },
            { headerName: 'Κατηγορία', valueGetter: (params) => params.data.category && params.data.category.title || '' },
            { headerName: 'Τύπος', valueGetter: (params) => params.data.significance.title },
            {
                headerName: '',
                cellClass: 'pt0 text-right',
                width: 75,
                cellRendererFramework: (params) => (
                    <div>
                        <Link to={ `/locks/assign/${params.data.id}` } className="btn btn-primary btn-raised btn-sm">
                            <i className="fa fa-share" />
                        </Link>
                        <button type="button" className="btn btn-danger btn-raised btn-sm ml-sm">
                            <i className="fa fa-remove" />
                        </button>
                    </div>
                )
            }
        ]
    }
    
    componentWiiReceiveProp() {
        this.setState({ current: !this.state.current });
    }

    componentDidMount() {
        this.props.onMount();
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    render() {
        let assigning = this.props.location.pathname.match(/\/locks\/assign/) != null;
        return (
            <div className="container-fluid">
                <div className="row">
                    <h4 className="page-title">
                        <Link to="/lock/create" className="btn btn-sm btn-raised btn-primary pull-right">Δημιουργία Κλειδαριάς</Link>
                        Διαχείριση Θέσεων / Κλειδαριών
                    </h4>
                </div>
                <div className="row">
                    <DataGrid columnDefs={ this.columnDefs }
                        rowData={ this.props.locks }
                        loading={ this.props.fetching }
                        className={ 'locks-grid' + (assigning ? ' col-md-4' : 'col-md-12') }>
                        <CenteredOverlay visible={ assigning } />
                    </DataGrid>
                    
                    <div className="col-md-8">
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}

export default LocksManagement;

