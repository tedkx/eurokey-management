const db =      require('./db'),
    dm =        require('./datamodel'),
    prefix =    '[AUTH]';

const parseCredentials = (req) => {
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
        let credentials = parseCredentials(req);
        if(credentials != null)
            return credentials.method == 'basic' ? dm.findUser(credentials.username, credentials.password)
                : credentials.method == 'token' ? dm.getUserByToken(credentials.token)
                : null

        return null;

        // TODO: implement token authentication
        if (!req.headers['x-auth']) 
            return { name: 'Name', token: 'Token' }
        return null;
    },
    authorize: function(req, res, next) {
        if(!req.user)
            return res.status(401).end();
        next();
    },

    generateAccessToken: (user) => user.username
}