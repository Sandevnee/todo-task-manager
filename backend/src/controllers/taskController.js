const taskService = require('../services/taskService');

const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      const error = new Error('Title and description are required');
      error.statusCode = 400;
      throw error;
    }

    const task = await taskService.createTask(title, description);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

const getRecentTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getRecentTasks();

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

const markTaskComplete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const taskId = Number(id);

    if (!Number.isInteger(taskId) || taskId <= 0) {
      const error = new Error('Invalid task id');
      error.statusCode = 400;
      throw error;
    }

    const task = await taskService.markTaskComplete(taskId);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  createTask,
  getRecentTasks,
  markTaskComplete,
};