import React        from 'react';

import { history  } from '../../data/Store'
import AuthHelper   from '../../lib/AuthHelper';

const AuthorizeRoute = (...allowedRoles) => {
    if(allowedRoles.length === 0 || (allowedRoles.length === 1 && allowedRoles[0] === '*'))
        allowedRoles = '*';

    return ({ routes, params, location }, replace, next) => {
        if(!AuthHelper.isLoggedIn())
            return history.replace({ pathname: '/login', state: { from: location } });
        if (!AuthHelper.isInRole(allowedRoles))
            return history.replace('/forbidden');
        next();
    }
}

export default AuthorizeRoute