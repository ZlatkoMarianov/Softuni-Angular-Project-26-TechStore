const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Name must be at least 3 characters'],
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative'],
    },
    category: {
        type: String,
        required: true,
        enum: ['Phone', 'Laptop', 'Tablet', 'Accessory'],
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'Description must be at least 10 characters'],
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Product', productSchema);