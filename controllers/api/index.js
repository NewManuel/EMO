const router = require('express').Router();
const userRoutes = require('./userRoutes');
const musicpageRoute = require('./musicpageRoute');
//const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
router.use('/musicpage', musicpageRoute);
//router.use('/projects', projectRoutes);

module.exports = router;
