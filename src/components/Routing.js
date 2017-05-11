import React, { Component }     from 'react'
import { Switch, Route }        from 'react-router-dom'
import CSSTransitionGroup       from 'react-transition-group/CSSTransitionGroup'

import AuthorizedRoute          from './auth/AuthorizedRoute'
import Auth                     from '../lib/AuthHelper'

import Login                    from '../containers/LoginContainer'
import Dashboard                from '../containers/DashboardContainer'
import BranchesList             from '../containers/BranchesListContainer'
import LocksManagement          from '../containers/items-management/LocksManagementContainer'
import KeysManagement           from './items-management/KeysManagement'
import CombinationsManagement   from './items-management/CombinationsManagement'
import ItemAssignment           from './items-management/ItemAssignment'
import Logs                     from './logging/Logs'
import NoRouteMatch             from './shared/NoRouteMatch'

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