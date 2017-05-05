const lokijs =  require('lokijs'),
    fs =        require('fs'),
    path =      require('path'),
    lfsa =      require('lokijs/src/loki-fs-structured-adapter'),
    adapter =   new lfsa('loki'),
    dbFile =    path.join(__dirname, 'eurobank.keyman.db'),
    prefix =    '[DB]';

const data = require('./data.json');

var db = new lokijs(dbFile, { 
    persistenceMethod: 'fs',
    autosave: true, 
    autosaveInterval: 2000,
    autoload: true,
    autoloadCallback: function() {
        console.log(prefix, 'checking default collections');
        for(var collectionName of Object.keys(data.defaultCollections)) {
            var collection = db.getCollection('keys');
            if(!db.getCollection(collectionName)) {
                collection = db.addCollection(collectionName);
                console.log(prefix, `Adding default '${collectionName}'`);
                collection.insert(data.defaultCollections[collectionName]);
            }
        }
    }
});

module.exports = db;