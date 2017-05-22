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
    single = arr => Array.isArray(arr) && arr.length == 1 ? arr[0] : null,
    dbFind = (collectionName, filter) => stripMetadata(db.getCollection(collectionName).find(filter)),
    dbData = (collectionName) => stripMetadata(db.getCollection(collectionName).data)

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
            locks = dbFind('locks', { branch: { '$in': branches.map(b => b.id) } }),

            keys = dbFind('keys', { lock: { '$in': locks.map(l => l.v) } }),
            combinations = dbFind('combinations', { lock: { '$in': locks.map(l => l.id) } });
        locks = locks.map(l => {
            return Object.assign(l, { 
                keyCount: keys.filter(k => k.lockId == l.id),
                combinationCount: combinations.filter(c => c.lockId == l.id)
            });
        });

        return branches.map(b => {
            let branchLockIds = locks.filter(l => l.branchId == b.id).map(l => l.id);
            return Object.assign(b, {
                combinationCount: combinations.filter(c => branchLockIds.indexOf(c.lockId) >= 0).length,
                keyCount: keys.filter(k => branchLockIds.indexOf(k.lockId) >= 0).length,
                lockCount: branchLockIds.length
            });
        });       
    },
    getBranch: (id) => dbFind('branches', { id }),

    getLock: (id) => dbFind('locks', { id }),
    getLocks: (branch) => {
        let filter = !!branch ? { id: { '$in': dbFind('branchLocks', { branchId: branch }).map(l => l.lockId) } } : undefined,
            locks = dbFind('locks', filter),
            categories = dbFind('lockCategories'),
            significances = dbFind('lockSignificances');

        return locks.map(l => Object.assign(l, {
            category: categories.find((c) =>  c.id == l.categoryId),
            significance: significances.find(s => s.id == l.significanceId)
        }));
    },
    getBranchAssignmentsForLock: (id) => {
        let assignedBranchIds = dbFind('branchLocks', { lockId: id }).map(a => a.branchId);
        return dbData('branches').map(b => Object.assign(b, { lockAssigned: assignedBranchIds.indexOf(b.id) >= 0 }));
    },
    persistBranchAssignmentsForLock: (id, assignments) => {
        if(!Array.isArray(assignments))
            return false;

        let la = dbFind('branchLocks', { lockId: id }),
            notAssignedBranchIds = assignments.filter(a => !a.lockAssigned).map(a => a.id),
            assignedBranchIds = assignments.filter(a => a.lockAssigned && la.indexOf(a.id) < 0).map(a => a.id),
            coll = db.getCollection('branchLocks');

        if(notAssignedBranchIds.length > 0) {
            let toRemove = coll.chain().find(bl => bl.lockId = id && notAssignedBranchIds.indexOf(bl.branchId) >= 0).data();
            coll.remove(toRemove);
        }
        for(let assignedBranchId of assignedBranchIds)
            db.getCollection('branchLocks').insert({ lockId: id, branchId: assignedBranchId });        
    },

    getKeyTypes: () => dbData('keyTypes'),

    getUnlockers: (user, type) => {
        let validType = type === 'keys' || type === 'combinations',
            locks = datamodel.getLocks(user.branch),
            lockIds = locks.map(l => l.id),
            unlockers = validType
                ? dbFind(type, { id: { '$in': lockIds } })
                : dbFind('keys', { lockId: { '$in': lockIds } }).map(k => Object.assign(k, { type: 'key' }))
                    .concat(dbFind('combinations', { lockId: { '$in': lockIds } }).map(c => Object.assign(c, { type: 'combination' }))),
            assignmentDefinitions = dbFind('assignmentDefinitions', { id: { '$in': unlockers.map(u => u.id) } });
        
        return stripMetadata(unlockers).map(u => {
            let definition = assignmentDefinitions.find(a => a.id == u.id)
            return Object.assign(u, { 
                lockTitle: locks.find(l => l.id == u.lockId).title,
                level: (definition || {}).level
            });
        });            
    },

    getUnassignedUnlockers: (user, type) => {

    },

    getUnacceptedUnlockers: (user, type) => {

    },

    getEmployeeAssignmentsForBranch: (branch) => {
        let locks = datamodel.getLocks(branch),
            unlockers = datamodel.getUnlockers({ branch }),
            users = dbData('users');
        return dbFind('assignments', { lockId: { '$in': locks.map(l => l.id ) }})
            .map(assignment => {
                let user = users.find(u => u.username = assignment.assigne),
                    unlocker = unlockers.find(u => u.type == assignment.type && u.id == assignment.id)
                    lock = locks.find(l => l.id == unlocker.lockId);
                return Object.assign(assignment, {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: username,
                    lockTitle: lock.title
                });
            })
    },

    getAssignmentDefinitionssForUnlocker: (type, id) => {
        let assignments = dbFind('assignments', { '$and': [ { type }, { id } ] })
        return dbData('users').map(u => {
            let assignment = assignments.find(a => a.assignee == u.username) || {};
            return {
                username: u.username,
                firstName: u.firstName,
                lastName: u.lastName,
                role: u.role,
                assigned: assignment.level
            }
        });
    },
    persistAssignmentDefinitionsForUnlocker: (type, id, assignments) => {
        throw 'persisting of unlockers not implemented';
        if(!Array.isArray(assignments))
            return false;

        let la = dbFind('branchLocks', { lockId: id }),
            notAssignedBranchIds = assignments.filter(a => !a.lockAssigned).map(a => a.id),
            assignedBranchIds = assignments.filter(a => a.lockAssigned && la.indexOf(a.id) < 0).map(a => a.id),
            coll = db.getCollection('branchLocks');

        if(notAssignedBranchIds.length > 0) {
            let toRemove = coll.chain().find(bl => bl.lockId = id && notAssignedBranchIds.indexOf(bl.branchId) >= 0).data();
            coll.remove(toRemove);
        }
        for(let assignedBranchId of assignedBranchIds)
            db.getCollection('branchLocks').insert({ lockId: id, branchId: assignedBranchId });        
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
            assignmentIds = db.getCollection('assignments').find(assignmentsFilter).map(k => k.id),
            unlockers = validType
                ? db.getCollection(type).find({ id: { '$in': assignmentIds } })
                : db.getCollection('keys').find({ id: { '$in': assignmentIds } })
                    .concat(db.getCollection('combinations').find({ v: { '$in': assignmentIds } }))
                    .map(obj => {
                        obj.type = !obj.value ? 'key' : 'combination';
                        return obj;
                    }),
            locks = stripMetadata(db.getCollection('locks').find({ id: { '$in': unlockers.map(u => u.lockId) }}));
        
        //console.log('validType', validType, 'filter', JSON.stringify(assignmentsFilter), 'assignments', assignmentIds.join(' | '),
        //    'unlockers', unlockers.map(u => u.id).join(' | '));        

        return stripMetadata(unlockers).map(u => Object.assign(u, { lock: locks.find({ id: u.lockId }) }));
    },

    insert: (item, collectionName) => {
        if(!item)
            return false;
        
        let collection = db.getCollection(collectionName),
            existing = collection.find({ id: item.id });
        
        if(existing)
            return false;
        
        return collection.insert(item);
    },

    update: (item, collectionName) => {
        if(!item)
            return false;
        
        let collection = db.getCollection(collectionName),
            existing = stripMetadata(isingle(locks.find({ id: lock.id })));
        
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