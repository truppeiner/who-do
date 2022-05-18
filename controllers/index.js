const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

<<<<<<< HEAD
router.use('/', homeRoutes);
=======
// added home routes
const homeRoutes = require('./homes-routes');

>>>>>>> develop
router.use('/api', apiRoutes);

// added homeroutes
router.use('/', homeRoutes);

module.exports = router;