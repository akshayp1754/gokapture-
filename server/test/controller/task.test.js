// test/controllers/taskController.test.js
const { createTask } = require('../../controllers/todo');
const Task = require('../../schema/todoModel');
const httpMocks = require('node-mocks-http');

jest.mock('../../models/taskModel'); // Mock the Task model

describe('createTask Controller', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();

    req.user = { id: 1 }; // Mock user ID
    req.body = {
      title: 'Test Task',
      description: 'Test Description',
      status: 'pending',
      priority: 'high',
      dueDate: '2024-09-01',
    };
  });

  it('should create a new task and return 201 status code', async () => {
    Task.create.mockResolvedValue(req.body); // Mock the create function

    await createTask(req, res);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual(req.body);
    expect(Task.create).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Test Description',
      status: 'pending',
      priority: 'high',
      dueDate: '2024-09-01',
      userId: 1,
    });
  });

  it('should return 500 if task creation fails', async () => {
    Task.create.mockRejectedValue(new Error('Task creation failed'));

    await createTask(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({ error: 'Task creation failed' });
  });
});
