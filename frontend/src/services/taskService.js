import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const createTask = async (title, description) => {
  const response = await apiClient.post('/tasks', { title, description });
  return response.data;
};

const getRecentTasks = async () => {
  const response = await apiClient.get('/tasks');
  return response.data;
};

const markTaskComplete = async (id) => {
  const response = await apiClient.patch(`/tasks/${id}/done`);
  return response.data;
};

export { createTask, getRecentTasks, markTaskComplete };