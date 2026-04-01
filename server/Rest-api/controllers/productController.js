const { productModel } = require('../models');

function getAll(req, res, next) {
    const { search, category } = req.query;
    const filter = {};
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (category && category !== 'All') filter.category = category;

    productModel.find(filter)
        .populate('owner', 'username email')
        .sort({ created_at: -1 })
        .then(products => res.status(200).json(products))
        .catch(next);
}

function getById(req, res, next) {
    productModel.findById(req.params.id)
        .populate('owner', 'username email')
        .then(product => {
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json(product);
        })
        .catch(next);
}

function create(req, res, next) {
    const { name, price, category, imageUrl, description } = req.body;
    const owner = req.user._id;

    productModel.create({ name, price, category, imageUrl, description, owner })
        .then(product => product.populate('owner', 'username email'))
        .then(product => res.status(201).json(product))
        .catch(next);
}

function update(req, res, next) {
    const { id } = req.params;
    const { name, price, category, imageUrl, description } = req.body;
    const userId = req.user._id;

    productModel.findOneAndUpdate(
        { _id: id, owner: userId },
        { name, price, category, imageUrl, description },
        { new: true, runValidators: true }
    )
        .populate('owner', 'username email')
        .then(product => {
            if (!product) return res.status(403).json({ message: 'Not allowed or product not found' });
            res.status(200).json(product);
        })
        .catch(next);
}

function remove(req, res, next) {
    const { id } = req.params;
    const userId = req.user._id;

    productModel.findOneAndDelete({ _id: id, owner: userId })
        .then(product => {
            if (!product) return res.status(403).json({ message: 'Not allowed or product not found' });
            res.status(200).json({ message: 'Product deleted' });
        })
        .catch(next);
}

function getMine(req, res, next) {
    productModel.find({ owner: req.user._id })
        .populate('owner', 'username email')
        .sort({ created_at: -1 })
        .then(products => res.status(200).json(products))
        .catch(next);
}

module.exports = { getAll, getById, create, update, remove, getMine };
