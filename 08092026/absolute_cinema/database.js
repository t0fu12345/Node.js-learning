const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'QuanLyRapChieuPhim';

let db;

async function connectDB() {
    if (db) return db; // Nếu đã kết nối rồi thì dùng lại instance cũ
    
    try {
        const client = new MongoClient(url);
        await client.connect();
        console.log('✅ Kết nối thành công đến MongoDB');
        db = client.db(dbName);
        return db;
    } catch (error) {
        console.error('❌ Lỗi kết nối MongoDB:', error);
        throw error;
    }
}

module.exports = { connectDB };
