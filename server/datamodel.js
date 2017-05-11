const db =      require('./db'),
    prefix =    '[DATAMODEL]',
    metadataProps = ['meta', '$loki'],
    
    stripMetadata = obj => {
        if(obj === void 0 || obj === null)
            return null;

        if(Array.isArray(obj))
            return obj.map(o => stripMetadata(o));

        var newobj = Object.assign({}, obj);
        for(var mp of metadataProps)
            delete newobj[mp];
        return newobj;
    },
    single = arr => Array.isArray(arr) && arr.length == 1 ? arr[0] : null

const datamodel = {
    findUser: (username, password) => {
        return stripMetadata(single(db.getCollection('users').find({
            '$and': [
                { 'username': username },
                { 'password': password }
            ]
        })));
    },

    //TODO: Token auth
    getUserByToken: (token, user) => stripMetadata(single(db.getCollection('users').find({ username: token }))),

    getBranches: () => stripMetadata(db.getCollection('branches').data),
    getBranchesWithSummary: () => {
        let branches = datamodel.getBranches(),
            locks = db.getCollection('locks').find({ branch: { '$in': branches.map(b => b.code) } }),

            keys = db.getCollection('keys').find({ lock: { '$in': locks.map(l => l.code) } }),
            combinations = db.getCollection('combinations').find({ lock: { '$in': locks.map(l => l.code) } });
        locks = locks.map(l => {
            return Object.assign(l, { 
                keyCount: keys.filter(k => k.lock == l.code),
                combinationCount: combinations.filter(c => c.lock == l.code)
            });
        });

        return branches.map(b => {
            let branchLockCodes = locks.filter(l => l.branch == b.code).map(l => l.code);
            return Object.assign(b, {
                combinationCount: combinations.filter(c => branchLockCodes.indexOf(c.lock) >= 0).length,
                keyCount: keys.filter(k => branchLockCodes.indexOf(k.lock) >= 0).length,
                lockCount: branchLockCodes.length
            });
        });       
    },
    getBranch: (code) => stripMetadata(db.getCollection('branches').find({ code })),

    getLock: (code) => stripMetadata(db.getCollection('locks').find({ code })),
    getLocks: (branch) =>  stripMetadata(db.getCollection('locks').find({ branch })),

    getUnlockers: (type, user) => {
        let validType = type === 'keys' || type === 'combinations',
            lockCodes = datamodel.getLocks(user).map(l => l.code),
            unlockers = validType
                ? db.getCollection(type).find({ code: { '$in': lockCodes } })
                : db.getCollection('keys').find({ code: { '$in': lockCodes } })
                    .concat(db.getCollection('combinations').find({ code: { '$in': lockCodes } }));
        
        return stripMetadata(unlockers);
    },

    getMyUnlockers: (type, user) => {
        let validType = type === 'keys' || type === 'combinations',
            assignmentsFilter = validType
                ?   {
                        '$and': [
                            { type: type.substring(0, type.length - 1) },
                            { assignee: user.username }
                        ]
                    }
                :   { assignee: user.username },
            assignmentCodes = db.getCollection('assignments').find(assignmentsFilter).map(k => k.code),
            unlockers = validType
                ? db.getCollection(type).find({ code: { '$in': assignmentCodes } })
                : db.getCollection('keys').find({ code: { '$in': assignmentCodes } })
                    .concat(db.getCollection('combinations').find({ code: { '$in': assignmentCodes } }))
                    .map(obj => {
                        obj.type = !obj.value ? 'key' : 'combination';
                        return obj;
                    }),
            locks = stripMetadata(db.getCollection('locks').find({ code: { '$in': unlockers.map(u => u.lock) }}));
        
        //console.log('validType', validType, 'filter', JSON.stringify(assignmentsFilter), 'assignments', assignmentCodes.join(' | '),
        //    'unlockers', unlockers.map(u => u.code).join(' | '));        

        return stripMetadata(unlockers).map(u => Object.assign(u, { lock: locks.find({ code: u.lock }) }));
    },

    insert: (item, collectionName) => {
        if(!item)
            return false;
        
        let collection = db.getCollection(collectionName),
            existing = collection.find({ code: item.code });
        
        if(existing)
            return false;
        
        return collection.insert(item);
    },

    update: (item, collectionName) => {
        if(!item)
            return false;
        
        let collection = db.getCollection(collectionName),
            existing = stripMetadata(isingle(locks.find({ code: lock.code })));
        
        if(!existing)
            return false;
    
        return collection.update(Object.assign(existing, item));
    },

    insertLock: (lock) => datamodel.insert(lock, 'locks'),
    insertKey: (key) => datamodel.insert(key, 'keys'),
    insertCombination: (combination) => datamodel.insert(combination, 'combinations'),

    updateLock: (lock) => datamodel.update(lock, 'locks'),
    updateKey: (key) => datamodel.update(key, 'keys'),
    updateCombination: (combination) => datamodel.update(combination, 'combinations')
};

module.exports = datamodel;