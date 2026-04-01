const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { productController, commentController } = require('../controllers');

router.get('/',       productController.getAll);
router.post('/',      auth(), productController.create);
router.get('/my',     auth(), productController.getMine);
router.get('/:id',    productController.getById);
router.put('/:id',    auth(), productController.update);
router.delete('/:id', auth(), productController.remove);

// Comments
router.get('/:id/comments',  commentController.getByProduct);
router.post('/:id/comments', auth(), commentController.create);

module.exports = router;
