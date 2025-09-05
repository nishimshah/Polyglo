// import React, { useState, useEffect } from 'react';
// import { useQuery } from 'react-query';
// import { Calendar, Clock, Trophy, TrendingUp, Target, BookOpen, Flame, Award, Star } from 'lucide-react';
// import Header from '../../components/common/Header';
// import ProgressBar from '../../components/progress/ProgressBar';
// import StreakCounter from '../../components/progress/StreakCounter';
// import WeeklyChart from '../../components/progress/WeeklyChart';
// import Loading from '../../components/common/Loading';
// import api from '../../services/api';

// const ProgressDashboard = () => {
//   const { data: progressData, isLoading, error } = useQuery(
//     'progress-summary',
//     async () => {
//       const response = await api.get('/progress/summary/');
//       return response.data;
//     },
//     {
//       refetchInterval: 30000, // Refetch every 30 seconds
//     }
//   );

//   const { data: chartData } = useQuery(
//     'weekly-progress-chart',
//     async () => {
//       const response = await api.get('/progress/weekly-chart/');
//       return response.data;
//     }
//   );

//   if (isLoading) return <Loading />;

//   if (error) {
//     return (
//       <div className="min-h-screen bg-duo-gray-light">
//         <Header />
//         <div className="container mx-auto px-6 py-8">
//           <div className="text-center">
//             <p className="text-duo-red font-bold text-lg mb-4">Error loading progress data: {error.message}</p>
//             <button 
//               onClick={() => window.location.reload()}
//               className="bg-duo-green text-white px-6 py-3 rounded-2xl hover:bg-duo-green-dark transition-colors font-black uppercase tracking-wide"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const {
//     user_progress = {},
//     current_streak = 0,
//     longest_streak = 0,
//     today_activity = {},
//     weekly_stats = {},
//     monthly_stats = {},
//     recent_activities = []
//   } = progressData || {};

//   return (
//     <div className="min-h-screen bg-duo-gray-light">
//       <Header />
      
//       <div className="container mx-auto px-6 py-8">
//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl md:text-5xl font-black text-dark mb-3">Your Progress</h1>
//           <p className="text-xl text-light font-bold">Track your learning journey and achievements</p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {/* Total Study Time */}
//           <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-duo-blue">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-light mb-1 font-bold uppercase tracking-wide">Total Study Time</p>
//                 <p className="text-4xl font-black text-duo-blue">
//                   {Math.floor((user_progress.total_study_time || 0) / 60)}h {(user_progress.total_study_time || 0) % 60}m
//                 </p>
//               </div>
//               <div className="w-16 h-16 bg-duo-blue rounded-2xl flex items-center justify-center">
//                 <Clock className="w-8 h-8 text-white" />
//               </div>
//             </div>
//           </div>

//           {/* Lessons Completed */}
//           <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-duo-green">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-light mb-1 font-bold uppercase tracking-wide">Lessons Completed</p>
//                 <p className="text-4xl font-black text-duo-green">{user_progress.lessons_completed || 0}</p>
//               </div>
//               <div className="w-16 h-16 bg-duo-green rounded-2xl flex items-center justify-center">
//                 <BookOpen className="w-8 h-8 text-white" />
//               </div>
//             </div>
//           </div>

//           {/* Quizzes Completed */}
//           <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-duo-purple">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-light mb-1 font-bold uppercase tracking-wide">Quizzes Completed</p>
//                 <p className="text-4xl font-black text-duo-purple">{user_progress.quizzes_completed || 0}</p>
//               </div>
//               <div className="w-16 h-16 bg-duo-purple rounded-2xl flex items-center justify-center">
//                 <Trophy className="w-8 h-8 text-white" />
//               </div>
//             </div>
//           </div>

