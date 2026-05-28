const TaskCard = ({ task, onMarkComplete }) => {
  return (
    <div className="group flex items-center justify-between bg-[#09070f] border border-purple-900/50 rounded-xl px-4 py-3 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-200">
      <div className="flex-1 mr-4">
        <h3 className="text-white text-sm font-semibold group-hover:text-purple-300 transition-colors duration-200">
          {task.title}
        </h3>
        <p className="text-purple-200/60 text-xs mt-1">
          {task.description}
        </p>
      </div>
      <button
        onClick={() => onMarkComplete(task.id)}
        className="flex-shrink-0 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30"
      >
        Done
      </button>
    </div>
  );
};

export default TaskCard;