const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'user';

let db;

async function connectDB() {
    if (db) return db;

    try {
        const client = new MongoClient(url);
        await client.connect();
        console.log('Kết nối thành công mongodb');
        db = client.db(dbName);
        return db;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
module.exports = { connectDB };