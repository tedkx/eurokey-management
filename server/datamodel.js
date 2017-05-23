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
    dbData = (collectionName) => stripMetadata(db.getCollection(collectionName).data),
    dbFind = (collectionName, filter) => {
        //console.log('collectionName', collectionName);
        return Object.keys(filter || {}).length == 0
            ? dbData(collectionName)
            : stripMetadata(db.getCollection(collectionName).find(filter))
    };
    

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
        let filter = !!branch ? { id: { '$in': dbFind('branchLocks', { branchId: branch }).map(l => l.lockId) } } : {},
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
            locks = datamodel.getLocks((user || {}).branch),
            lockIds = locks.map(l => l.id),
            unlockers = validType
                ? dbFind(type, { id: { '$in': lockIds } }).map(ul => Object.assign(ul, { type }))
                : dbFind('keys', { lockId: { '$in': lockIds } }).map(k => Object.assign(k, { type: 'key' }))
                    .concat(dbFind('combinations', { lockId: { '$in': lockIds } }).map(c => Object.assign(c, { type: 'combination' }))),
            assignmentDefinitions = dbFind('assignmentDefinitions', { id: { '$in': unlockers.map(u => u.id) } }),
            users = dbData('users'),
            branches = dbData('branches');
        
        return stripMetadata(unlockers).map(u => {
            let definition = assignmentDefinitions.find(a => a.id == u.id && a.type == u.type && a.assignee == u.assignee),
                user = Array.isArray(u.features) && u.features.indexOf('branch-only') >= 0
                    ? branches.filter(b => b.id == u.assignee).map(b => ({ firstName: b.title, lastName: '', role: 'vault' }))[0] || {}
                    : users.find(user => user.username == u.assignee) || {}

            return Object.assign(u, { 
                lockTitle: locks.find(l => l.id == u.lockId).title,
                level: (definition || {}).level,
                assigneeFirstName: user.firstName,
                assigneeLastName: user.lastName,
                assigneeRole: user.role
            });
        });            
    },

    getPendingAcceptancesForBranch: (branch) => datamodel.getUnlockers({ branch }).filter(ul => ul.acceptanceDate == null),
    getPendingAcceptancesForUser: (user) => datamodel.getUnlockers({ branch: user.branch }).filter(ul => ul.acceptanceDate == null && ul.assignee == user.username),

    getAssignmentDefinitionssForUnlocker: (type, id) => {
        let assignments = dbFind('assignmentDefinitions', { '$and': [ { type }, { id } ] })
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

    getEmployeesForAssignment: (type, id, onlyValidCustodians) => {
        let unlocker = dbFind(type + 's', { id }),
            assignmentDefinitions = dbFind('assignmentDefinitions', { '$and': [{ type }, { id },] } ).filter(ass => ass.assignee !== unlocker.assignee),
            users = dbData('users').filter(u => u.username !== unlocker.assignee).map(u => Object.assign(u, { level: (assignmentDefinitions.find(ass => ass.assignee == u.username) || {}).level }));
        
        if(onlyValidCustodians === true)
            users = users.filter(u => !!u.level);

        users.sort((a, b) => a.level === 'owner' ? -1 
            : b.level === 'owner' ? 1 
            : a.level === 'sub1' ? -1 
            : b.level === 'sub1' ? 1
            : a.level === 'sub2' ? -1
            : b.level === 'sub2' ? 1
            : b.role === 'teller' ? 1
            : -1);
        return users;
    },

    assignToUnlocker: (user, type, id, { assignee, eventTypeId, reason }) => {
        let collectionName = type + 's',
            unlocker = db.getCollection(collectionName).find({ id })[0],
            eventId = null,
            now = (new Date()).toISOString();

        datamodel.update(Object.assign(unlocker, { assignee, assignDate: (new Date()).toISOString(), acceptanceDate: null }), collectionName);
        if(!!eventTypeId) {
            let events = db.getCollection('events');
            eventId = events.length;
            datamodel.insert({ id: eventId, type: eventTypeId, reason, created: now, branch: user.branch, creator: user.username }, 'events');
        }
        let auditId = db.getCollection('auditEntries').length;
        datamodel.insert({ 
            id: auditId, 
            eventId,
            description: "Ανάθεση " + (type == 'key' ? 'κλειδιού' : 'συνδυασμού') + ' σε χρήστη ' + assignee, 
            branch: user.branch,
            entityId: id, 
            entityType: type, 
            creator: user.username,
            relatedUserId: assignee,
            created: now
        }, 'auditEntries');
    },

    getUserUnlockers: (user) => datamodel.getUnlockers(user).filter(ul => ul.acceptanceDate != null),
    acceptUnlocker: (type, id, user) => {
        let unlocker = db.getCollection(type + 's').find({ id }),
            now = (new Date()).toISOString();
        datamodel.update(Object.assign(unlocker, { assignee: user.username, acceptanceDate: now }));

        let auditId = db.getCollection('auditEntries').length;
        datamodel.insert({ 
            id: auditId, 
            description: "Αποδοχή " + (type == 'key' ? 'κλειδιού' : 'συνδυασμού') + ' από χρήστη ' + user.username, 
            branch: user.branch,
            entityId: id, 
            entityType: type, 
            creator: user.username,
            relatedUserId: user.username,
            created: now
        }, 'auditEntries');
    },

    getEvents: (branch) => {
        let eventTypes = dbData('eventTypes'),
            unlockers = datamodel.getUnlockers({ branch }),
            users = dbData('users'),
            filter = !!branch ? { branch } : {};
        return dbFind('events', filter).map(ev => {
            let creator = users.find(u => u.username == ev.creator);
            return Object.assign(ev, { 
                typeTitle: (eventTypes.find(t => t.id == ev.type) || {}).title,
                creatorFirstName: creator.firstName,
                creatorLastName: creator.lastName,
                creatorRole: creator.role,
            })
        })
    },

    getAuditEntries: (branch, eventId) => {
        let unlockers = datamodel.getUnlockers({ branch }),
            eventTypes = dbData('eventTypes'),
            users = dbData('users'),
            filter = !!eventId && !! branch ? { '$and': [ { branch }, { eventId }]}
                : !!eventId ? { eventId }
                : !!branch ? { branch }
                : {};
        console.log('filter is', filter, 'returning');
        return dbFind('auditEntries', filter).map(au => {
            let creator = users.find(u => u.username == ev.creator) || {},
                related = users.find(u => u.username == ev.relatedUserId) || {},
                event = !au.eventId ? null : dbFind('events', { id: au.eventId });
            return Object.assign(au, {
                entityTitle: (unlockers.find(u => au.entityId == u.id && au.entityType == u.type) || {}).lockTitle,
                eventTypeTitle: event == null ? null : (eventTypes.find(t => event.type == au.eventId) || {}).title,
                creatorFirstName: creator.firstName,
                creatorLastName: creator.lastName,
                creatorRole: creator.role,
                relatedFirstName: related.firstName,
                relatedLastName: related.lastName,
                relatedRole: related.role
            });
        });
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
            existing = stripMetadata(single(collection.find({ id: item.id })));
        
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