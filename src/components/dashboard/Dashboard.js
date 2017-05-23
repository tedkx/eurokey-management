import React                from 'react'

import Helper               from '../../lib/Helper'

import ManagerDashboard     from '../../containers/dashboard/ManagerDashboardContainer'
import SecurityDashboard    from '../../containers/dashboard/SecurityDashboardContainer'
import EmployeeDashboard    from '../../containers/dashboard/EmployeeDashboardContainer'

class Dashboard extends React.Component {
    render() {
        if(!this.props.user)
            return false;

        return (
            <div className="dashboard">
                {
                    ['manager','assistant-manager','supervisor'].indexOf(this.props.user.role) >= 0 ? <ManagerDashboard { ...this.props } />
                        : this.props.user.role === 'security' ? <SecurityDashboard { ...this.props } />
                        : <EmployeeDashboard { ...this.props } />
                }
            </div>
        );
    }
}

export default Dashboard;