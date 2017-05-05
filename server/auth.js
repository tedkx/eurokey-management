const db =      require('./db'),
    prefix =    '[AUTH]';

module.exports = {
    authenticate: function(req) {
        var users = db.getCollection('users').find({ 'username': { '$eq': 'gdalas' } } );
        return users.length === 1
            ? users[0]
            : null;

        // TODO: implement authentication
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