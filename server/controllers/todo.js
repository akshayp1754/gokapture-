const Task = require("../schema/todoModel");
const { Op } = require('sequelize');

exports.createTask = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      userId: req.user.id,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: `Error creating task: ${err.message}` });
  }
};

exports.getTasks = async (req, res) => {
  const { page = 1, limit = 10, status, priority, dueDate, search } = req.query;

  let filters = {
    userId: req.user.id,
  };

  if (status) filters.status = status;
  if (priority) filters.priority = priority;
  if (dueDate) filters.dueDate = dueDate;

  if (search) {
    filters = {
      ...filters,
      [Op.and]: [
        filters,
        {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { description: { [Op.iLike]: `%${search}%` } },
          ],
        },
      ],
    };
  }

  try {
    const tasks = await Task.findAll({
      where: filters,
      limit: parseInt(limit, 10),
      offset: (page - 1) * parseInt(limit, 10),
    });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: `Error retrieving tasks: ${err.message}` });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, dueDate } = req.body;

  try {
    let task = await Task.findOne({ where: { id, userId: req.user.id } });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task = await task.update({ title, description, status, priority, dueDate });

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: `Error updating task: ${err.message}` });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.destroy();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: `Error deleting task: ${err.message}` });
  }
};
