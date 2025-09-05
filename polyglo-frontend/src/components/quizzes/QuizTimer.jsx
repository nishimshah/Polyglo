import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

const QuizTimer = ({ timeLimit, onTimeUp, isActive = true }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // Convert minutes to seconds
  
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, isActive, onTimeUp]);
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const getTimerColor = () => {
    const percentageLeft = (timeLeft / (timeLimit * 60)) * 100;
    if (percentageLeft <= 10) return 'text-red-600 bg-red-100';
    if (percentageLeft <= 25) return 'text-amber-600 bg-amber-100';
    return 'text-blue-600 bg-blue-100';
  };
  
  const getProgressColor = () => {
    const percentageLeft = (timeLeft / (timeLimit * 60)) * 100;
    if (percentageLeft <= 10) return 'bg-red-500';
    if (percentageLeft <= 25) return 'bg-amber-500';
    return 'bg-blue-500';
  };
  
  const progressPercentage = (timeLeft / (timeLimit * 60)) * 100;
  
  return (
    <div className={`rounded-xl p-4 ${getTimerColor()} transition-colors duration-300`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span className="font-semibold">Time Remaining</span>
          {timeLeft <= 60 && (
            <AlertTriangle className="w-4 h-4 animate-pulse" />
          )}
        </div>
        <span className="text-2xl font-bold font-mono">
          {formatTime(timeLeft)}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="bg-white/50 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor()}`}
          style={{ width: `${Math.max(0, progressPercentage)}%` }}
        ></div>
      </div>
      
      {timeLeft <= 60 && timeLeft > 0 && (
        <p className="text-sm mt-2 font-medium animate-pulse">
          ⚠️ Less than 1 minute remaining!
        </p>
      )}
      
      {timeLeft === 0 && (
        <p className="text-sm mt-2 font-bold">
          ⏰ Time's up!
        </p>
      )}
    </div>
  );
};

export default QuizTimer;