//           {/* Flashcards Reviewed */}
//           <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-duo-yellow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-light mb-1 font-bold uppercase tracking-wide">Flashcards Reviewed</p>
//                 <p className="text-4xl font-black text-duo-yellow">{user_progress.flashcards_reviewed || 0}</p>
//               </div>
//               <div className="w-16 h-16 bg-duo-yellow rounded-2xl flex items-center justify-center">
//                 <Target className="w-8 h-8 text-white" />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Today's Progress */}
//             <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
//               <h2 className="text-2xl font-black text-dark mb-8">Today's Progress</h2>
//               <div className="space-y-6">
//                 <ProgressBar
//                   label="Study Time"
//                   current={today_activity.study_time_minutes || 0}
//                   target={60} // 1 hour daily goal
//                   unit="min"
//                   color="blue"
//                 />
//                 <ProgressBar
//                   label="Lessons"
//                   current={today_activity.lessons_completed || 0}
//                   target={3} // 3 lessons daily goal
//                   unit="lessons"
//                   color="green"
//                 />
//                 <ProgressBar
//                   label="XP Earned"
//                   current={today_activity.xp_earned || 0}
//                   target={100} // 100 XP daily goal
//                   unit="XP"
//                   color="purple"
//                 />
//               </div>
//             </div>

//             {/* Weekly Chart */}
//             {chartData && (
//               <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
//                 <h2 className="text-2xl font-black text-dark mb-8">Weekly Activity</h2>
//                 <WeeklyChart data={chartData} />
//               </div>
//             )}

//             {/* Recent Activity */}
//             <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
//               <h2 className="text-2xl font-black text-dark mb-8">Recent Activity</h2>
//               <div className="space-y-4">
//                 {recent_activities.length > 0 ? (
//                   recent_activities.map((activity, index) => (
//                     <div key={index} className="flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-duo-green hover:shadow-lg transition-all duration-200">
//                       <div className="flex items-center space-x-6">
//                         <div className="w-12 h-12 bg-duo-blue rounded-2xl flex items-center justify-center">
//                           <Calendar className="w-6 h-6 text-white" />
//                         </div>
//                         <div>
//                           <p className="font-black text-dark text-lg">
//                             {new Date(activity.date).toLocaleDateString('en-US', { 
//                               weekday: 'long', 
//                               month: 'short', 
//                               day: 'numeric' 
//                             })}
//                           </p>
//                           <p className="text-light font-bold">
//                             {activity.study_time_minutes} min • {activity.lessons_completed} lessons • {activity.xp_earned} XP
//                           </p>
//                         </div>
//                       </div>
//                       <div className="w-8 h-8 bg-duo-green rounded-full flex items-center justify-center">
//                         <Star className="w-4 h-4 text-white" />
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-12">
//                     <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                     <p className="text-light font-bold text-xl">No recent activity found</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Streak Counter */}
//             <div className="bg-duo-yellow rounded-2xl p-8 text-white shadow-xl">
//               <div className="text-center">
//                 <Flame className="w-16 h-16 mx-auto mb-4 text-white" />
//                 <h3 className="text-2xl font-black mb-2 text-white">Streak Power!</h3>
//                 <div className="text-4xl font-black mb-2 text-white">{current_streak}</div>
//                 <p className="text-sm font-bold opacity-90 uppercase tracking-wide mb-4 text-white">Day Streak</p>
//                 <div className="bg-white bg-opacity-20 rounded-full h-3 mb-4">
//                   <div 
//                     className="bg-white h-3 rounded-full transition-all duration-500"
//                     style={{ width: `${Math.min((current_streak || 0) / (longest_streak || 1) * 100, 100)}%` }}
//                   ></div>
//                 </div>
//                 <p className="text-xs font-bold opacity-80 text-white">
//                   Longest: {longest_streak} days
//                 </p>
//               </div>
//             </div>

//             {/* Weekly Stats */}
//             <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
//               <h3 className="text-xl font-black text-dark mb-6">This Week</h3>
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <span className="text-light font-bold">Study Time</span>
//                   <span className="font-black text-dark text-xl">{weekly_stats.total_study_time || 0} min</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-light font-bold">Lessons</span>
//                   <span className="font-black text-duo-green text-xl">{weekly_stats.total_lessons || 0}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-light font-bold">XP Earned</span>
//                   <span className="font-black text-duo-blue text-xl">{weekly_stats.total_xp || 0}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-light font-bold">Active Days</span>
//                   <span className="font-black text-duo-purple text-xl">{weekly_stats.active_days || 0}/7</span>
//                 </div>
//               </div>
//             </div>

