import React                    from 'react'
import { Route, IndexRoute } 
                        from 'react-router'

import AuthorizeRoute           from './AuthorizeRoute'

import App                      from '../../containers/AppContainer'
import Login                    from '../../containers/LoginContainer'
import Dashboard                from '../../containers/DashboardContainer'
import BranchesList             from '../../containers/BranchesListContainer'
import LocksManagement          from '../../containers/locks-management/LocksManagementContainer'
import LocksBranchesAssignmentsList 
                                from '../../containers/locks-management/LocksBranchesAssignmentsListContainer'
import LockCreation             from '../locks-management/LockCreation'
import LockDetail               from '../locks-management/LockDetail'
import KeysManagement           from '../items-management/KeysManagement'
import UnlockersManagement      from '../../containers/unlockers-management/UnlockersManagementContainer'
import UnlockerEmployeesAssignmentsList      
                                from '../../containers/unlockers-management/UnlockerEmployeesAssignmentsListContainer'
import ForbiddenRouteMatch     
                                from './ForbiddenRouteMatch'
import NoRouteMatch             from './NoRouteMatch'

const securityAuth = AuthorizeRoute('security');
const managerAuth = AuthorizeRoute('manager', 'assistant-manager', 'supervisor');
const securityAndManagersAuth = AuthorizeRoute('security', 'manager', 'assistant-manager', 'supervisor');
const auth = AuthorizeRoute();

const Routing = (
    <Route path="/" component={ App }>
        <IndexRoute component={ Dashboard } onEnter={ auth }/>
        <Route path="/login" component={ Login } />
        <Route path="/locks" component={ LocksManagement } onEnter={ securityAndManagersAuth }>
            <Route path="/locks/assign/:id" component={ LocksBranchesAssignmentsList } />
        </Route>
        <Route path="/locks/:id" component={ LockDetail } />
        <Route exact path="/lock/create" component={ LockCreation } onEnter={ securityAuth } />
        <Route path="/unlockers" component={ UnlockersManagement } onEnter={ managerAuth }>
            <Route path="/unlockers/assign/:type/:id" component={ UnlockerEmployeesAssignmentsList } />
        </Route>
        <Route path="/forbidden" component={ ForbiddenRouteMatch }/>
        <Route path="*" component={ NoRouteMatch }/>
    </Route>
);

export default Routing;