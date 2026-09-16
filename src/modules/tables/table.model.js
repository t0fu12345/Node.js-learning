const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    tableName: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    status: { type: String, enum: ['AVAILABLE', 'OCCUPIED'], default: 'AVAILABLE' }
}, { timestamps: true });

module.exports = mongoose.model('Table', tableSchema);
