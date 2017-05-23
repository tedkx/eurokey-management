const express = require('express'),
    apirouter =    express.Router(),
    auth =      require('./auth'),
    dm =        require('./datamodel'),
    validator = require('./validator'),
    prefix = '[ROUTER]',
    DELAY = 700;

const delay = (req, res, next) => setTimeout(next, DELAY);
const json = (req, res, next) => { res.type('json'); next() };

apirouter.use(function (req, res, next) {
    auth.authenticate(req);

    res.respond = (content, messages, success, status) => {
        if(typeof status === 'number')
            res.status(status);
        res.send({
            success: success === true || messages === void 0 || messages === null,
            messages: typeof messages === 'string' ? [ messages ] : messages,
            content
        });
    }

    next();
});

/* login / logout */
apirouter.post('/login', delay, json, function(req, res) {
    let user = req.body && req.body.username && req.body.password
        ? dm.findUser(req.body.username, req.body.password)
        : null

    if(user == null)
        return res.status(401).end();

    user.accessToken = auth.generateAccessToken(user);
    res.respond(user);
})

/*
 * Dashboard
 */ 
apirouter.get('/summary', auth.authorize, delay, json, function(req, res) {
    let data = req.user.role == 'security' ? {
            totalLockCount: 10,
            unassignedLockCount: 3,
            pendingLockAcceptancesCount: 3,
            notAcceptedLockCount: 2
        }
        : ['manager', 'assistant-manager', 'supervisor' ].indexOf(req.user.role) >= 0 ? {
            pendingAcceptances: dm.getPendingAcceptancesForBranch(req.user.branch),
            totalKeyCount: 25,
            totalCombinationCount: 15,
            unassignedKeyCount: 5,
            unassignedCombinationCount: 2
        }
        : { 
            myUnlockers: dm.getUserUnlockers(req.user),
            myPendingAcceptances: dm.getPendingAcceptancesForUser(req.user)
        };
    res.respond(data);
});

/* Branches */

apirouter.get('/branches/:extradata?', auth.forRoles('security'), auth.authorize, delay, json, (req, res) => {
    res.respond(req.params && req.params.extradata == 'withSummary'
        ? dm.getBranchesWithSummary()
        : dm.getBranches()
    );
});
apirouter.get('/branch/:id', auth.forRoles('security', 'manager'), auth.authorize, delay, json, function(req, res) {
    res.respond(dm.getBranch(req.params.id));
});

apirouter.get('/branch/:id/locks', auth.forRoles('security', 'manager', 'assistant-manager'), auth.authorize, delay, json, (req, res) => {
    if(req.user.role != 'supervisor' && req.user.branch != req.params.id)
        res.respond(null, null, false, 401);
    else
        res.respond(dm.getLocks(req.params.id));
});

/* Locks */

apirouter.get('/locks', auth.forRoles('security'), auth.authorize, delay, json, (req, res) => res.respond(dm.getLocks()));
apirouter.get('/lock/:id', auth.authorize, delay, json, (req, res) =>  res.respond(dm.getLock(req.params.id, req.user)));
apirouter.get('/lock/:id/branch-assignments', auth.forRoles('security'), auth.authorize, delay, json, (req, res) => {
    res.respond(dm.getBranchAssignmentsForLock(req.params.id));
});
apirouter.post('/lock/:id/branch-assignments', auth.forRoles('security'), auth.authorize, delay, json, (req, res) => {
    res.respond(dm.persistBranchAssignmentsForLock(req.params.id, req.body));
});

apirouter.post('/api/lock', auth.authorize, json, function (req, res) {
    var result = validator.validateForInsert(req.body);
    return result === true
        ? res.respond(dm.insertLock(req.body))
        : res.respond(null, result);    
});
apirouter.put('/api/lock/:id', auth.authorize, json, function (req, res) {
    if(req.body)
        req.body.id = req.params.id;
    var result = validator.validateForUpdate(req.body);
    return result === true
        ? res.respond(dm.updateLock(req.body))
        : res.respond(null, result);    
});

/*
 * Keys / Combinations
 */
apirouter.get('/unlockers', auth.forRoles('manager', 'assistant-manager'), auth.authorize, delay, json, 
    (req, res) => res.respond(dm.getUnlockers(req.user)));
apirouter.get('/key/:id/employee-definitions', auth.forRoles('manager', 'assistant-manager'), auth.authorize, delay, json, 
    (req, res) => res.respond(dm.getAssignmentDefinitionssForUnlocker('key', req.params.id)));
