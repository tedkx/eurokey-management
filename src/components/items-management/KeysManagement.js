import React from 'react'
import { AgGridReact } from 'ag-grid-react'

const data = [
    { lock: 'Πόρτα', assigned: 'Σταθάς', dateAssigned: new Date() },
    { lock: 'Συναγερμός', assigned: 'Γιαννόπουλος', dateAssigned: new Date() },
    { lock: 'Κατάστημα', assigned: 'Καλαϊτζίδης', dateAssigned: new Date() },
    { lock: 'Χρηματοκιβώτιο', assigned: 'Σταθάς', dateAssigned: new Date() },
    { lock: 'Γραμματοκιβώτιο', assigned: 'Πάσσιος', dateAssigned: new Date() },
]

class KeysManagement extends React.Component {
    constructor(props) {
        super(props);

        this._columnDefs = [
            { headerName: 'Κλείδωμα', valueGetter: (params) => 'Κλειδι για ' + params.data.lock, width: 150 },
            { headerName: 'Ανατεθειμένο σε', field: 'assigned', width: 50 },
            { headerName: 'Ημερομηνία', valueGetter: (params) => params.data.dateAssigned.toString(), width: 150 }
        ]
    }

    gridReady(params) {
        this.api = params.api;
        this.columnApi = params.columnApi;

        setTimeout(() => this.api.sizeColumnsToFit(), 10)
    }

    render() {
        return (
            <div style={ { height: '600px' } } className="ag-blue ag-euro container-fluid">
                <AgGridReact onGridReady={ this.gridReady.bind(this) }
                    columnDefs={ this._columnDefs }
                    rowData={ data }
                    />
            </div>
        );
    }
}

export default KeysManagement;