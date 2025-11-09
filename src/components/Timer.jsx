import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ duration, onTimeUp, isActive = true, darkMode }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    try {
      return typeof duration === 'number' && duration > 0 ? duration : 0;
    } catch (error) {
      console.error('Invalid duration:', error);
      return 0;
    }
  });

  useEffect(() => {
    try {
      if (typeof duration === 'number' && duration > 0) {
        setTimeLeft(duration);
      }
    } catch (error) {
      console.error('Error setting timer duration:', error);
    }
  }, [duration]);

  useEffect(() => {
    if (!isActive) return;

    try {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            try {
              onTimeUp?.();
            } catch (error) {
              console.error('Error calling onTimeUp:', error);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } catch (error) {
      console.error('Error setting up timer:', error);
    }
  }, [isActive, onTimeUp]);

  const formatTime = (seconds) => {
    try {
      if (typeof seconds !== 'number' || seconds < 0) {
        return '00:00';
      }
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } catch (error) {
      console.error('Error formatting time:', error);
      return '00:00';
    }
  };

  const getTimeColor = () => {
    try {
      if (typeof duration !== 'number' || duration <= 0) {
        return darkMode ? 'text-slate-400' : 'text-gray-500';
      }
      const percentage = (timeLeft / duration) * 100;
      if (percentage <= 10) return 'text-red-500';
      if (percentage <= 25) return 'text-yellow-500';
      return darkMode ? 'text-green-400' : 'text-green-500';
    } catch (error) {
      console.error('Error getting time color:', error);
      return darkMode ? 'text-slate-400' : 'text-gray-500';
    }
  };

  return (
    <div className={`flex items-center gap-2 font-mono text-lg font-bold ${getTimeColor()}`}>
      <Clock size={20} />
      {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;