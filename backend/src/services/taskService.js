const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const RECENT_TASKS_LIMIT = 5;

const createTask = async (title, description) => {
  const task = await prisma.task.create({
    data: {
      title,
      description,
    },
  });
  return task;
};

const getRecentTasks = async () => {
  const tasks = await prisma.task.findMany({
    where: {
      isCompleted: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: RECENT_TASKS_LIMIT,
  });
  return tasks;
};

const markTaskComplete = async (id) => {
  const task = await prisma.task.update({
    where: { id },
    data: { isCompleted: true },
  });
  return task;
};

module.exports = {
  createTask,
  getRecentTasks,
  markTaskComplete,
};