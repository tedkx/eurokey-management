import Helper   from './Helper'
import Crypto   from './Crypto'
import Store    from '../data/Store'

const AuthHelper = {
    getUser: () => Store.getState().app.user,
    isInRole: (rolesList) => {
        if(rolesList === '*')
            return true;
        
        return Helper.isArray(rolesList)
            ? rolesList.indexOf(AuthHelper.getUser().role) >= 0
            : rolesList === AuthHelper.getUser().role
    },
    isLoggedIn: () => !Helper.isNil(Store.getState().app.user),
    
    getAuthToken: () => {
        if(!Store)
            return '';
        let state = Store.getState();
        return state && state.app && state.app.user
            ? Crypto.decryptToken(state.app.user.accessToken)
            : '';
    }
};

export default AuthHelper;