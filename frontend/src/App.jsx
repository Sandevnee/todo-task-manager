import { useState, useEffect } from 'react';
import { ListTodo } from 'lucide-react';
import Swal from 'sweetalert2';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { createTask, getRecentTasks, markTaskComplete } from './services/taskService';
import './index.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await getRecentTasks();
      setTasks(response.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = async (title, description) => {
    try{
      await createTask(title, description);
      await fetchTasks();
      Swal.fire({
        icon: 'success',
        title: 'Task Added!',
        text: `"${title}" has been added to your list.`,
        background: '#1a1335',
        color: '#ffffff',
        confirmButtonColor: '#10b981',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Failed to create task. Please try again.',
        background: '#1a1335',
        color: '#ffffff',
        confirmButtonColor: '#10b981',
      });
    }
  };

  const handleMarkComplete = async (id) => {
    try {
      await markTaskComplete(id);
      await fetchTasks();
      Swal.fire({
        icon: 'success',
        title: 'Task Completed!',
        text: 'Great job! Task has been marked as done.',
        background: '#1a1335',
        color: '#ffffff',
        confirmButtonColor: '#10b981',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Failed to update task. Please try again.',
        background: '#1a1335',
        color: '#ffffff',
        confirmButtonColor: '#10b981',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#09070f] relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Top left corner - Purple semi-circles */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-purple-600/20 rounded-full"></div>
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/25 rounded-full"></div>
        {/* Top right - Violet geometric shapes */}
        <div className="absolute top-20 right-10 w-40 h-40 bg-violet-500/15 rounded-2xl rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-indigo-500/20 rounded-full"></div>
        {/* Bottom left - Purple patterns */}
        <div className="absolute bottom-10 left-20 w-32 h-32 bg-fuchsia-500/15 rounded-full"></div>
        <div className="absolute bottom-32 left-10 w-20 h-20 bg-purple-400/20 rounded-lg rotate-12"></div>
        {/* Bottom right - Large purple semi-circle */}
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-purple-600/25 to-violet-600/15 rounded-full"></div>
        {/* Center accents - Floating outlined shapes */}
        <div className="absolute top-1/3 left-1/4 w-16 h-16 border-2 border-violet-500/20 rounded-lg rotate-45"></div>
        <div className="absolute top-2/3 right-1/4 w-12 h-12 border-2 border-purple-500/20 rounded-full"></div>
        {/* Decorative lines */}
        <div className="absolute top-1/4 right-0 w-1 h-32 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-1 h-24 bg-gradient-to-b from-transparent via-violet-500/30 to-transparent"></div>
        <div className="absolute top-1/2 right-20 w-24 h-0.5 bg-gradient-to-r from-transparent via-indigo-400/25 to-transparent rotate-12"></div>
        <div className="absolute bottom-1/3 left-32 w-32 h-0.5 bg-gradient-to-r from-purple-400/25 via-transparent to-transparent -rotate-6"></div>
        {/* Additional lines */}
        <div className="absolute top-40 left-1/4 w-40 h-0.5 bg-gradient-to-r from-transparent via-violet-400/20 to-transparent"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-0.5 bg-gradient-to-r from-fuchsia-400/20 via-transparent to-transparent rotate-45"></div>
        {/* Small accent dots */}
        <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-purple-500/25 rounded-sm rotate-45"></div>
        <div className="absolute top-3/4 right-1/3 w-8 h-8 bg-violet-500/20 rounded-full"></div>
        <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-indigo-500/22 rounded-full"></div>
      </div>
      

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center pt-6 pb-6 px-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg shadow-purple-500/30">
            <ListTodo className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Task Manager</h1>
        </div>
        <p className="text-purple-200/60 text-xs md:text-sm">Stay Organized. Stay Ahead.</p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 pb-6 flex flex-col">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-1">
          <TaskForm onTaskCreated={handleTaskCreated} />
          <TaskList tasks={tasks} onMarkComplete={handleMarkComplete} />
        </div>
      </div>

    </div>
  );
};

export default App;