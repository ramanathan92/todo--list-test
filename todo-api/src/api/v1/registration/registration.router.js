const router = require('express').Router();

const registrationController = require('./registration.controller');

router.post('/', registrationController.registration);

module.exports = router;