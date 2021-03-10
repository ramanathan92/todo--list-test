const router = require('express').Router();

const taskController = require('./tasks.controller');

router.post('/', taskController.task);
router.post('/addtask', taskController.addTask);

module.exports = router;