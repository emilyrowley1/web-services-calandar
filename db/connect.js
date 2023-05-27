const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

// checking to see if the db is initialized and if not then initializing it
const initDb = (callback) => {
    if (_db) {
        console.log('Db is already initialized');
        return callback(null, _db);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

// Theoretically this should never be used because the function
// above should take care of error checking and initializing db
// this will throw any errors though
const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db;
};


module.exports = {
    initDb,
    getDb
};