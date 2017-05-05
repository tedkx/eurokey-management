const express = require('express'),
    router =    express.Router(),
    auth =      require('./auth'),
    dm =        require('./datamodel'),
    prefix = '[ROUTER]';
    

router.use(function (req, res, next) {
    req.user = auth.authenticate(req);
    next();
});

/*
 * Locks
 */
router.get('/api/locks?/:code?', auth.authorize, function(req, res) {
    res.type('json').send(dm.getLocks(req.params.code));
});
router.post('/api/lock', auth.authorize, function (req, res) {
    res.type('json').send('POST /api/lock');
});

/*
 * Keys / Combinations
 */
router.get('/api/keys', function(req, res) {
    res.type('json').send(req.user.role == 'manager' || req.user.role == 'assistant-manager'
        ? dm.getUnlockers('keys')
        : []
    );
});
router.get('/api/mykeys', function(req, res) {
    res.type('json').send(dm.getUnlockers('keys', req.user.username));
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