//             {/* Monthly Stats */}
//             <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
//               <h3 className="text-xl font-black text-dark mb-6">This Month</h3>
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <span className="text-light font-bold">Study Time</span>
//                   <span className="font-black text-dark text-xl">{monthly_stats.total_study_time || 0} min</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-light font-bold">Lessons</span>
//                   <span className="font-black text-duo-green text-xl">{monthly_stats.total_lessons || 0}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-light font-bold">XP Earned</span>
//                   <span className="font-black text-duo-blue text-xl">{monthly_stats.total_xp || 0}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-light font-bold">Active Days</span>
//                   <span className="font-black text-duo-purple text-xl">{monthly_stats.active_days || 0}/30</span>
//                 </div>
//               </div>
//             </div>

//             {/* Achievement Card */}
//             <div className="bg-duo-green rounded-2xl p-8 text-white shadow-xl">
//               <div className="text-center">
//                 <Award className="w-12 h-12 mx-auto mb-4 text-white" />
//                 <h3 className="text-lg font-black mb-2 text-white">Amazing Progress!</h3>
//                 <p className="text-white opacity-90 font-bold text-sm">
//                   Keep up the great work! You're on fire! 🔥
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProgressDashboard;

import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query'; // ✅ FIXED: Updated import
import { Calendar, Clock, Trophy, TrendingUp, Target, BookOpen, Flame, Award, Star } from 'lucide-react';
import Header from '../../components/common/Header';
import ProgressBar from '../../components/progress/ProgressBar';
import StreakCounter from '../../components/progress/StreakCounter';
import WeeklyChart from '../../components/progress/WeeklyChart';
import Loading from '../../components/common/Loading';
import api from '../../services/api';

