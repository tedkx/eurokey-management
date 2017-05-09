import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Helper               from '../../lib/Helper';
import AuthHelper           from '../../lib/AuthHelper';
import Box                  from '../shared/Box';
import NumericSummary       from './NumericSummary';
import NumericProgressSummary       from './NumericProgressSummary';

class Dashboard extends Component {
    componentWillMount() {
        this.props.fetchData();
    }

    widgetsForManager() {
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
        );
    }

    widgetsForUser() {
        return (
            <div>
                <Box>
                    <table>
                    {
                        Helper.isArray(this.props.myItems)
                            ? this.props.myItems.map(pa => (
                                <tr>
                                    <td>{ a.type }</td>
                                    <td>{ a.code }</td>
                                </tr>
                            ))
                            : false
                    }
                    </table>
                </Box>
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
        )
    }

    render() {
        let user = AuthHelper.getUser();
        return (
            <div className="dashboard">
                {
                    user.role === 'manager' || user.role === 'assistant-manager'
                        ? this.widgetsForManager()
                        : this.widgetsForUser()
                }
            </div>
        );
    }
}

Dashboard.propTypes = {
    myItems: PropTypes.array,
    pendingAcceptancesCount: PropTypes.number,
    totalLockCount: PropTypes.number,
    totalKeyCount: PropTypes.number,
    totalCombinationCount: PropTypes.number,
    unassignedLockCount: PropTypes.number,
    unassignedKeyCount: PropTypes.number,
    unassignedCombinationCount: PropTypes.number
}

export default Dashboard;