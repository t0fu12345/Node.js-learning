const { ObjectId } = require('mongodb');
const { connectDB } = require('../db');

class UserModel {
    async getCollection() {
        const db = await connectDB();
        return db.collection('users');
    }

    async getAll(page = 1, limit = 10) {
        try {
            const collection = await this.getCollection();
            const skip = (page - 1) * limit;

            const users = await collection.find({})
                .project({ password: 0 })
                .skip(skip)
                .limit(limit)
                .toArray();

            const totalUsers = await collection.countDocuments();
            const totalPages = Math.ceil(totalUsers / limit);

            return {
                users,
                totalUsers,
                totalPages,
                currentPage: page
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getByUsernameOrEmail(identifier) {
        try {
            const collection = await this.getCollection();
            const val = String(identifier).trim();
            return await collection.findOne({
                $or: [
                    { username: val },
                    { email: val }
                ]
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const collection = await this.getCollection();
            return await collection.findOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.error('Lỗi khi lấy user theo ID:', error);
            throw error;
        }
    }

    async create(data) {
        try {
            const collection = await this.getCollection();
            const result = await collection.insertOne(data);
            return result;
        } catch (error) {
            console.error('Lỗi khi tạo user:', error);
            throw error;
        }
    }

    async update(id, data) {
        try {
            const collection = await this.getCollection();
            const result = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: data }
            );
            return result;
        } catch (error) {
            console.error('Lỗi khi cập nhật user:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const collection = await this.getCollection();
            return await collection.deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.error('Lỗi khi xoá user:', error);
            throw error;
        }
    }

}
module.exports = new UserModel;