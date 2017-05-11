import React                from 'react'

import Helper               from '../../lib/Helper'

import ManagerDashboard     from './ManagerDashboard'
import SupervisorDashboard  from './SupervisorDashboard'
import SecurityDashboard    from './SecurityDashboard'
import EmployeeDashboard    from './EmployeeDashboard'

class Dashboard extends React.Component {
    componentWillMount() {
        this.props.fetchData();
    }    

    render() {
        if(!this.props.user)
            return false;

        return (
            <div className="dashboard">
                {
                    this.props.user.role === 'manager' || this.props.user.role === 'assistant-manager' ? <ManagerDashboard { ...this.props } />
                        : this.props.user.role === 'security' ? <SecurityDashboard { ...this.props } />
                        : this.props.user.role === 'supervisor' ? <SupervisorDashboard { ...this.props } />
                        : <EmployeeDashboard { ...this.props } />
                }
            </div>
        );
    }
}

export default Dashboard;