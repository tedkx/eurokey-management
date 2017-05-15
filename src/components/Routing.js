import React from 'react';

import { Route, IndexRoute } from 'react-router'

import AuthorizedRoute          from './auth/AuthorizedRoute'

import App                      from '../containers/AppContainer'
import Login                    from '../containers/LoginContainer'
import Dashboard                from '../containers/DashboardContainer'
import BranchesList             from '../containers/BranchesListContainer'
import LocksManagement          from '../containers/items-management/LocksManagementContainer'
import LocksBranchesAssignmentsList 
                                from '../containers/items-management/LocksBranchesAssignmentsListContainer'
import LockCreation             from './items-management/LockCreation'
import KeysManagement           from './items-management/KeysManagement'
import UnlockersManagement      from '../containers/items-management/UnlockersManagementContainer'
import UnlockerEmployeesAssignmentsList      
                                from '../containers/items-management/UnlockerEmployeesAssignmentsListContainer'
import Logs                     from './logging/Logs'
import NoRouteMatch             from './shared/NoRouteMatch'

const onAuthEnter = ({ routes, params, location }, replaceFn, nextFn) => {
    nextFn();
    return true;
}

const Routing = (
    <Route path="/" component={ App }>
        <IndexRoute component={ Dashboard }/>
        <Route path="/login" component={ Login } />
        <AuthorizedRoute path="/locks" component={ LocksManagement }>
            <AuthorizedRoute path="/locks/assign/:id" component={ LocksBranchesAssignmentsList } />
        </AuthorizedRoute>
        <AuthorizedRoute exact path="/lock/create" component={ LockCreation } onEnter={ onAuthEnter } />
        <AuthorizedRoute path="/unlockers" component={ UnlockersManagement } onEnter={ onAuthEnter }>
            <AuthorizedRoute path="/unlockers/assign/:type/:id" component={ UnlockerEmployeesAssignmentsList } />
        </AuthorizedRoute>
        <Route path="*" component={ NoRouteMatch }/>
    </Route>
)

export default Routing;

/*
    // For react-route v4 & react-router-redux v5

import React, { Component }     from 'react'
import { Switch, Route }        from 'react-router'
import CSSTransitionGroup       from 'react-transition-group/CSSTransitionGroup'

import AuthorizedRoute          from './auth/AuthorizedRoute'
import Auth                     from '../lib/AuthHelper'

class Routing extends Component {
    render() {
        return (
            <Switch>
                <AuthorizedRoute exact path="/" component={ Dashboard } />
                <Route path='/login' component={ Login }/>
                <AuthorizedRoute path='/branches' component={ BranchesList }/>
                <AuthorizedRoute path='/locks' component={ LocksManagement }/>
                <AuthorizedRoute path='/keys-management' component={ KeysManagement }/>
                <AuthorizedRoute path='/combinations-management' component={ CombinationsManagement }/>
                <AuthorizedRoute path='/assign/:type/:code' component={ ItemAssignment } />
                <AuthorizedRoute path='/logs' component={ Logs }/>
                <Route component={ NoRouteMatch }/>
            </Switch>
        );
    }
}

export default Routing;

*/