import React            from 'react';

import { Link }         from 'react-router'
import { OverlayTrigger, Tooltip }      
                        from 'react-bootstrap'

import { DEFAULT_TOOLTIP_PLACEMENT as ttplace }
                        from '../../lib/UiHelper'
import Card             from '../shared/Card'
import CenteredOverlay  from '../shared/CenteredOverlay'
import DataGrid         from '../grid/DataGrid'
import AuthHelper       from '../../lib/AuthHelper'

class LocksManagement extends React.Component {
    constructor(props) {
        super(props);

        let buttonColWidth = 23 * (this.props.role === 'security' ? 3 : 1) - 8

        this.columnDefs = [
            { headerName: 'Ονομασία', field: 'title' },
            { headerName: 'Κατηγορία', valueGetter: ({ data }) => data.category && data.category.title || '' },
            { headerName: '', cellClass: 'text-center', width: 70, cellRendererFramework: ({ data }) => (
                <span className={ 'label label-' + (data.significance.id == 'main' ? 'warning' : data.significance.id == 'secondary' ? 'default' : 'info') }>
                    { data.significance.title || 'Κανονική' }
                </span>
            )},
            {
                headerName: '',
                cellClass: 'pt0 text-right',
                width: buttonColWidth,
                minWidth: buttonColWidth,
                cellRendererFramework: ({ data }) => (
                        <div>
                            {
                                this.props.role === 'security' ? (
                                        <OverlayTrigger placement={ ttplace } overlay={ <Tooltip id={ `lock-assign-${data.id}-tooltip` }>Ανάθεση</Tooltip> }>
                                            <Link to={ `/locks/assign/${data.id}` } className="btn btn-primary btn-raised btn-xs mr-sm">
                                                <i className="fa fa-share" />
                                            </Link>
                                        </OverlayTrigger>
                                    )
                                    : false
                            }
                           
                            <OverlayTrigger placement={ ttplace } overlay={ <Tooltip id={ `lock-view-${data.id}-tooltip` }>Προβολή</Tooltip> }>
                                <Link to={ `/locks/${data.id}` } title="Προβολή" className="btn btn-default btn-raised btn-xs bg-blue-gray-50">
                                    &nbsp;<i className="fa fa-info" />&nbsp;
                                </Link>
                            </OverlayTrigger>
                            {
                                this.props.role === 'security' ? (
                                        <OverlayTrigger placement={ ttplace } overlay={ <Tooltip id={ `lock-delete-${data.id}-tooltip` }>Διαγραφή</Tooltip> }>
                                            <button type="button" title="Διαγραφή" className="btn btn-danger btn-raised btn-xs ml-sm">
                                                <i className="fa fa-remove" />
                                            </button>
                                        </OverlayTrigger>
                                    )
                                    : false
                            }
                            
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
            headingTemplate = this.props.role === 'security'
                ? <Link to="/lock/create" className="btn btn-sm btn-raised btn-primary pull-right">Δημιουργία Κλειδαριάς</Link>
                : false,
            lock = assigning ? (this.props.locks.find(l => l.id ==this.props.params.id) || {}) : {};
        return (
            <div className="container-fluid">
                <div className="row">
                    <Card title="Διαχείριση Θέσεων / Κλειδαριών" className={ 'width-transition ' + (assigning ? ' col-md-4' : 'col-md-12') }
                        headingTemplate={ headingTemplate } loading={ this.props.fetching }>
                        <CenteredOverlay visible={ assigning } width="75%">
                            <h1 className="text-center"><i className="fa fa-lock" /></h1>
                            <div className="text-center"><h4>{ lock.title }</h4></div>                            
                        </CenteredOverlay>
                        <DataGrid columnDefs={ this.columnDefs } rowData={ this.props.locks } />
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

