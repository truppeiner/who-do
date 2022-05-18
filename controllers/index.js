const router = require('express').Router();
const apiRoutes = require('./api');

// added home routes
const homeRoutes = require('./homes-routes');

router.use('/api', apiRoutes);

// added homeroutes
router.use('/', homeRoutes);

module.exports = router;