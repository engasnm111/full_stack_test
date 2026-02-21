import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  filter: 'ALL',

  setFilter: (status) => {
    set({ filter: status });
    get().fetchTasks(); 
  },

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const { filter } = get();
      const query = filter !== 'ALL' ? `?status=${filter}` : '';
      const response = await api.get(`/tasks${query}`);
      set({ tasks: response.data.data, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to fetch tasks', isLoading: false });
    }
  },

  createTask: async (taskData) => {
    try {
      await api.post('/tasks', taskData);
      get().fetchTasks();
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to create task' });
    }
  },

  updateTaskStatus: async (id, status) => {
    // Optimistic UI
    const previousTasks = get().tasks;
    set({
      tasks: previousTasks.map(task => 
        task.id === id ? { ...task, status } : task
      )
    });

    try {
      await api.put(`/tasks/${id}`, { status });
    } catch (err) {
      set({ tasks: previousTasks, error: 'Failed to update status' });
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      set({ tasks: get().tasks.filter(task => task.id !== id) });
    } catch (err) {
      set({ error: 'Failed to delete task' });
    }
  }
}));