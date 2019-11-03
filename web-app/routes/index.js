const { Router } = require('express');

const router = Router();

// Routes
const sampleRoutes = require('./sample.routes');

// Use routes
// Can add middleware
router.use('/', sampleRoutes);

module.exports = router;
