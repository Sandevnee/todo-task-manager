import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { createTask, getRecentTasks, markTaskComplete } from './services/taskService';
import './index.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await getRecentTasks();
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = async (title, description) => {
    await createTask(title, description);
    await fetchTasks();
  };

  const handleMarkComplete = async (id) => {
    try {
      await markTaskComplete(id);
      await fetchTasks();
    } catch (err) {
      setError('Failed to update task. Please try again.');
    }
  };

  return (
    <>
      <div className="app-header">
        <h1 className="app-title">Task Manager</h1>
        <p className="app-subtitle">Stay organized, get things done</p>
      </div>
      <div className="app-container">
        {error && <p className="error-message">{error}</p>}
        <div className="main-layout">
          <TaskForm onTaskCreated={handleTaskCreated} />
          <TaskList tasks={tasks} onMarkComplete={handleMarkComplete} />
        </div>
      </div>
    </>
  );
};

export default App;