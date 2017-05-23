import React                from 'react';

import { OverlayTrigger, Tooltip, Modal }   from 'react-bootstrap'
import { Link }             from 'react-router'

import { DEFAULT_TOOLTIP_PLACEMENT as ttplace }
                            from '../../lib/UiHelper'
import Card                 from '../shared/Card'
import CenteredOverlay      from '../shared/CenteredOverlay'
import DataGrid             from '../grid/DataGrid'

class ItemsManagement extends React.Component {
    constructor(props) {
        super(props);

        this.columnDefs = [
            { headerName: '', width: 70, cellClass: 'text-center', cellRendererFramework: ({ data }) => (
                <span className={ 'label label-' + (data.type == 'key' ? 'info' : 'warning') }>
                    { data.type == 'key' ? 'Κλειδι' : 'Συνδιασμός' }
                </span>
            )},
            //{ headerName: 'Ονομασία', field: 'title' },
            { headerName: 'Θέση', field: 'lockTitle' },
            { headerName: 'Κατηγορία', valueGetter: ({ data }) => data.typeId == 'main' ? 'Κύριο' : data.typeId == 'secondary' ? 'Δευτερεύον' : 'Κανονικό' },
            { headerName: 'Ανατ/μένο Σε', headerClass: 'text-right', cellClass: 'text-right pr-sm', valueGetter: ({ data }) => `${data.assigneeLastName} ${data.assigneeFirstName}` },
            { headerName: '', width: 60, cellRendererFramework: ({ data }) => (
                    <div>
                        <i className={ 'mr-sm blue fa fa-' + (data.assigneeRole === 'vault' ? 'university' : 'user')} />
                        {
                            data.level === 'owner' ? <span className="label label-success">Κλειδούχος</span>
                                    : data.level === 'sub1' || data.level === 'sub2' ? <span className="label label-warning">Αντικαταστάτης { data.level[3] }</span>
                                    : <span className="label label-danger">Έκτακτος</span>
                        }
                    </div>
            )},
            {
                headerName: '',
                cellClass: 'pt0 text-right',
                width: 80,
                cellRendererFramework: ({ data }) => ['manager', 'assistant-manager', 'supervisor' ].indexOf(this.props.role) >= 0 ? (
                        <div>
                            <OverlayTrigger placement={ ttplace } overlay={ <Tooltip id={ `assign-${data.id}-tooltip` }>Ανάθεση</Tooltip> }>
                                <Link to={ `/unlockers/assign/${data.type}/${data.id}` } className="btn btn-primary btn-raised btn-sm">
                                    <i className="fa fa-share" />
                                </Link>
                            </OverlayTrigger>
                            <OverlayTrigger placement={ ttplace } overlay={ <Tooltip id={ `assign-${data.id}-tooltip` }>Ορισμός Κλειδούχων</Tooltip> }>
                                <Link to={ `/unlockers/define/${data.type}/${data.id}` } className="btn btn-default btn-raised btn-sm ml-sm">
                                    <i className="fa fa-list" />
                                </Link>
                            </OverlayTrigger>
                        </div>
                    )
                    : false
            }
        ]
    }

    componentDidMount() {
        this.props.fetchData();
    }

    componentWillUnmount() {
        this.props.clearData();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location.pathname != nextProps.location.pathname && (this.props.saved || nextProps.saved)) {
            this.props.clearData();
            setTimeout(() => this.props.fetchData());
        }
    }

    render() {
        let assigning = this.props.location.pathname.match(/\/unlockers\/(assign|define)/) != null,
            unlocker = (assigning ? (this.props.unlockers || []).find(ul => ul.id == this.props.params.id && ul.type == this.props.params.type) : {}) || {};
        
        return (
            <div className="container-fluid">
                <div className="row">
                    <Card title="Ανάθεση Κλειδιών" className={ 'width-transition ' + (assigning ? ' col-md-4' : 'col-md-12') }
                        loading={ this.props.fetching }>
                        <CenteredOverlay visible={ assigning } width="75%">
                             <h1 className="text-center"><i className={ 'fa fa-' + (unlocker.type == 'combination' ? 'calculator' : 'key') } /></h1>
                            <div className="text-center">
                                { unlocker.type == 'key' ? 'Κλειδί' : 'Συνδιασμός' } για <h4>{ unlocker.lockTitle }</h4>
                            </div>
                        </CenteredOverlay>
                        <DataGrid columnDefs={ this.columnDefs }
                            rowData={ this.props.unlockers }>
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

export default ItemsManagement;