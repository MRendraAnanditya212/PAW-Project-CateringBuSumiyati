const express = require('express');
const homeController = require('../controllers/homeController');

const router = express.Router();

/**
 * Routes Halaman Web Frontend (EJS)
 */
router.get('/', homeController.index);

module.exports = router;
