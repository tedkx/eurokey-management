import React    from 'react';
import { Link, Redirect } from 'react-router'
import { Modal } from 'react-bootstrap'

import { history }  from '../../data/Store'
import LoaderOverlay from '../shared/LoaderOverlay'
import Helper   from '../../lib/Helper'
import Comparer from '../../lib/Comparer'
import DataGrid from '../grid/DataGrid'
import Card     from '../shared/Card'

const levels = {
    none: '',
    owner: 'Κλειδούχος',
    sub1: 'Αντικαταστάτης Α',
    sub2: 'Αντικαταστάτης Β'
}

const eventTypes = [
    { "id" : "key-loss", "title": "Απώλεια Κλειδιού" },
    { "id" : "custodian-sick", "title": "Ασθένεια Κλειδούχου" },
    { "id" : "custodian-leave", "title": "Απουσία Κλειδούχου" },
    { "id" : "key-replacement", "title": "Αντικατάσταση Κλειδιού" },
    { "id" : "combination-replacement", "title": "Αντικατάσταση Συνδιασμού" },
    { "id" : "key-corrupt", "title": "Φθορά Κλειδιού" },
    { "id" : "other", "title": "Άλλο" }
]

class UnlockerEmployeeAssignmentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            assignee: null,
            showModal: false,
            reason: '',
            eventTypeId: null
        };

        this.columnDefs = [
            { headerName: 'Όνομα', valueGetter: ({ data }) => `${data.lastName} ${data.firstName}` },
            { headerName: '', width: 50, cellRendererFramework: ({ data }) => (
                data.level === 'owner' ? <span className="label label-success">Κλειδούχος</span>
                    : data.level === 'sub1' || data.level === 'sub2' ? <span className="label label-warning">Αντικαταστάτης { data.level[3] }</span>
                    : false
                )
            }
        ];

        Helper.bind(this, ['fetch', 'save', 'onGridReady', 'onSearchTermChange', 'onRowClicked', 'onModalHide', 'eventTypeChange', 'reasonChange']);
    }

    onGridReady(params) {
        this.api = params.api;
        window.gridapi = params.api;
    }

    fetch(type, id) {
        setTimeout(() => this.props.fetchData(type, id));
    }

    save() {
        let datum = this.props.data.find(d => d.username === this.state.assignee);
        if(!datum.level && this.state.eventTypeId == null)
            this.setState({ showModal: true })
        else
            this.props.saveData(this.state.assignee, this.state.eventTypeId, this.state.reason);
    }

    onSearchTermChange(e) {
        this.setState({ searchTerm: e.target.value });
    }

    onRowClicked(params, args) {
        this.setState({ assignee: params.data.username });
    }

    onModalHide() {
        this.setState({ showModal: false });
    }

    eventTypeChange(e) {
        console.log('new even type value', e.target.value);
        this.setState({ eventTypeId: e.target.value });
    }

    reasonChange(e) {
        this.setState({ reason: e.target.value });
    }

    /* React component lifecycle methods */

    componentDidMount() {
        this.fetch(this.props.params.id);
    }

    componentWillUnmount() {
        console.log('assignment list unmounting');
        this.props.clearData();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.saved === true)
            return history.push('/unlockers');        

        if((!!nextProps.params.id && this.props.params.id != nextProps.params.id) || (!!nextProps.params.type && this.props.params.type != nextProps.params.type)) {
            this.props.clearData();
            return this.fetch(nextProps.params.next, nextProps.params.id);
        }
        
        if(Helper.isArray(nextProps.data) && !Comparer.equal(this.props.data, nextProps.data))
            this.setState({ data: nextProps.data.map(d => Object.assign({}, d, { originallyAssigned: d.assigned })) });
    }

    render() {
        if(this.props.saved)
            return false;
        
        let cannotCancel = this.props.saving,
            cannotSave = this.props.saving || this.state.assignee == null;

        let headingTemplate = <div className="input-group pull-right col-md-8">
                                <Link to={ '/unlockers' } disabled={ cannotCancel } className={ `btn btn-raised btn-danger pull-right btn-sm mr-sm pull-right ${cannotCancel ? 'disabled' : ''}` }>Ακύρωση</Link>
                                <input type="text" className="form-control input-sm pull-right mr-sm" style={ { maxWidth: '220px' } } value={ this.state.searchTerm } onChange={ this.onSearchTermChange } />
                                <label className="control-label mt-sm mr-sm pull-right">Αναζήτηση</label>
                            </div>;

        
        return (
            <div>
                <Card title="Ανάθεση" headingTemplate={ headingTemplate } loading={ this.props.fetching || this.props.saving } semi={ this.props.saving }>
                    <DataGrid selectable={ true } onGridReady={ this.onGridReady } columnDefs={ this.columnDefs } rowData={ this.props.data } onRowClicked={ this.onRowClicked } />
                    <div className="row mt">
                        <button className={ `btn btn-raised btn-primary pull-right btn-sm mr-sm ${cannotSave ? 'disabled' : ''}` }
                            type="button" disabled={ cannotSave } onClick={ this.save }>Αποθήκευση</button>
                    </div>
                </Card>

                <Modal animation={ true } className="fade-scale" show={ this.state.showModal }
                    onHide={ this.onModalHide } dialogClassName="custom-modal" style={ { top: '22%' } }>
                    <Modal.Header closeButton>
                        <Modal.Title>Εισαγωγή Συμβάντος</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <LoaderOverlay loading={ this.props.saving } semi={ true } />
                            <div className="row">
                                <div className="alert alert-warning mr-sm ml-sm">Πρέπει να καταχωρήσετε συμβάν</div>
                            </div>
                            <div className="row mb">
                                <div className="input-group col-md-12">
                                    <label className="control-label col-md-4">Τύπος Συμβάντος</label>
                                    <select className="font-control input-sm col-md-8" defaultValue={ "other" } onChange={ this.eventTypeChange }>
                                        { eventTypes.map(et => <option value={ et.id }>{ et.title }</option>) }                                        
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group col-md-12">
                                    <label className="control-label col-md-4">Τύπος Συμβάντος</label>
                                    <textarea rows="5" className="font-control input-sm col-md-8" value={ this.state.reason } onChange={ this.reasonChange } />
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
        );
    }
}

export default UnlockerEmployeeAssignmentList;