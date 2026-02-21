import * as taskService from '../services/task.service.js';

export const getTasks = async (req, res) => {
  const { status } = req.query;
  const tasks = await taskService.getAllTasks(status);
  res.status(200).json({ status: 'success', data: tasks });
};

export const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  
  if (!title) {
    return res.status(400).json({ status: 'error', message: 'Title is required' });
  }

  const task = await taskService.createTask({ title, description, status });
  res.status(201).json({ status: 'success', data: task });
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = await taskService.updateTask(id, { title, description, status });
  res.status(200).json({ status: 'success', data: task });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  await taskService.softDeleteTask(id);
  res.status(204).send();
};
