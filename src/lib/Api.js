import Store        from '../data/Store'
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
    fetchLockBranchesAssignments: (lockId) => Req.getJson(`lock/${lockId}/branch-assignments`),
    saveLockBranchesAssignments: ({ lockId, assignments }) => Req.postJson(`lock/${lockId}/branch-assignments`, assignments),

    createLock: (lock) => Req.postJson('lock', lock),
    updateLock: (lock) => Req.putJson(`lock/${lock.code}`, lock),

    /* Unlockers Management */
    fetchUnlockers: () => Req.getJson('unlockers'),
    fetchUnlockerEmployeeDefinitions: ({ type, id }) => Req.getJson(`${type}/${id}/employee-definitions`),
    saveUnlockerEmployeeDefinitions: ({ type, id, definitions }) => Req.postJson(`${type}/${id}/employee-definitions`),
    fetchEmployeesForUnlockerAssignment: ({ type, id }) => Req.getJson(`${type}/${id}/employee-assignment`),
    assignEmployeeToUnlocker: ({ type, id, ...props }) => Req.postJson(`${type}/${id}/employee-assignment`, props),

    fetchMyUnlockers: () => Req.getJson('unlockers/my'),
    
    fetchMyPendingAcceptances: () => Req.getJson('pendingAcceptances/my'),
    acceptUnlocker: ({ type, id }) => Req.postJson(`${type}/${id}/accept`),

    fetchKeys: () => Req.getJson('keys')
};

export default Api;