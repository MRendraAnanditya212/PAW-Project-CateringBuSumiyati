const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();

/**
 * Routes REST API (/api/...)
 */
router.get('/status', apiController.getStatus);
router.get('/produk', apiController.getProduk);
router.get('/produk/:id', apiController.getProdukById);

module.exports = router;
