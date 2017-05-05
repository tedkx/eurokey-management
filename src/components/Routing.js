import React, { Component }     from 'react';
import { Switch, Route }        from 'react-router-dom';

import Authorize                from './helper/Authorize';

import Dashboard                from '../containers/DashboardContainer';
import LocksManagement          from './items-management/LocksManagement';
import KeysManagement           from './items-management/KeysManagement';
import CombinationsManagement   from './items-management/CombinationsManagement';
import ItemAssignment           from './items-management/ItemAssignment';
import Logs                     from './logging/Logs';

const Managers  = Authorize('manager', 'assistant-manager');
const Users     = Authorize('user');
const All       = Authorize('*');

class Routing extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={ All(Dashboard) }/>
                <Route path='/locks-management' component={ Managers(LocksManagement) }/>
                <Route path='/keys-management' component={ Managers(KeysManagement) }/>
                <Route path='/combinations-management' component={ Managers(CombinationsManagement) }/>
                <Route path='/assign/:type/:code' component={ Users(ItemAssignment) } />
                <Route path='/logs' component={ Managers(CombinationsManagement) }/>
            </Switch>
        );
    }
}

export default Routing;