import React                from 'react'

import Helper               from '../../lib/Helper'

import ManagerDashboard     from './ManagerDashboard'
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
                    ['manager','assistant-manager','supervisor'].indexOf(this.props.user.role) >= 0 ? <ManagerDashboard { ...this.props } />
                        : this.props.user.role === 'security' ? <SecurityDashboard { ...this.props } />
                        : <EmployeeDashboard { ...this.props } />
                }
            </div>
        );
    }
}

export default Dashboard;