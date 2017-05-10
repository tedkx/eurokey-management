const express = require('express'),
    router =    express.Router(),
    auth =      require('./auth'),
    dm =        require('./datamodel'),
    prefix = '[ROUTER]',
    DELAY = 700;

const delay = function(req, res, next) { setTimeout(next, DELAY); }
const json = function(req, res, next) { res.type('json'); next() };

router.use(function (req, res, next) {
    req.user = auth.authenticate(req);
    console.log('authenticated', req.route, 'user', req.user);
    next();
});

/* login / logout */
router.post('/api/login', function(req, res) {
    console.log('post api/login');
    //console.log('body', req.body);
    //console.log('username', req.body.username, 'password', req.body.password);
    //let user = auth.authenticate(req);
    if(req.user == null)
        res.status(401).end();
    res.send(user);
})

/*
 * Dashboard
 */ 
router.get('/api/summary', auth.authorize, delay, json, function(req, res) {
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
router.get('/api/locks?/:code?', auth.authorize, delay, json, function(req, res) {
    res.send(dm.getLocks(req.params.code));
});
router.post('/api/lock', auth.authorize, json, function (req, res) {
    res.send('POST /api/lock');
});

/*
 * Keys / Combinations
 */
router.get('/api/keys', json, function(req, res) {
    res.send(req.user.role == 'manager' || req.user.role == 'assistant-manager'
        ? dm.getUnlockers('keys')
        : []
    );
});
router.get('/api/mykeys', json, function(req, res) {
    res.send(dm.getUnlockers('keys', req.user.username));
});

router.get('/api/combinations', function(req, res) {
    res.type('json').send(req.user.role == 'manager' || req.user.role == 'assistant-manager'
        ? dm.getUnlockers('combinations')
        : []
    );
});
router.get('/api/mycombinations', function(req, res) {
    res.type('json').send(dm.getUnlockers('combinations', req.user.username));
});

module.exports = router;