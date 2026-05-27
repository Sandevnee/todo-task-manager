const TaskCard = ({ task, onMarkComplete }) => {
  return (
    <div className="task-card">
      <div className="task-card-content">
        <h3 className="task-card-title">{task.title}</h3>
        <p className="task-card-description">{task.description}</p>
      </div>
      <button
        className="done-button"
        onClick={() => onMarkComplete(task.id)}
      >
        Done
      </button>
    </div>
  );
};

export default TaskCard;