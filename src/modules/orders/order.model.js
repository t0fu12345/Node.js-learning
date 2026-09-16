const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
    items: [{
        foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
        snapshot_name: { type: String, required: true },
        snapshot_price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 }
    }],
    total_amount: { type: Number, required: true },
    status: { type: String, enum: ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'], default: 'PENDING' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
