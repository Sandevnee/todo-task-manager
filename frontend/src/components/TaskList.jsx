import { ListTodo } from 'lucide-react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onMarkComplete }) => {
  return (
    <div className="relative flex-1 bg-[#1a1335]/95 border border-purple-900/40 rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-violet-500/10 hover:border-violet-500/40 transition-all duration-300 flex flex-col">
      <div className="relative z-10 flex flex-col flex-1">
        <h2 className="text-white text-base md:text-lg font-semibold mb-1">
          Latest Tasks
        </h2>
        <p className="text-purple-200/60 text-xs mb-4 md:mb-6">
          Showing latest 5 active tasks
        </p>

        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-8 md:py-16 bg-[#09070f] rounded-xl border border-purple-900/50">
            <div className="p-3 md:p-4 rounded-xl bg-[#1a1335] mb-3 md:mb-4 opacity-50">
              <ListTodo className="w-6 h-6 md:w-8 md:h-8 text-purple-300/50" />
            </div>
            <p className="text-purple-300/50 text-sm">No active tasks yet</p>
            <p className="text-purple-300/30 text-xs mt-1">
              Create your first task to get started
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 md:gap-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onMarkComplete={onMarkComplete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;