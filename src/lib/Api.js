import Store        from '../store/Store'
import Helper       from './Helper'
import Req          from './RequestHelper'

const Api = {
    /* App */
    login: (credentials) => Req.anonymousPostJson('login', credentials),

    /* Branches */
    fetchBranches: () => Req.getJson('branches/withSummary'),
    
    /* Dashboard */
    fetchDashboardData: () => Req.getJson('summary'),

    /* Locks Management */
    fetchLocks: () => Req.getJson('locks'),
    createLock: (lock) => Req.postJson('lock', lock),
    updateLock: (lock) => Req.putJson(`lock/${lock.code}`, lock),

    /* Keys Management */
    fetchKeys: () => Req.getJson('keys')
};

export default Api;