const ProgressDashboard = () => {
  const queryClient = useQueryClient();

  // ✅ ENHANCED: Fetch progress summary with proper cache management
  const { 
    data: progressData, 
    isLoading, 
    error,
    refetch: refetchProgress
  } = useQuery({
    queryKey: ['progress-summary'],
    queryFn: async () => {
      const response = await api.get('/progress/summary/');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchIntervalInBackground: true, // Continue refetching in background
    refetchOnWindowFocus: true, // Refetch when window comes back into focus
  });

  // ✅ ENHANCED: Fetch weekly chart data
  const { 
    data: chartData,
    refetch: refetchChart
  } = useQuery({
    queryKey: ['weekly-progress-chart'],
    queryFn: async () => {
      const response = await api.get('/progress/weekly-chart/');
      return response.data;
    },
    staleTime: 1 * 60 * 1000, // 10 minutes
    refetchInterval: 60000, // Refetch every minute
  });

  // ✅ NEW: Listen for global app state changes and sync data
  useEffect(() => {
    // Listen for lesson completions, quiz completions, etc.
    const handleDataUpdate = () => {
      console.log('📊 Data updated, refreshing progress dashboard...');
      
      // Invalidate all related queries to force fresh data
      queryClient.invalidateQueries({ queryKey: ['progress-summary'] });
      queryClient.invalidateQueries({ queryKey: ['weekly-progress-chart'] });
      queryClient.invalidateQueries({ queryKey: ['user-progress'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-courses'] });
      queryClient.invalidateQueries({ queryKey: ['my-enrollments'] });
      
      // Force immediate refetch
      refetchProgress();
      refetchChart();
    };

    // Custom event listeners for app-wide data changes
    window.addEventListener('lessonCompleted', handleDataUpdate);
    window.addEventListener('quizCompleted', handleDataUpdate);
    window.addEventListener('courseCompleted', handleDataUpdate);
    window.addEventListener('flashcardReviewed', handleDataUpdate);
    window.addEventListener('progressUpdated', handleDataUpdate);

    return () => {
      window.removeEventListener('lessonCompleted', handleDataUpdate);
      window.removeEventListener('quizCompleted', handleDataUpdate);
      window.removeEventListener('courseCompleted', handleDataUpdate);
      window.removeEventListener('flashcardReviewed', handleDataUpdate);
      window.removeEventListener('progressUpdated', handleDataUpdate);
    };
  }, [queryClient, refetchProgress, refetchChart]);

  // ✅ NEW: Real-time sync function to be called from other components
  const syncProgressData = () => {
    queryClient.invalidateQueries({ queryKey: ['progress-summary'] });
    queryClient.invalidateQueries({ queryKey: ['weekly-progress-chart'] });
    refetchProgress();
    refetchChart();
  };

  // ✅ ENHANCED: Make sync function globally available
  useEffect(() => {
    window.syncProgressData = syncProgressData;
    return () => {
      delete window.syncProgressData;
    };
  }, [syncProgressData]);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-duo-gray-light">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="bg-duo-red rounded-2xl p-8 max-w-md mx-auto shadow-xl">
              <h1 className="text-2xl font-black text-white mb-4">Error Loading Progress</h1>
              <p className="text-white font-bold mb-6">{error.message || 'Failed to load progress data'}</p>
              <button 
                onClick={() => {
                  refetchProgress();
                  refetchChart();
                }}
                className="bg-white text-duo-red px-6 py-3 rounded-2xl hover:bg-gray-100 font-black uppercase tracking-wide transform hover:scale-105"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ ENHANCED: Extract data with better defaults and error handling
  const {
    user_progress = {},
    current_streak = 0,
    longest_streak = 0,
    today_activity = {},
    weekly_stats = {},
    monthly_stats = {},
    recent_activities = []
  } = progressData || {};

  // ✅ ENHANCED: Calculate derived stats
  const totalStudyHours = Math.floor((user_progress.total_study_time || 0) / 60);
  const totalStudyMinutes = (user_progress.total_study_time || 0) % 60;
  const todayProgress = {
    studyTime: today_activity.study_time_minutes || 0,
    lessons: today_activity.lessons_completed || 0,
    xp: today_activity.xp_earned || 0
  };

  return (
    <div className="min-h-screen bg-duo-gray-light">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-dark mb-3">Your Progress</h1>
              <p className="text-xl text-light font-bold">Track your learning journey and achievements</p>
            </div>
            <button
              onClick={syncProgressData}
              className="bg-duo-blue text-white px-4 py-2 rounded-2xl hover:bg-duo-blue-dark font-black transition-all duration-300 transform hover:scale-105"
              title="Refresh progress data"
            >
              🔄 Sync
            </button>
          </div>
        </div>

        {/* ✅ ENHANCED: Real-time Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Study Time */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-duo-blue">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-light mb-1 font-bold uppercase tracking-wide">Total Study Time</p>
                <p className="text-4xl font-black text-duo-blue">
                  {totalStudyHours}h {totalStudyMinutes}m
                </p>
                <p className="text-xs text-light font-bold mt-1">
                  {user_progress.total_study_time || 0} minutes total
                </p>
              </div>
              <div className="w-16 h-16 bg-duo-blue rounded-2xl flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Lessons Completed */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-duo-green">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-light mb-1 font-bold uppercase tracking-wide">Lessons Completed</p>
                <p className="text-4xl font-black text-duo-green">{user_progress.lessons_completed || 0}</p>
                <p className="text-xs text-light font-bold mt-1">
                  Across all courses
                </p>
              </div>
              <div className="w-16 h-16 bg-duo-green rounded-2xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Quizzes Completed */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-duo-purple">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-light mb-1 font-bold uppercase tracking-wide">Quizzes Completed</p>
                <p className="text-4xl font-black text-duo-purple">{user_progress.quizzes_completed || 0}</p>
                <p className="text-xs text-light font-bold mt-1">
                  Average score: {user_progress.average_quiz_score || 0}%
                </p>
              </div>
              <div className="w-16 h-16 bg-duo-purple rounded-2xl flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Total XP Earned */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-duo-yellow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-light mb-1 font-bold uppercase tracking-wide">Total XP Earned</p>
                <p className="text-4xl font-black text-duo-yellow">{user_progress.total_xp_earned || 0}</p>
                <p className="text-xs text-light font-bold mt-1">
                  Current level: {user_progress.current_level || 1}
                </p>
              </div>
              <div className="w-16 h-16 bg-duo-yellow rounded-2xl flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* ✅ ENHANCED: Today's Progress with real-time data */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-black text-dark mb-8">
                Today's Progress
                <span className="text-sm text-light font-bold ml-2">
                  ({new Date().toLocaleDateString()})
                </span>
              </h2>
              <div className="space-y-6">
                <ProgressBar
                  label="Study Time"
                  current={todayProgress.studyTime}
                  target={60} // 1 hour daily goal
                  unit="min"
                  color="blue"
                />
                <ProgressBar
                  label="Lessons"
                  current={todayProgress.lessons}
                  target={3} // 3 lessons daily goal
                  unit="lessons"
                  color="green"
                />
                <ProgressBar
                  label="XP Earned"
                  current={todayProgress.xp}
                  target={100} // 100 XP daily goal
                  unit="XP"
                  color="purple"
                />
              </div>
            </div>

            {/* ✅ ENHANCED: Weekly Chart with real-time data */}
            {chartData && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-black text-dark mb-8">Weekly Activity</h2>
                <WeeklyChart data={chartData} />
              </div>
            )}

            {/* ✅ ENHANCED: Recent Activity with better formatting */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-black text-dark mb-8">Recent Activity</h2>
              <div className="space-y-4">
                {recent_activities.length > 0 ? (
                  recent_activities.slice(0, 7).map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-duo-green hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center space-x-6">
                        <div className="w-12 h-12 bg-duo-blue rounded-2xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-black text-dark text-lg">
                            {new Date(activity.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                          <p className="text-light font-bold">
                            {activity.study_time_minutes || 0} min • {activity.lessons_completed || 0} lessons • {activity.xp_earned || 0} XP
                          </p>
                          {activity.courses_completed > 0 && (
                            <p className="text-duo-green font-bold text-sm">
                              🎉 {activity.courses_completed} course{activity.courses_completed > 1 ? 's' : ''} completed!
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-duo-green rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-light font-bold text-xl">No recent activity found</p>
                    <p className="text-light font-bold text-sm mt-2">Start learning to see your progress here!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* ✅ ENHANCED: Streak Counter with better visuals */}
            <div className="bg-duo-yellow rounded-2xl p-8 text-white shadow-xl">
              <div className="text-center">
                <Flame className="w-16 h-16 mx-auto mb-4 text-white" />
                <h3 className="text-2xl font-black mb-2 text-white">Streak Power!</h3>
                <div className="text-4xl font-black mb-2 text-white">{current_streak}</div>
                <p className="text-sm font-bold opacity-90 uppercase tracking-wide mb-4 text-white">Day Streak</p>
                <div className="bg-white bg-opacity-20 rounded-full h-3 mb-4">
                  <div 
                    className="bg-white h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((current_streak || 0) / Math.max(longest_streak || 1, current_streak || 1) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs font-bold opacity-80 text-white">
                  Longest: {longest_streak} days
                </p>
              </div>
            </div>

            {/* ✅ ENHANCED: Weekly Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-xl font-black text-dark mb-6">This Week</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-light font-bold">Study Time</span>
                  <span className="font-black text-dark text-xl">{weekly_stats.total_study_time || 0} min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light font-bold">Lessons</span>
                  <span className="font-black text-duo-green text-xl">{weekly_stats.total_lessons || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light font-bold">XP Earned</span>
                  <span className="font-black text-duo-blue text-xl">{weekly_stats.total_xp || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light font-bold">Active Days</span>
                  <span className="font-black text-duo-purple text-xl">{weekly_stats.active_days || 0}/7</span>
                </div>
              </div>
            </div>

            {/* ✅ ENHANCED: Monthly Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-xl font-black text-dark mb-6">This Month</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-light font-bold">Study Time</span>
                  <span className="font-black text-dark text-xl">{monthly_stats.total_study_time || 0} min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light font-bold">Lessons</span>
                  <span className="font-black text-duo-green text-xl">{monthly_stats.total_lessons || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light font-bold">XP Earned</span>
                  <span className="font-black text-duo-blue text-xl">{monthly_stats.total_xp || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light font-bold">Active Days</span>
                  <span className="font-black text-duo-purple text-xl">{monthly_stats.active_days || 0}/30</span>
                </div>
              </div>
            </div>

            {/* Achievement Card */}
            <div className="bg-duo-green rounded-2xl p-8 text-white shadow-xl">
              <div className="text-center">
                <Award className="w-12 h-12 mx-auto mb-4 text-white" />
                <h3 className="text-lg font-black mb-2 text-white">Amazing Progress!</h3>
                <p className="text-white opacity-90 font-bold text-sm">
                  Keep up the great work! You're on fire! 🔥
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
