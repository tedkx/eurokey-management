import React from 'react';

import DataGrid from '../grid/DataGrid'

class BranchesList extends React.Component {
    constructor(props) {
        super(props);

        this.columnDefs = [
            { headerName: 'Ονομασία', field: 'title' },
            { headerName: 'Παραμετροποίηση', cellClass: 'branch-items-summary', cellRendererFramework: (params) => {
                return params.data.lockCount == 0
                    ? <span className="text-bold">Χωρίς Παραμετροποίηση <i className="fa fa-warning red-600" /></span>
                    : (
                        <div>
                            <div className="left-summary">
                                <div>
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                    Κλειδαριές / Πόρτες
                                </div>
                                <span className="badge bg-success">{ params.data.lockCount}</span>
                            </div>
                            <div className="right-summary">
                                <div>
                                    <i className="fa fa-key" aria-hidden="true"></i>
                                    Κλειδιά
                                    <span className="badge bg-success">{ params.data.keyCount}</span>
                                </div>
                                <div>
                                    <i className="fa fa-calculator" aria-hidden="true"></i>
                                    Συνδιασμοί
                                    <span className="badge bg-success">{ params.data.combinationCount}</span>
                                </div>
                            </div>
                            
                        </div>
                    )
            }},
            {
                headerName: '', cellRendererFramework: (params) => (
                    <div>
                        <button type="button" className="btn btn-primary"><i className="fa fa-info" aria-hidden="true"></i></button>
                        <button type="button" className="btn btn-info"><i className="fa fa-edit" aria-hidden="true"></i></button>
                    </div>
                )
            }
        ]
    }

    componentDidMount() {
        this.props.fetchBranches();
    }

    gridReady() {

    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <h4 className="page-title">Διαμόρφωση Καταστημάτων</h4>
                </div>
                <div className="row">
                    <DataGrid onGridReady={ this.gridReady.bind(this) }
                        className="branches-grid"
                        columnDefs={ this.columnDefs }
                        rowData={ this.props.branches }
                        loading={ this.props.fetching }
                        rowHeight={ 50 }
                        />
                </div>
            </div>
        );
    }
}

export default BranchesList;