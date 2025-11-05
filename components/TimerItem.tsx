import React, { useMemo } from 'react';
import type { TimerState } from '../types';

interface TimerItemProps {
  timer: TimerState;
  now: number;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onReset: (id: string) => void;
  onAdjust: (id: string, seconds: number) => void;
}

const formatTime = (totalSeconds: number): string => {
    const seconds = Math.floor(totalSeconds) % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);
    const pad = (num: number) => String(num).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const TimerButton: React.FC<React.PropsWithChildren<{ onClick: () => void; className?: string }>> = ({ onClick, children, className = '' }) => (
    <button
        onClick={onClick}
        className={`px-2 py-1 text-xs font-medium rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent ${className}`}
    >
        {children}
    </button>
);

export const TimerItem: React.FC<TimerItemProps> = ({ timer, now, onToggle, onRemove, onReset, onAdjust }) => {
    const totalSeconds = useMemo(() => {
        const elapsed = timer.isRunning
            ? (now - timer.startTime) / 1000
            : 0;
        return Math.max(0, timer.accumulatedSeconds + elapsed);
    }, [timer.isRunning, timer.accumulatedSeconds, timer.startTime, now]);
    
    const bgColor = timer.isRunning ? 'bg-green-100 dark:bg-green-900/50' : 'bg-gray-100 dark:bg-gray-800';
    const borderColor = timer.isRunning ? 'border-green-300 dark:border-green-700' : 'border-gray-300 dark:border-gray-700';

    return (
      <div className={`p-4 rounded-lg border ${bgColor} ${borderColor} flex flex-col sm:flex-row items-center gap-4 shadow-sm`}>
          <p className="font-medium text-lg text-gray-800 dark:text-gray-200 flex-grow text-center sm:text-left">{timer.name}</p>
          
          <div className="flex items-center gap-2">
            <p className="font-mono text-2xl sm:text-3xl text-gray-900 dark:text-gray-100 tabular-nums">
                {formatTime(totalSeconds)}
            </p>
          </div>

          <div className="flex items-center justify-center flex-wrap gap-2">
              <TimerButton onClick={() => onAdjust(timer.id, -600)} className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-gray-500">-10m</TimerButton>
              <TimerButton onClick={() => onAdjust(timer.id, 600)} className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-gray-500">+10m</TimerButton>
              
              <TimerButton 
                onClick={() => onToggle(timer.id)} 
                className={timer.isRunning ? 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400' : 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400'}
              >
                  {timer.isRunning ? 'Stop' : 'Start'}
              </TimerButton>
              <TimerButton onClick={() => onReset(timer.id)} className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400">Reset</TimerButton>
              <TimerButton onClick={() => onRemove(timer.id)} className="bg-red-500 text-white hover:bg-red-600 focus:ring-red-400">Remove</TimerButton>
          </div>
      </div>
    );
};