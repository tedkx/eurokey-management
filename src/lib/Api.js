import Store        from '../store/Store'
import Helper       from './Helper'
import Req          from './RequestHelper'

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
    fetchDashboardData: () => Req.getJson('summary'),

    /* Locks Management */
    fetchLocks: () => Req.getJson('locks'),

    /* Keys Management */
    fetchKeys: () =>Req.getJson('keys')
};

export default Api;