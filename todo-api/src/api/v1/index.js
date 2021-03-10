const router = require('express').Router();

const healthcheckRoutes = require('./healthcheck');
const loginRoutes = require('./login');
const registrationRoutes = require('./registration');
const taskRoutes = require('./tasks');

router.use('/healthcheck', healthcheckRoutes);
router.use('/login', loginRoutes);
router.use('/registration', registrationRoutes);
router.use('/tasks', taskRoutes);


module.exports = router;
