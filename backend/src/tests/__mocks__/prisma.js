const mockPrisma = {
  task: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
};

module.exports = mockPrisma;