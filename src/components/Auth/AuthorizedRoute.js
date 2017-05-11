import React                from 'react'
import { Route, Redirect }  from 'react-router-dom'
import Auth                 from '../../lib/AuthHelper'

const PrivateRoute = ({ component: Component, roles = '*', ...rest }) => (
    <Route {...rest} render={ props => {
        console.log('roles', roles);
        return (
            !Auth.isLoggedIn() ? <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
                : Auth.isInRole(roles) ? <Component {...props}/>
                : <h2>Δεν έχετε δικαιώματα να δείτε αυτή τη σελίδα</h2>
        );
    }} />
);

export default PrivateRoute