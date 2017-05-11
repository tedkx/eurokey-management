import React                from 'react'
import { Route, Redirect }  from 'react-router-dom'
import Auth                 from '../../lib/AuthHelper'
import Store                from '../../store/Store'

class PrivateRoute extends React.Component {
    render() {
        console.log('rendering with', this.props);
        let { component: Component, roles = '*', ...rest } = this.props;
        
        if(!Auth.isLoggedIn())
            return <Redirect to={{ pathname: '/login', state: { from: this.props.location } }}/>

        return <Route { ...rest } component={ Auth.isInRole(roles) ? Component : false } />

        if(Auth.isInRole(roles))
            return <Component {...rest}/>;

        return <h2>Δεν έχετε δικαιώματα να δείτε αυτή τη σελίδα</h2>;
        return (
            <Route {...rest} render={ props => (
                    !Auth.isLoggedIn() ? <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
                        : Auth.isInRole(roles) ? <Component {...props}/>
                        : <h2>Δεν έχετε δικαιώματα να δείτε αυτή τη σελίδα</h2>
                )} />
        );
    }
}

export default PrivateRoute