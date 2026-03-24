const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: [2, 'Comment must be at least 2 characters'],
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: ObjectId,
        ref: 'Product',
        required: true,
    },
}, { timestamps: { createdAt: 'created_at' } });


module.exports = mongoose.model('Comment', commentSchema);
