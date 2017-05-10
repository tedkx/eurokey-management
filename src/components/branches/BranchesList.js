import React from 'react';

class BranchesList extends React.Component {
    constructor(props) {
        super(props);

        this.columnDefs = [
            { headerName: 'Ονομασία', field: 'title' },
            { headerName: 'asdf', }
        ]
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <h4 className="page-title">Διαμόρφωση Καταστημάτων</h4>
                </div>
                <div className="row">
                    <DataGrid onGridReady={ this.gridReady.bind(this) }
                        enableSorting={ true }
                        columnDefs={ this.columnDefs }
                        rowData={ data }
                        loading={ this.state.loading }
                        />
                </div>
            </div>
        );
    }
}

export default BranchesList;