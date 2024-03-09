const router = require('express').Router();
const userRoutes = require('./api/usersRoutes');
const thoughtRoutes = require('./api/thoughtsRoutes');

// Prefix all routes defined in `usersRoutes` with `/users`
router.use('/users', userRoutes);

// Prefix all routes defined in `thoughtsRoutes` with `/thoughts`
router.use('/thoughts', thoughtRoutes);

module.exports = router;
