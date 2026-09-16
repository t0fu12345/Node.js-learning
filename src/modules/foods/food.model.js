const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    sale_price: { type: Number },
    stock_quantity: { type: Number, required: true, default: 0 },
    is_available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
