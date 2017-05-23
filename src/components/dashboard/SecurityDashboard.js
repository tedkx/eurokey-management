import React from 'react';
import { Link } from 'react-router'

import Helper                   from '../../lib/Helper'
import AuthHelper               from '../../lib/AuthHelper'
import DateHelper               from '../../lib/DateHelper'

import Card                     from '../shared/Card'
import UnlockerTypeColumn       from '../grid/columns/UnlockerTypeColumn'
import DataGrid                 from '../grid/DataGrid'
import NumericSummary           from './NumericSummary'
import NumericProgressSummary   from './NumericProgressSummary'

class SecurityDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.columnDefs = [
            { headerName: 'Τύπος', field: 'typeTitle' },
            { headerName: 'Περιγραφή', field: 'reason' },
            { headerName: 'Κατάστημα', field: 'branch' },
            UnlockerTypeColumn('entityType'), 
            { headerName: 'Δημιουργήθηκε', valueGetter: ({ data }) => DateHelper.toString(new Date(data.created)) },
            { headerName: '', valueGetter: ({ data }) => `από ${data.creatorLastName} ${data.creatorFirstName}` }
        ];
    }
    componentDidMount() { console.log('fetching data');this.props.fetchData(); }

    componentWillUnmount() { this.props.clearData() }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <NumericProgressSummary containerClassName="col-xs-6 col-md-4" title="Ανατεθειμένες Κλειδαριές"
                        url="/locks-management" value={ this.props.totalLockCount - this.props.unassignedLockCount } 
                        totalValue={ this.props.totalLockCount } theme="green" />
                    <NumericSummary containerClassName="col-xs-6 col-md-4" colorClassName="bg-indigo-500" title="Εκκρεμείς Αποδοχές"
                        url="/keys-management" value={ this.props.pendingLockAcceptancesCount } />
                    <NumericSummary containerClassName="col-xs-6 col-md-4" colorClassName="bg-deep-orange" title="Μη Αποδεκτές Κλειδαριές"
                        url="/keys-management" value={ this.props.notAcceptedLockCount } />
                </div>

                <div className="row">
                    <Card className="col-md-12" title="Πρόσφατα Συμβάντα" loading={ this.props.fetching }
                            headingTemplate={ <Link to="/events" className="btn btn-sm btn-raised btn-primary pull-right">Προβολή Όλων</Link> }>
                        <DataGrid columnDefs={ this.columnDefs } rowData={ this.props.events } />
                    </Card>
                </div>
            </div>
        );
    }
}

export default SecurityDashboard;