const request = require('supertest');
const app = require('../../app');
const prisma = require('../../prismaClient');

jest.mock('../../prismaClient', () => ({
  task: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
}));

describe('Task Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/tasks', () => {
    it('should create a task and return 201', async () => {
      const fakeTask = {
        id: 1,
        title: 'Buy milk',
        description: 'From the store',
        isCompleted: false,
        createdAt: new Date(),
      };

      prisma.task.create.mockResolvedValue(fakeTask);

      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Buy milk', description: 'From the store' });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Buy milk');
    });

    it('should return 400 if title is missing', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ description: 'From the store' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return 400 if description is missing', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Buy milk' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should return 400 if both fields are missing', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/tasks', () => {
    it('should return 200 and list of tasks', async () => {
      const fakeTasks = [
        { id: 1, title: 'Task 1', description: 'Desc 1', isCompleted: false, createdAt: new Date() },
        { id: 2, title: 'Task 2', description: 'Desc 2', isCompleted: false, createdAt: new Date() },
      ];

      prisma.task.findMany.mockResolvedValue(fakeTasks);

      const response = await request(app).get('/api/tasks');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
    });

    it('should return 200 and empty array when no tasks', async () => {
      prisma.task.findMany.mockResolvedValue([]);

      const response = await request(app).get('/api/tasks');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('PATCH /api/tasks/:id/done', () => {
    it('should mark task as complete and return 200', async () => {
      const fakeTask = {
        id: 1,
        title: 'Buy milk',
        description: 'From the store',
        isCompleted: true,
        createdAt: new Date(),
      };

      prisma.task.update.mockResolvedValue(fakeTask);

      const response = await request(app).patch('/api/tasks/1/done');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.isCompleted).toBe(true);
    });

    it('should return 500 if database fails', async () => {
      prisma.task.update.mockRejectedValue(new Error('Database error'));

      const response = await request(app).patch('/api/tasks/1/done');

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });
});