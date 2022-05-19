const router = require('express').Router();

const apiRoutes = require('./api/');
// added home routes
const homeRoutes = require('./homes-routes');

// added homeroutes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;