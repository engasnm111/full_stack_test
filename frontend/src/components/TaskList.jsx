import { useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Trash2 } from 'lucide-react';

export default function TaskList() {
  const { tasks, isLoading, error, fetchTasks, updateTaskStatus, deleteTask, filter, setFilter } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (isLoading) return <div className="text-center py-10 text-gray-500 animate-pulse">Loading tasks...</div>;
  if (error) return <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex gap-2 pb-4 border-b border-gray-200 overflow-x-auto">
        {['ALL', 'TODO', 'IN_PROGRESS', 'DONE'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === status 
                ? 'bg-gray-800 text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Card Task */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <h3 className="font-semibold text-lg text-gray-800 break-words">{task.title}</h3>
            {task.description && (
              <p className="text-gray-500 text-sm mt-2 line-clamp-3">{task.description}</p>
            )}
            
            <div className="mt-5 flex items-center justify-between pt-4 border-t border-gray-50">
              <select
                value={task.status}
                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                className={`text-sm rounded-md p-1.5 font-medium outline-none cursor-pointer ${
                  task.status === 'DONE' ? 'bg-green-100 text-green-700' : 
                  task.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-gray-100 text-gray-700'
                }`}
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>

              <button 
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-2 opacity-0 group-hover:opacity-100 focus:opacity-100"
                title="Delete Task"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-400">
            <p className="text-lg">No tasks found</p>
            <p className="text-sm">Enjoy your free time!</p>
          </div>
        )}
      </div>
    </div>
  );
}