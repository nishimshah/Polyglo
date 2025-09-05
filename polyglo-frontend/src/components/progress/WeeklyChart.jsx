import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const WeeklyChart = ({ data }) => {
  if (!data) return null;

  const chartData = data.dates.map((date, index) => ({
    date,
    studyTime: data.study_time[index],
    lessons: data.lessons_completed[index],
    xp: data.xp_earned[index]
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'studyTime') return [`${value} min`, 'Study Time'];
              if (name === 'lessons') return [`${value}`, 'Lessons'];
              if (name === 'xp') return [`${value}`, 'XP Earned'];
              return [value, name];
            }}
          />
          <Legend />
          <Bar dataKey="studyTime" fill="#3B82F6" name="Study Time (min)" />
          <Bar dataKey="lessons" fill="#10B981" name="Lessons" />
          <Bar dataKey="xp" fill="#8B5CF6" name="XP Earned" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyChart;
