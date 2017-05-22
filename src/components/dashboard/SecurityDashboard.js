import React from 'react';
import { Link } from 'react-router'

import Helper                   from '../../lib/Helper'
import AuthHelper               from '../../lib/AuthHelper'

import Card                     from '../shared/Card'
import DataGrid                 from '../grid/DataGrid'
import NumericSummary           from './NumericSummary'
import NumericProgressSummary   from './NumericProgressSummary'

class SecurityDashboard extends React.Component {
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
                            headingTemplate={ <Link to="/logs" className="btn btn-sm btn-raised btn-primary pull-right">Προβολή Όλων</Link> }>
                        <DataGrid columnDefs={ this.columnDefs }
                            rowData={ this.props.events }
                            noBox={ true }
                            className="col-md-12">
                        </DataGrid>
                    </Card>
                </div>
            </div>
        );
    }
}

export default SecurityDashboard;