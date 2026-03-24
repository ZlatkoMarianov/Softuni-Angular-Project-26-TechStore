const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');

router.get('/profile',                 auth(), authController.getProfileInfo);
router.put('/profile',                 auth(), authController.editProfileInfo);
router.get('/favorites',               auth(), authController.getFavorites);
router.post('/favorites/:productId',   auth(), authController.addFavorite);
router.delete('/favorites/:productId', auth(), authController.removeFavorite);

module.exports = router;