import React from 'react';

const ProgressBar = ({ 
  label, 
  current, 
  target, 
  unit = '', 
  color = 'blue',
  showPercentage = true 
}) => {
  const percentage = Math.min((current / target) * 100, 100);
  const isCompleted = current >= target;

  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      bgLight: 'bg-blue-100',
      text: 'text-blue-600'
    },
    green: {
      bg: 'bg-green-500',
      bgLight: 'bg-green-100',
      text: 'text-green-600'
    },
    purple: {
      bg: 'bg-purple-500',
      bgLight: 'bg-purple-100',
      text: 'text-purple-600'
    },
    orange: {
      bg: 'bg-orange-500',
      bgLight: 'bg-orange-100',
      text: 'text-orange-600'
    },
    red: {
      bg: 'bg-red-500',
      bgLight: 'bg-red-100',
      text: 'text-red-600'
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">{label}</span>
        <div className="text-right">
          <span className={`text-sm font-semibold ${colors.text}`}>
            {current} / {target} {unit}
          </span>
          {showPercentage && (
            <span className="text-xs text-gray-500 ml-2">
              ({Math.round(percentage)}%)
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className={`w-full h-3 ${colors.bgLight} rounded-full overflow-hidden`}>
          <div
            className={`h-full ${colors.bg} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          >
            {/* Shimmer effect for completed goals */}
            {isCompleted && (
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            )}
          </div>
        </div>

        {/* Completion checkmark */}
        {isCompleted && (
          <div className="absolute right-0 -top-1 -mr-2">
            <div className="w-5 h-5 bg-white border-2 border-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Status message */}
      {isCompleted ? (
        <p className="text-xs text-green-600 font-medium">
          🎉 Goal completed! Great job!
        </p>
      ) : (
        <p className="text-xs text-gray-500">
          {target - current} more {unit} to reach your goal
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
