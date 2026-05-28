import { useState } from 'react';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!title.trim()) {
      setTitleError('Title is required');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!description.trim()) {
      setDescriptionError('Description is required');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    if (!isValid) return;

    try {
      setIsSubmitting(true);
      await onTaskCreated(title, description);
      setTitle('');
      setDescription('');
    } catch (err) {
      // error handled in App.jsx with Swal
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex-1 bg-[#1a1335]/95 border border-purple-900/40 rounded-2xl p-6 shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/40 transition-all duration-300">
      <h2 className="text-white text-lg font-semibold mb-6">
        Create New Task
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-purple-100 text-sm font-medium mb-2">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value.trim()) setTitleError('');
            }}
            placeholder="Enter task title"
            disabled={isSubmitting}
            className={`w-full bg-[#09070f] text-white border rounded-lg px-4 py-2.5 text-sm placeholder:text-purple-300/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 ${
              titleError ? 'border-red-500' : 'border-purple-900/50'
            }`}
          />
          {titleError && (
            <p className="text-red-400 text-xs mt-1">{titleError}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-purple-100 text-sm font-medium mb-2">
            Description <span className="text-red-400">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (e.target.value.trim()) setDescriptionError('');
            }}
            placeholder="Enter task description"
            disabled={isSubmitting}
            rows={4}
            className={`w-full bg-[#09070f] text-white border rounded-lg px-4 py-2.5 text-sm placeholder:text-purple-300/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 resize-none ${
              descriptionError ? 'border-red-500' : 'border-purple-900/50'
            }`}
          />
          {descriptionError && (
            <p className="text-red-400 text-xs mt-1">{descriptionError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;