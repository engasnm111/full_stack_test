import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { CheckSquare } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen font-sans text-gray-900">
      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Header */}
        <header className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <CheckSquare size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
            <p className="text-gray-500">Organize your work effectively</p>
          </div>
        </header>

        {/* Form */}
        <TaskForm />

        {/* Task List (Grid Layout) */}
        <TaskList />

      </main>
    </div>
  );
}

export default App;
