const db =      require('./db'),
    prefix =    '[AUTH]';

const parseCredentials = (obj) => {
    if(obj.headers && obj['Authorization']) {
        let val = obj['Authorization'];
        console.log('parsing creds from header', val);
        if(val.match('^Basic') != null) {
            creds = val.split(':');
            return { username: creds[0], password: creds[1] };
        } else if(val.match('^Bearer') != null) {
            return { token: val };
        }
        return null;
    }
    
    if(obj.body) {
        console.log('authenticating from body', obj.body);

        if(obj.body.username && obj.body.password) 
            return { username: obj.body.username, password: obj.body.password };
        
        if(obj.body.token)
            return { token: obj.body.token };
    }

    console.log('no auth data found');
    return null;
}

module.exports = {
    authenticate: function(req) {
        let credentials = parseCredentials(req);
        if(credentials != null && credentials.username && credentials.password) {
            let users =  db.getCollection('users').find({
                '$and': [
                    { 'username': { '$eq': credentials.username } },
                    { 'password': { '$eq': credentials.password } }
                ]
            });
            if(users.length === 1)
                return users[0];
        }

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
    }
}