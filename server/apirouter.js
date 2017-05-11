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
apirouter.post('/login', function(req, res) {
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
    res.respond({
        pendingAcceptancesCount: 3,
        totalLockCount: 10,
        totalKeyCount: 25,
        totalCombinationCount: 15,
        unassignedLockCount: 3,
        unassignedKeyCount: 5,
        unassignedCombinationCount: 2
    });
});

/* Branches */

apirouter.get('/branches/:extradata?', auth.forRoles('security'), auth.authorize, delay, json, (req, res) => {
    res.respond(req.params && req.params.extradata == 'withSummary'
        ? dm.getBranchesWithSummary()
        : dm.getBranches()
    );
});
apirouter.get('/branch/:code', auth.forRoles('security', 'manager'), auth.authorize, delay, json, function(req, res) {
    res.respond(dm.getBranch(req.params.code));
});

/* Locks */

apirouter.get('/locks', auth.authorize, delay, json, (req, res) => res.respond(dm.getLocks(req.user.branch)));
apirouter.get('/lock/:code', auth.authorize, delay, json, (req, res) =>  res.respond(dm.getLock(req.params.code, req.user)));

apirouter.post('/api/lock', auth.authorize, json, function (req, res) {
    var result = validator.validateForInsert(req.body);
    return result === true
        ? res.respond(dm.insertLock(req.body))
        : res.respond(null, result);    
});
apirouter.put('/api/lock/:code', auth.authorize, json, function (req, res) {
    if(req.body)
        req.body.code = req.params.code;
    var result = validator.validateForUpdate(req.body);
    return result === true
        ? res.respond(dm.updateLock(req.body))
        : res.respond(null, result);    
});

/*
 * Keys / Combinations
 */
apirouter.get('/keys', auth.authorize, json, function(req, res) {
    respond(req.user.role == 'manager' || req.user.role == 'assistant-manager'
        ? dm.getUnlockers('keys', req.user)
        : []
    );
});
apirouter.get('/mykeys', auth.authorize, json, function(req, res) {
    respond(dm.getMyUnlockers('keys', req.user));
});

apirouter.get('/combinations', auth.authorize, json, function(req, res) {
    respond(req.user.role == 'manager' || req.user.role == 'assistant-manager'
        ? dm.getUnlockers('combinations', req.user)
        : []
    );
});
apirouter.get('/mycombinations', auth.authorize, json, function(req, res) {
    respond(dm.getMyUnlockers('combinations', req.user));
});

apirouter.all('/*', (req, res) => res.status(404).end())

module.exports = apirouter;