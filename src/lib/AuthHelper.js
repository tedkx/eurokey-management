import Helper   from './Helper';
import Store    from '../store/Store';

const AuthHelper = {
    getAuthToken: () => (Store.getState().app.user || {}).accessToken,
    getUser: () => Store.getState().app.user,
    isInRole: (rolesList) => {
        if(rolesList === '*')
            return true;
        return Helper.isArray(rolesList)
            ? rolesList.includes(AuthHelper.getUser().role)
            : rolesList === AuthHelper.getUser().role
    },
    isLoggedIn: () => !Helper.isNil(Store.getState().app.user)
};

export default AuthHelper;