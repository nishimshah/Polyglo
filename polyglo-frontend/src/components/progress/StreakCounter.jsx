import React from 'react';
import { Flame, Award, Calendar } from 'lucide-react';

const StreakCounter = ({ currentStreak, longestStreak }) => {
  const getStreakMessage = (streak) => {
    if (streak === 0) return "Start your learning streak today! 🚀";
    if (streak === 1) return "Great start! Keep it up! 💪";
    if (streak < 7) return "You're building momentum! 🔥";
    if (streak < 30) return "Amazing consistency! 🌟";
    if (streak < 100) return "You're on fire! 🔥🔥";
    return "Legendary streak! 🏆👑";
  };

  const getStreakColor = (streak) => {
    if (streak === 0) return "from-gray-400 to-gray-500";
    if (streak < 7) return "from-orange-400 to-orange-500";
    if (streak < 30) return "from-orange-500 to-red-500";
    if (streak < 100) return "from-red-500 to-pink-500";
    return "from-purple-500 to-pink-500";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="text-center mb-6">
        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getStreakColor(currentStreak)} flex items-center justify-center mx-auto mb-4 relative`}>
          <Flame className="w-10 h-10 text-white" />
          {currentStreak > 0 && (
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full min-w-[24px] h-6 flex items-center justify-center">
              {currentStreak}
            </div>
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-1">
          {currentStreak}-Day Streak
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {getStreakMessage(currentStreak)}
        </p>
      </div>

      {/* Streak Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <Flame className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-900">Current Streak</span>
          </div>
          <span className="text-lg font-bold text-orange-600">{currentStreak} days</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Award className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-900">Best Streak</span>
          </div>
          <span className="text-lg font-bold text-purple-600">{longestStreak} days</span>
        </div>
      </div>

      {/* Streak Goals */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Streak Goals</h4>
        <div className="space-y-2">
          {[
            { target: 7, label: "Week Warrior", icon: "🏃‍♂️" },
            { target: 30, label: "Month Master", icon: "🏅" },
            { target: 100, label: "Century Club", icon: "💯" },
            { target: 365, label: "Year Legend", icon: "👑" }
          ].map((goal) => (
            <div key={goal.target} className={`flex items-center justify-between p-2 rounded ${
              currentStreak >= goal.target ? 'bg-green-50 text-green-900' : 'text-gray-600'
            }`}>
              <span className="text-sm">
                {goal.icon} {goal.label}
              </span>
              <span className="text-sm font-medium">
                {currentStreak >= goal.target ? '✅' : `${goal.target} days`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreakCounter;
