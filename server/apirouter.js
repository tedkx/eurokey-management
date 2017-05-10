const express = require('express'),
    apirouter =    express.Router(),
    auth =      require('./auth'),
    dm =        require('./datamodel'),
    prefix = '[ROUTER]',
    DELAY = 700;

const delay = function(req, res, next) { setTimeout(next, DELAY); }
const json = function(req, res, next) { res.type('json'); next() };

apirouter.use(function (req, res, next) {
    req.user = auth.authenticate(req);
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
    res.send(user);
})

/*
 * Dashboard
 */ 
apirouter.get('/summary', auth.authorize, delay, json, function(req, res) {
    res.send({
        pendingAcceptancesCount: 3,
        totalLockCount: 10,
        totalKeyCount: 25,
        totalCombinationCount: 15,
        unassignedLockCount: 3,
        unassignedKeyCount: 5,
        unassignedCombinationCount: 2
    });
});

/*
 * Locks
 */
apirouter.get('/locks?/:code?', auth.authorize, delay, json, function(req, res) {
    res.send(dm.getLocks(req.params.code));
});
apirouter.post('/api/lock', auth.authorize, json, function (req, res) {
    res.send('POST /api/lock');
});

/*
 * Keys / Combinations
 */
apirouter.get('/keys', json, function(req, res) {
    res.send(req.user.role == 'manager' || req.user.role == 'assistant-manager'
        ? dm.getUnlockers('keys')
        : []
    );
});
apirouter.get('/api/mykeys', json, function(req, res) {
    res.send(dm.getUnlockers('keys', req.user.username));
});

apirouter.get('/combinations', function(req, res) {
    res.type('json').send(req.user.role == 'manager' || req.user.role == 'assistant-manager'
        ? dm.getUnlockers('combinations')
        : []
    );
});
apirouter.get('/mycombinations', function(req, res) {
    res.type('json').send(dm.getUnlockers('combinations', req.user.username));
});

apirouter.all('/*', (req, res) => res.status(404))

module.exports = apirouter;