import { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { PlusCircle } from 'lucide-react';

export default function TaskForm() {
  const createTask = useTaskStore(state => state.createTask);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    createTask({ title, description, status: 'TODO' });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Create New Task</h2>
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="flex-1 space-y-3">
          <input
            type="text"
            placeholder="Task title (required)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
          />
        </div>
        <button
          type="submit"
          disabled={!title.trim()}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 rounded-lg font-medium transition-colors h-[42px]"
        >
          <PlusCircle size={20} />
          Add Task
        </button>
      </div>
    </form>
  );
}