const { ObjectId } = require('mongodb');
const { connectDB } = require('./db');

class NoteModel {
    async getCollection() {
        const db = await connectDB();
        return db.collection('note');
    }

    async getAll() {
        const collection = await this.getCollection();
        return await collection.find({}).toArray();
    }

    async getById(id) {
        const collection = await this.getCollection();
        return await collection.findOne({ _id: new ObjectId(id) });
    }

    async create(data) {
        const collection = await this.getCollection();
        const result = await collection.insertOne(data);
        return result;
    }

    async update(id, data) {
        const collection = await this.getCollection();
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
        )
        return result;
    }

    async delete(id) {
        const collection = await this.getCollection();
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        return result;
    }
}
module.exports = new NoteModel;