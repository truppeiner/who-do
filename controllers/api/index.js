const router = require('express').Router();

const eventRoutes = require('./event-routes');
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');

router.use('/events', eventRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);

module.exports = router;