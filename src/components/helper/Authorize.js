import React        from 'react';
import Store        from '../../store/Store';
import Helper       from '../../lib/Helper';
import AuthHelper   from '../../lib/AuthHelper';

const Authorize = (...allowedRoles) => {
    if(allowedRoles.length === 1 && allowedRoles[0] === '*')
        allowedRoles = '*';

    return (WrappedComponent) => {
        return class WithAuthorization extends React.Component {
            constructor(props) {
                super(props);
            }

            render() {
                if(!AuthHelper.isLoggedIn())
                    return console.log('redirecting to login'); //this.props.history.replace('/login')
                    
                if (AuthHelper.isInRole(allowedRoles))
                    return <WrappedComponent { ...this.props } />
                return <h1>Δεν έχετε δικαιώματα να δείτε αυτή τη σελίδα</h1>
            }
        }
    }
}

export default Authorize