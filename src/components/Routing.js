import React, { Component }     from 'react'
import { Switch, Route }        from 'react-router-dom'
import CSSTransitionGroup       from 'react-transition-group/CSSTransitionGroup'

import Authorize                from './auth/Authorize'

import Login                    from '../containers/LoginContainer'
import Dashboard                from '../containers/DashboardContainer'
import BranchesList             from './branches/BranchesList'
import LocksManagement          from './items-management/LocksManagement'
import KeysManagement           from './items-management/KeysManagement'
import CombinationsManagement   from './items-management/CombinationsManagement'
import ItemAssignment           from './items-management/ItemAssignment'
import Logs                     from './logging/Logs'
import NoRouteMatch             from './shared/NoRouteMatch'

const Security  = Authorize('security');
const Managers  = Authorize('manager', 'assistant-manager');
const Users     = Authorize('user');
const All       = Authorize('*');

class Routing extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={ All(Dashboard) }/>
                <Route path='/login' component={ Login }/>
                <Route path='/branches' component={ Security(BranchesList) }/>
                <Route path='/locks-management' component={ Managers(LocksManagement) }/>
                <Route path='/keys-management' component={ Managers(KeysManagement) }/>
                <Route path='/combinations-management' component={ Managers(CombinationsManagement) }/>
                <Route path='/assign/:type/:code' component={ Users(ItemAssignment) } />
                <Route path='/logs' component={ Managers(CombinationsManagement) }/>
                <Route component={ NoRouteMatch }/>
            </Switch>
        );
    }
}

export default Routing;