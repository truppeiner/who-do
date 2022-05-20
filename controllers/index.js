const router = require('express').Router();
const apiRoutes = require('./api');
const directoryRoutes = require('./directory-routes');

router.use('/', directoryRoutes);
router.use('/api', apiRoutes);

module.exports = router;