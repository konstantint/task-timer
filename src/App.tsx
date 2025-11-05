import React, { useState, useEffect } from 'react';
import { useTimers } from './hooks/useTimers';
import { TimerItem } from './components/TimerItem';

const AddTaskForm: React.FC<{ onAdd: (name: string) => void }> = ({ onAdd }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter new task name..."
        className="flex-grow bg-transparent p-3 text-gray-900 dark:text-gray-100 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed"
        disabled={!name.trim()}
      >
        Add Task
      </button>
    </form>
  );
};

const App: React.FC = () => {
    const { timers, addTimer, removeTimer, toggleTimer, resetTimer, adjustTime } = useTimers();
    const [now, setNow] = useState(Date.now());
    
    useEffect(() => {
        const intervalId = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(intervalId);
    }, []);
    
    // Sort timers to show running ones first
    const sortedTimers = [...timers].sort((a, b) => (b.isRunning ? 1 : 0) - (a.isRunning ? 1 : 0));

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen font-sans">
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-200">
                        Task Timer
                    </h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Track your time, effortlessly.</p>
                </header>
                
                <div className="space-y-4 max-w-4xl mx-auto">
                    {sortedTimers.length === 0 ? (
                        <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                           <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">No tasks yet.</h2>
                           <p className="mt-2 text-gray-500 dark:text-gray-400">Add one below to start tracking your time!</p>
                        </div>
                    ) : (
                        sortedTimers.map(timer => (
                            <TimerItem
                                key={timer.id}
                                timer={timer}
                                now={now}
                                onToggle={toggleTimer}
                                onRemove={removeTimer}
                                onReset={resetTimer}
                                onAdjust={adjustTime}
                            />
                        ))
                    )}
                </div>
                
                <footer className="mt-10 max-w-4xl mx-auto">
                    <AddTaskForm onAdd={addTimer} />
                </footer>
            </main>
        </div>
    );
};

export default App;
