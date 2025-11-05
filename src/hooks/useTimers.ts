import { useState, useEffect, useCallback } from 'react';
import type { TimerState } from '../types';

const STORAGE_KEY = 'react-timers-list';

export const useTimers = () => {
  const [timers, setTimers] = useState<TimerState[]>([]);

  useEffect(() => {
    try {
      const storedTimers = localStorage.getItem(STORAGE_KEY);
      if (storedTimers) {
        setTimers(JSON.parse(storedTimers));
      }
    } catch (error) {
      console.error("Failed to load timers from localStorage", error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(timers));
    } catch (error) {
      console.error("Failed to save timers to localStorage", error);
    }
  }, [timers]);
  
  const addTimer = useCallback((name: string) => {
    const newTimer: TimerState = {
      id: crypto.randomUUID(),
      name: name.trim() || 'Untitled Task',
      isRunning: true,
      startTime: Date.now(),
      accumulatedSeconds: 0,
    };
    setTimers(prev => [...prev, newTimer]);
  }, []);

  const removeTimer = useCallback((id: string) => {
    setTimers(prev => prev.filter(t => t.id !== id));
  }, []);

  const toggleTimer = useCallback((id: string) => {
    setTimers(prev => prev.map(timer => {
      if (timer.id === id) {
        if (timer.isRunning) {
          return {
            ...timer,
            isRunning: false,
            accumulatedSeconds: timer.accumulatedSeconds + (Date.now() - timer.startTime) / 1000,
          };
        } else {
          return {
            ...timer,
            isRunning: true,
            startTime: Date.now(),
          };
        }
      }
      return timer;
    }));
  }, []);

  const resetTimer = useCallback((id: string) => {
    setTimers(prev => prev.map(timer => {
      if (timer.id === id) {
        return {
          ...timer,
          accumulatedSeconds: 0,
          startTime: timer.isRunning ? Date.now() : timer.startTime,
        };
      }
      return timer;
    }));
  }, []);
  
  const adjustTime = useCallback((id: string, seconds: number) => {
    setTimers(prev => prev.map(timer => {
      if (timer.id === id) {
        const newAccumulatedSeconds = timer.accumulatedSeconds + seconds;
        return {
          ...timer,
          accumulatedSeconds: Math.max(0, newAccumulatedSeconds),
        };
      }
      return timer;
    }));
  }, []);

  return { timers, addTimer, removeTimer, toggleTimer, resetTimer, adjustTime };
};
