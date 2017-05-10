const db =      require('./db'),
    prefix =    '[DATAMODEL]',
    metadataProps = ['meta', '$loki'],
    
    stripMetadata = arr => {
        return arr.map(obj => {
            var newobj = Object.assign({}, obj);
            for(var mp of metadataProps)
                delete newobj[mp];
            return newobj;
        });
    },
    single = arr => {
        if(Array.isArray(arr) && arr.length == 1)
            return arr[0];
        return null;
    };

const datamodel = {
    findUser: (username, password) => {
        let users =  db.getCollection('users').find({
            '$and': [
                { 'username': { '$eq': username } },
                { 'password': { '$eq': password } }
            ]
        });
        return users.length === 1
            ? users[0]
            : null;
    },

    //TODO: Token auth
    getUserByToken: (token) => { 
        let users = db.getCollection('users').find({ username: { '$eq' : token } });
        return users.length === 1
            ? users[0]
            : null;
    },

    getLocks: (code) => {
        return typeof code === 'string'
            ? stripMetadata(db.getCollection('locks').find({code: { '$eq': req.params.code } }))
            : stripMetadata(db.getCollection('locks').data);
    },

    getUnlockers: (type, user) => {
        let validType = type === 'keys' || type === 'combinations',
            forUser = typeof user === 'string';

        if(validType && !forUser)
            return stripMetadata(db.getCollection(type).data);

        let filter = validType && forUser
            ? {
                '$and': [
                    { type: { '$eq': type.substring(0, type.length - 1) } },
                    { assignee: { '$eq': user } }
                ]
            }
            : forUser ? { assignee: { '$eq': user } }
            : null;
        
        let my = filter != null 
            ? db.getCollection('assignments').find(filter).map(k => k.code)
            : null;

        let unlockers = validType
            ? db.getCollection(type).find({ code: { '$in': my } })
            : db.getCollection('keys').find({ code: { '$in': my } })
                .concat(db.getCollection('combinations').find({ code: { '$in': my } }));

        return validType
            ? stripMetadata(unlockers)
            : stripMetadata(unlockers).map(obj => {
                obj.type = !obj.value ? 'key' : 'combination';
                return obj;
            });
    }
};

module.exports = datamodel;