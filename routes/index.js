const express = require('express');
const webRoutes = require('./web');
const apiRoutes = require('./api');

const router = express.Router();

/**
 * Hubungkan Route API dan Route Web
 */
router.use('/api', apiRoutes);
router.use('/', webRoutes);

module.exports = router;
