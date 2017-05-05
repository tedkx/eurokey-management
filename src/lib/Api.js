import Helper   from './Helper';
import Store    from '../store/Store';

import { loginComplete } from '../store/actions/App.actions';
import { fetchDataComplete as fetchDashboardDataComplete } 
                from '../store/actions/Dashboard.actions';

const DELAY = 1; //1500;

const Api = {
    /* App */
    login: (credentials) => {
        setTimeout(() => {
            Store.dispatch(loginComplete({
                firstName: 'Γιώργος', 
                lastName: 'Παπαδάκης', 
                role: 'manager', 
                accessToken: '1234'
            }))
        })
    },

    /* Dashboard */
    fetchDashboardData: () => {
        setTimeout(() => fetchDashboardDataComplete({
            pendingAcceptancesCount: 3,
            totalLocks: 10,
            totalKeyCount: 25,
            totalCombinationCount: 15,
            unassignedLockCount: 3,
            unassignedKeyCount: 5,
            unassignedCombinationCount: 2
        }), DELAY);
    }
};

export default Api;