const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/', taskController.createTask);
router.get('/', taskController.getRecentTasks);
router.patch('/:id/done', taskController.markTaskComplete);

module.exports = router;