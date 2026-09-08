const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'note';

let db;

async function connectDB() {
    if (db) return db;

    try {
        const client = new MongoClient(url);
        await client.connect();
        console.log('Kết nối thành công đến MongoDB');
        db = client.db(dbName);
        return db;
    } catch (error) {
        console.error('Lỗi kết nối MongoDB:', error);
        throw error;
    }
}

module.exports = { connectDB };
