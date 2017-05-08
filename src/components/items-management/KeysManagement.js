import React            from 'react'
import { AgGridReact }  from 'ag-grid-react'

import DataGrid         from '../grid/DataGrid'

let data = null
setTimeout(() => {
    data = [
        { lock: 'Πόρτα', assigned: 'Σταθάς', dateAssigned: new Date() },
        { lock: 'Συναγερμός', assigned: 'Γιαννόπουλος', dateAssigned: new Date() },
        { lock: 'Κατάστημα', assigned: 'Καλαϊτζίδης', dateAssigned: new Date() },
        { lock: 'Χρηματοκιβώτιο', assigned: 'Σταθάς', dateAssigned: new Date() },
        { lock: 'Γραμματοκιβώτιο', assigned: 'Πάσσιος', dateAssigned: new Date() },
    ];
}, 1200);

class KeysManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
        this._columnDefs = [
            { headerName: 'Κλείδωμα', valueGetter: (params) => 'Κλειδι για ' + params.data.lock, width: 150 },
            { headerName: 'Ανατεθειμένο σε', field: 'assigned', width: 50 },
            { headerName: 'Ημερομηνία', valueGetter: (params) => params.data.dateAssigned.toString(), width: 150 }
        ]
    }

    gridReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
    }

    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 3000);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <h4 className="page-title">Διαχείριση Κλειδιών</h4>
                </div>
                <div className="row">
                    <DataGrid onGridReady={ this.gridReady.bind(this) }
                        enableSorting={ true }
                        columnDefs={ this._columnDefs }
                        rowData={ data }
                        loading={ data == null }
                        />
                </div>
            </div>
        );
    }
}

export default KeysManagement;