import React from 'react';
import { Link } from 'react-router'
import { OverlayTrigger, Tooltip, Modal } from 'react-bootstrap'

import { DEFAULT_TOOLTIP_PLACEMENT as ttplace } from '../../lib/UiHelper'
import DateHelper from '../../lib/DateHelper'
import DataGrid from '../grid/DataGrid'
import Card from '../shared/Card'
import LoaderOverlay from '../shared/LoaderOverlay'

const eventTypes = [
    { "id" : "key-loss", "title": "Απώλεια Κλειδιού" },
    { "id" : "custodian-sick", "title": "Ασθένεια Κλειδούχου" },
    { "id" : "custodian-leave", "title": "Απουσία Κλειδούχου" },
    { "id" : "key-replacement", "title": "Αντικατάσταση Κλειδιού" },
    { "id" : "combination-replacement", "title": "Αντικατάσταση Συνδιασμού" },
    { "id" : "key-corrupt", "title": "Φθορά Κλειδιού" },
    { "id" : "other", "title": "Άλλο" }
]

class EmployeeDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = { showModal: false };

        this.myUnlockersColumnDefs = [
            { headerName: '', width: 70, cellClass: 'text-center', cellRendererFramework: ({ data }) => (
                <span className={ 'label label-' + (data.type == 'key' ? 'info' : 'warning') }>
                    { data.type == 'key' ? 'Κλειδι' : 'Συνδιασμός' }
                </span>
            )},
            { headerName: 'Θέση', field: 'lockTitle' },
            {
                headerName: '',
                cellClass: 'pt0 text-right',
                width: 40,
                cellRendererFramework: ({ data }) => (
                        <div>
                            <OverlayTrigger placement={ ttplace } overlay={ <Tooltip id={ `unlocker-${data.id}-tooltip` }>Ανάθεση</Tooltip> }>
                                <button className="btn btn-primary btn-raised btn-sm"><i className="fa fa-share" onClick={ () => this.buttonClicked(data.type, data.id) } /></button>
                            </OverlayTrigger>
                        </div>
                    )
            }
        ];
        this.myPendingAcceptancesColumnDefs = [
            { headerName: '', width: 70, cellClass: 'text-center', cellRendererFramework: ({ data }) => (
                <span className={ 'label label-' + (data.type == 'key' ? 'info' : 'warning') }>
                    { data.type == 'key' ? 'Κλειδι' : 'Συνδιασμός' }
                </span>
            )},
            { headerName: 'Θέση', field: 'lockTitle' },
            { headerName: 'Ημ/νία Ανάθεσης', valueGetter: ({ data}) => DateHelper.toDateString(data.assignDate) },
            {
                headerName: '',
                cellClass: 'pt0 text-right',
                width: 40,
                cellRendererFramework: ({ data }) => (
                        <div>
                            <OverlayTrigger placement={ ttplace } overlay={ <Tooltip id={ `unlocker-accept-${data.id}-tooltip` }>Αποδοχή</Tooltip> }>
                                <button type="button" className="btn btn-primary btn-raised btn-sm"><i className="fa fa-check" /></button>
                            </OverlayTrigger>
                        </div>
                    )
            }
        ];

        this.employeesForAssignmentColumnDefs = [
            { headerName: 'Όνομα', valueGetter: ({ data }) => `${data.lastName} ${data.firstName}` },
            { headerName: '', width: 50, cellRendererFramework: ({ data }) => (
                data.level === 'owner' ? <span className="label label-success">Κλειδούχος</span>
                    : data.level === 'sub1' || data.level === 'sub2' ? <span className="label label-warning">Αντικαταστάτης { data.level[3] }</span>
                    : false
                )
            }
        ];

        this.onModalHide = this.onModalHide.bind(this);
        this.buttonClicked = this.buttonClicked.bind(this);
    }

    buttonClicked(type, id) {
        this.props.fetchEmployeesForAssignment(type, id);
        this.setState({ showModal: true});
    }

    onModalHide() {
        this.setState({ showModal: false });
    }

    save() {

    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <Card className="col-xs-12 col-md-5" title="Τα Κλειδιά Μου" loading={ this.props.fetching }
                            heading-right={ <Link to="/my-unlockers" className="btn btn-sm btn-raised btn-primary pull-right">Προβολή Όλων</Link> }>
                        <DataGrid columnDefs={ this.myUnlockersColumnDefs }
                            rowData={ this.props.myUnlockers }>
                        </DataGrid>
                    </Card>

                    <Card className="col-xs-12 col-md-7" title="Προς Αποδοχή" loading={ this.props.fetching }>
                        <DataGrid columnDefs={ this.myPendingAcceptancesColumnDefs }
                            rowData={ this.props.myPendingAcceptances }>
                        </DataGrid>
                    </Card>
                </div>

                <Modal animation={ true } className="fade-scale" show={ this.state.showModal }
                        onHide={ this.onModalHide } dialogClassName="custom-modal" style={ { top: '22%' } }>
                    <Modal.Header closeButton>
                        <Modal.Title>Ανάθεση</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <LoaderOverlay loading={ this.props.employeesForAssignmentFetching } semi={ true } />
                            <div className="row mb">
                                <div className="input-group col-md-12">
                                    <DataGrid selectable={ true } columnDefs={ this.employeesForAssignmentColumnDefs } rowData={ this.props.employeesForAssignment } loading={ this.props.employeesForAssignmentFetching } />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className={ 'btn btn-default btn-sm pull-right' + (this.state.saving ? ' disabled' : '') } onClick={ this.onModalHide } disabled={ this.state.saving }>Ακύρωση</button>
                        <button type="button" className={ 'btn btn-primary btn-sm pull-right mr-sm' + (this.state.saving ? ' disabled' : '') } onClick={ this.save } disabled={ this.state.saving }>Ανάθεση</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default EmployeeDashboard;