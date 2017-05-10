import Store        from '../store/Store'
import Helper       from './Helper'
import Req          from './RequestHelper'

const Api = {
    /* App */
    login: (credentials) => Req.postJson('login', credentials),

    /* Dashboard */
    fetchDashboardData: () => Req.getJson('summary'),

    /* Locks Management */
    fetchLocks: () => Req.getJson('locks'),

    /* Keys Management */
    fetchKeys: () =>Req.getJson('keys')
};

export default Api;