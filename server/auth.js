const db =      require('./db'),
    dm =        require('./datamodel'),
    prefix =    '[AUTH]';

const parseCredentials = (req) => {
    //TODO: Remove this
    if(req.query && req.query.username && req.query.password)
        return { method: 'basic', username: req.query.username, password: req.query.password };

    if(req.query && req.query.token)
        return { method: 'token', token: req.query.token };    

    let auth = req.get('authorization');
    
    if(!auth)
        return null;
    
    let parts = auth.split(' ');
    if(parts.length !== 2)
        return null;
    
    if(parts[0] == 'Basic') {
        creds = parts[1].split(':');
        return creds.length === 2
            ? { method: 'basic', username: creds[0], password: creds[1] }
            : null;
    } 
    
    if(parts[0] == 'Bearer')
        return { method: 'token', token: parts[1] };
    
    return null;
}

module.exports = {
    authenticate: function(req) {
        let credentials = parseCredentials(req) || {};
        req.user = credentials.method == 'basic' ? dm.findUser(credentials.username, credentials.password)
            : credentials.method == 'token' ? dm.getUserByToken(credentials.token)
            : null
    },
    authorize: function(req, res, next) {
        if(!req.user)
            return res.status(401).end();
        
        //TODO:
        /*
        if(req.authRoles)
            console.log('authorizing for roles', req.authRoles, 'current role', req.user.role);
        */
        
        next();
    },

    forRoles(...roles) {
        return (req, res, next) => {
            req.authRoles = roles;
            next();
        }
    },

    generateAccessToken: (user) => user.username
}