const prisma = require('../../prismaClient');
const { createTask, getRecentTasks, markTaskComplete } = require('../../services/taskService');

jest.mock('../../prismaClient', () => ({
  task: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
}));

describe('TaskService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    it('should create a task successfully', async () => {
      const fakeTask = {
        id: 1,
        title: 'Buy milk',
        description: 'From the store',
        isCompleted: false,
        createdAt: new Date(),
      };

      prisma.task.create.mockResolvedValue(fakeTask);

      const result = await createTask('Buy milk', 'From the store');

      expect(prisma.task.create).toHaveBeenCalledWith({
        data: {
          title: 'Buy milk',
          description: 'From the store',
        },
      });
      expect(result).toEqual(fakeTask);
    });

    it('should throw an error if database fails', async () => {
      prisma.task.create.mockRejectedValue(new Error('Database error'));

      await expect(createTask('Buy milk', 'From the store'))
        .rejects
        .toThrow('Database error');
    });
  });

  describe('getRecentTasks', () => {
    it('should return up to 5 incomplete tasks ordered by newest first', async () => {
      const fakeTasks = [
        { id: 1, title: 'Task 1', description: 'Desc 1', isCompleted: false, createdAt: new Date() },
        { id: 2, title: 'Task 2', description: 'Desc 2', isCompleted: false, createdAt: new Date() },
      ];

      prisma.task.findMany.mockResolvedValue(fakeTasks);

      const result = await getRecentTasks();

      expect(prisma.task.findMany).toHaveBeenCalledWith({
        where: { isCompleted: false },
        orderBy: { createdAt: 'desc' },
        take: 5,
      });
      expect(result).toEqual(fakeTasks);
    });

    it('should return empty array when no tasks exist', async () => {
      prisma.task.findMany.mockResolvedValue([]);

      const result = await getRecentTasks();

      expect(result).toEqual([]);
    });

    it('should throw an error if database fails', async () => {
      prisma.task.findMany.mockRejectedValue(new Error('Database error'));

      await expect(getRecentTasks())
        .rejects
        .toThrow('Database error');
    });
  });

  describe('markTaskComplete', () => {
    it('should mark a task as complete successfully', async () => {
      const fakeTask = {
        id: 1,
        title: 'Buy milk',
        description: 'From the store',
        isCompleted: true,
        createdAt: new Date(),
      };

      prisma.task.update.mockResolvedValue(fakeTask);

      const result = await markTaskComplete(1);

      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { isCompleted: true },
      });
      expect(result).toEqual(fakeTask);
    });

    it('should throw an error if database fails', async () => {
      prisma.task.update.mockRejectedValue(new Error('Database error'));

      await expect(markTaskComplete(1))
        .rejects
        .toThrow('Database error');
    });
  });
});