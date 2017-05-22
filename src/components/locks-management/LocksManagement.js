import React            from 'react';

import { Link }         from 'react-router'

import Card             from '../shared/Card'
import CenteredOverlay  from '../shared/CenteredOverlay'
import DataGrid         from '../grid/DataGrid'
import AuthHelper       from '../../lib/AuthHelper'

class LocksManagement extends React.Component {
    constructor(props) {
        super(props);

        let role = AuthHelper.getUser().role,
            actionsCount = role === 'security' ? 2 : 1;

        this.columnDefs = [
            { headerName: 'Ονομασία', field: 'title' },
            { headerName: 'Κατηγορία', valueGetter: (params) => params.data.category && params.data.category.title || '' },
            { headerName: 'Τύπος', valueGetter: (params) => params.data.significance.title },
            {
                headerName: '',
                cellClass: 'pt0 text-right',
                width: 42 * actionsCount - 8,
                cellRendererFramework: (params) => role === 'security' ? (
                        <div>
                            <Link to={ `/locks/assign/${params.data.id}` } className="btn btn-primary btn-raised btn-sm">
                                <i className="fa fa-share" />
                            </Link>
                            <button type="button" title="Διαγραφή" className="btn btn-danger btn-raised btn-sm ml-sm">
                                <i className="fa fa-remove" />
                            </button>
                        </div>
                    )
                    : (
                        <div>
                            <Link to={ `/locks/${params.data.id}` } title="Προβολή" className="btn btn-default btn-raised btn-sm">
                                <i className="fa fa-info" />
                            </Link>
                        </div>
                    )
            }
        ]
    }
    
    componentDidMount() {
        this.props.onMount();
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    render() {
        let assigning = this.props.location.pathname.match(/\/locks\/assign/) != null,
            headingTemplate = AuthHelper.getUser().role === 'security'
                ? <Link to="/lock/create" className="btn btn-sm btn-raised btn-primary pull-right">Δημιουργία Κλειδαριάς</Link>
                : false;
        return (
            <div className="container-fluid">
                <div className="row">
                    <Card title="Διαχείριση Θέσεων / Κλειδαριών" className={ 'width-transition ' + (assigning ? ' col-md-4' : 'col-md-12') }
                        headingTemplate={ headingTemplate }
                        loading={ this.props.fetching }>
                        <DataGrid columnDefs={ this.columnDefs }
                            rowData={ this.props.locks }>
                            <CenteredOverlay visible={ assigning } />
                        </DataGrid>
                    </Card>
                    
                    <div className="col-md-8">
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}

export default LocksManagement;

