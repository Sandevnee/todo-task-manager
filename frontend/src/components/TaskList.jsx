import TaskCard from './TaskCard';

const TaskList = ({ tasks, onMarkComplete }) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list-container">
        <h2>Latest Tasks</h2>
        <p className="no-tasks-message">No tasks yet. Add one!</p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <h2>Recent Tasks</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onMarkComplete={onMarkComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;