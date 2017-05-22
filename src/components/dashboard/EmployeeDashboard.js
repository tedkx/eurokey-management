import React from 'react';

class EmployeeDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.myUnlockersColumnDefs = [
            { headerName: 'Τύπος' }
        ];
        this.myPendingAcceptancesColumnDefs = [

        ];
    }

    render() {
        return (
            <div>
                <div className="row">
                    <Card className="col-xs-12 col-md-6" title="Τα Κλειδιά Μου" loading={ this.props.fetching }
                            heading-right={ <Link to="/my-unlockers" className="btn btn-sm btn-raised btn-primary pull-right">Προβολή Όλων</Link> }>
                        <DataGrid columnDefs={ this.myUnlockersColumnDefs }
                            rowData={ this.props.myUnlockers }>
                        </DataGrid>
                    </Card>
                </div>
                <div className="row">
                    <Card className="col-xs-12 col-md-6" title="Προς Αποδοχή" loading={ this.props.fetching }>
                        <DataGrid columnDefs={ this.myPendingAcceptancesColumnDefs }
                            rowData={ this.props.myPendingAcceptances }>
                        </DataGrid>
                    </Card>
                </div>
            </div>
        )
    }
}

export default EmployeeDashboard;