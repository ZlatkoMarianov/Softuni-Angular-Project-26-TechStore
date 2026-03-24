const { commentModel } = require('../models');

function getByProduct(req, res, next) {
    commentModel.find({ productId: req.params.id })
        .populate('author', 'username')
        .sort({ created_at: -1 })
        .then(comments => res.status(200).json(comments))
        .catch(next);
}

function create(req, res, next) {
    const { text } = req.body;
    const author = req.user._id;
    const productId = req.params.id;

    commentModel.create({ text, author, productId })
        .then(comment => comment.populate('author', 'username'))
        .then(comment => res.status(201).json(comment))
        .catch(next);
}

module.exports = { getByProduct, create };