apirouter.get('/combination/:id/employee-definitions', auth.forRoles('manager', 'assistant-manager', 'supervisor'), auth.authorize, delay, json, 
    (req, res) => res.respond(dm.getAssignmentDefinitionssForUnlocker('combination', req.params.id)));
apirouter.post('/key/:id/employee-definitions', auth.forRoles('manager', 'assistant-manager', 'supervisor'), auth.authorize, delay, json, 
    (req, res) => res.respond(dm.persistAssignmentDefinitionsForUnlocker('key', req.params.id, req.body)))
apirouter.post('/combination/:id/employee-definitions', auth.forRoles('manager', 'assistant-manager', 'supervisor'), auth.authorize, delay, json,
    (req, res) => res.respond(dm.persistAssignmentDefinitionsForUnlocker('combination', req.params.id, req.body)))
apirouter.get('/key/:id/employee-assignment', auth.forRoles('*'), auth.authorize, delay, json, 
    (req, res) => res.respond(dm.getEmployeesForAssignment('key', req.params.id, req.user.role === 'teller')));
apirouter.get('/combination/:id/employee-assignment', auth.forRoles('*'), auth.authorize, delay, json, 
    (req, res) => res.respond(dm.getEmployeesForAssignment('combination', req.params.id, req.user.role === 'teller')));
apirouter.post('/key/:id/employee-assignment', auth.forRoles('*'), auth.authorize, delay, json, 
    (req, res) => { console.log('payload', req.body); return res.respond(dm.assignToUnlocker(req.user, 'key', req.params.id, req.body)) })
apirouter.post('/combination/:id/employee-assignment', auth.forRoles('*'), auth.authorize, delay, json,
    (req, res) => res.respond(dm.assignToUnlocker(req.user, 'combination', req.params.id, req.body)))

apirouter.get('/unlockers/my', auth.forRoles('*'), auth.authorize, delay, json, 
    (req, res) => res.respond(dm.getUserUnlockers(req.user)))
apirouter.get('/pendingAcceptances/my', auth.forRoles('*'), auth.authorize, delay, json, 
    (req, res) => res.respond(dm.getPendingAcceptancesForUser(req.user)))
apirouter.post('/key/:id/accept', auth.forRoles('*'), auth.authorize, delay, json,
    (req, res) => res.respond(dm.acceptUnlocker(type, id, req.user)))
apirouter.post('/combination/:id/accept', auth.forRoles('*'), auth.authorize, delay, json,
    (req, res) => res.respond(dm.acceptUnlocker(type, id, req.user)))

apirouter.post('/api/lock', auth.authorize, json, function (req, res) {
    var result = validator.validateForInsert(req.body);
    return result === true
        ? res.respond(dm.insertLock(req.body))
        : res.respond(null, result);    
});
apirouter.put('/api/lock/:id', auth.authorize, json, function (req, res) {
    if(req.body)
        req.body.id = req.params.id;
    var result = validator.validateForUpdate(req.body);
    return result === true
        ? res.respond(dm.updateLock(req.body))
        : res.respond(null, result);    
});

apirouter.get('/keys', auth.forRoles('security'), auth.authorize, delay, json, (req, res) => res.respond(dm.getUnlockers('keys')));

apirouter.get('/mykeys', auth.authorize, json, function(req, res) {
    res.respond(dm.getMyUnlockers('keys', req.user));
});

apirouter.get('/combinations', auth.authorize, json, function(req, res) {
    res.respond(req.user.role == 'manager' || req.user.role == 'assistant-manager'
        ? dm.getUnlockers('combinations', req.user)
        : []
    );
});
apirouter.get('/mycombinations', auth.authorize, json, function(req, res) {
    res.respond(dm.getMyUnlockers('combinations', req.user));
});

/* Logs */
apirouter.get('/events', auth.forRoles('*'), auth.authorize, delay, json, 
    (req, res) => res.respond(dm.getEvents(req.user.branch)))
apirouter.get('/audit', auth.forRoles('*'), auth.authorize, delay, json, 
    (req, res) => res.respond(dm.getAuditEntries(req.user.branch)))
apirouter.get('/audit/for-event/:id', auth.forRoles('*'), auth.authorize, delay, json, 
    (req, res) => res.respond(dm.getAuditEntries(req.user.branch, req.params.id)))

apirouter.all('/*', (req, res) => res.status(404).end())

module.exports = apirouter;