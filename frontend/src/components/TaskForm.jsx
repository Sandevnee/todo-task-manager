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
    <div className="relative flex-1 bg-[#1a1335]/95 border border-purple-900/40 rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col">
      <h2 className="text-white text-base md:text-lg font-semibold mb-4 md:mb-6">
        Create New Task
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <div className="mb-3 mb:mb-4">
          <label className="block text-purple-100 text-xs md:text-sm font-medium mb-1.5 md:mb-2">
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
            className={`w-full bg-[#09070f] text-white border rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-sm placeholder:text-purple-300/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 ${
              titleError ? 'border-red-500' : 'border-purple-900/50'
            }`}
          />
          {titleError && (
            <p className="text-red-400 text-xs mt-1">{titleError}</p>
          )}
        </div>

        <div className="mb-4 md:mb-6 flex-1">
          <label className="block text-purple-100 text-xs md:text-sm font-medium mb-1.5 md:mb-2">
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
            className={`w-full bg-[#09070f] text-white border rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-sm placeholder:text-purple-300/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 resize-none ${
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
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
        >
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;