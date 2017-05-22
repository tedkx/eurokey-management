import React from 'react';

import Helper                   from '../../lib/Helper';
import AuthHelper               from '../../lib/AuthHelper';
import Box                      from '../shared/Box';
import NumericSummary           from './NumericSummary';
import NumericProgressSummary   from './NumericProgressSummary';

class ManagerDashboard extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <NumericProgressSummary containerClassName="col-xs-6 col-md-4" colorClassName="bg-indigo-500" title="Ανατεθειμένα Κλειδιά"
                        url="/keys-management" value={ this.props.totalKeyCount - this.props.unassignedKeyCount } 
                        totalValue={ this.props.totalKeyCount } delay={ 300 } />
                    <NumericProgressSummary containerClassName="col-xs-6 col-md-4" colorClassname="bg-purple-400" title="Ανατεθειμένοι Συνδιασμοί" 
                        url="/combinations-management" delay={ 600 } value={ this.props.totalCombinationCount - this.props.unassignedCombinationCount } 
                        totalValue={ this.props.totalCombinationCount } theme="purple" />
                    <NumericSummary containerClassName="col-xs-6 col-md-4" colorClassName="bg-indigo-500" title="Εκκρεμείς Αποδοχές"
                        url="/keys-management" value={ (this.props.pendingAcceptances || []).length } color="#CFC" />
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

export default ManagerDashboard;