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
                    <NumericProgressSummary containerClassName="col-xs-6 col-lg-3" title="Ανατεθειμένες Κλειδαριές"
                        url="/locks-management" value={ this.props.totalLockCount - this.props.unassignedLockCount } 
                        totalValue={ this.props.totalLockCount } theme="green" />
                    <NumericProgressSummary containerClassName="col-xs-6 col-lg-3" colorClassName="bg-indigo-500" title="Ανατεθειμένα Κλειδιά"
                        url="/keys-management" value={ this.props.totalKeyCount - this.props.unassignedKeyCount } 
                        totalValue={ this.props.totalKeyCount } delay={ 300 } />
                    <NumericProgressSummary containerClassName="col-xs-6 col-lg-3" colorClassname="bg-purple-400" title="Ανατεθειμένοι Συνδιασμοί" 
                        url="/combinations-management" delay={ 600 } value={ this.props.totalCombinationCount - this.props.unassignedCombinationCount } 
                        totalValue={ this.props.totalCombinationCount } theme="purple" />
                    <NumericSummary containerClassName="col-xs-6 col-lg-3" colorClassName="bg-indigo-500" title="Εκκρεμείς Αποδοχές"
                        url="/keys-management" value={ this.props.pendingAcceptancesCount } color="#CFC" />
                </div>
                
                <div className="row">
                    <div className="col-md-8">
                        <Box title="Grid"></Box>
                    </div>
                    <div className="col-md-4">
                        <Box title="Πρόσφατα Συμβάντα">

                        </Box>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Box>
                            <table>
                            {
                                Helper.isArray(this.props.pendingAcceptances)
                                    ? this.props.pendingAcceptances.map(pa => (
                                        <tr>
                                            <td>{ a.type }</td>
                                            <td>{ a.code }</td>
                                        </tr>
                                    ))
                                    : false
                            }
                            </table>
                        </Box>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManagerDashboard;