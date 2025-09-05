import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../hooks/useDashboard';
import { 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp, 
  Target, 
  Calendar,
  PlayCircle,
  Star,
  Users,
  Flame,
  ArrowRight,
  Zap,
  Trophy,
  Heart
} from 'lucide-react';
import Header from '../components/common/Header';
import Loading from '../components/common/Loading';

const Dashboard = () => {
  const { user } = useAuth();
  const { stats = {}, myCourses = [], loading, error, refetch } = useDashboard();
  const navigate = useNavigate();

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-duo-red mb-4">Error loading dashboard: {error}</p>
            <button 
              onClick={refetch}
              className="bg-duo-green text-white px-4 py-2 rounded-xl hover:bg-duo-green-dark transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Safe data access with fallbacks
  const todayGoal = {
    completed: stats?.recent_activity?.minutes_today || 0,
    target: stats?.daily_goal || 15,
    percentage: Math.round(((stats?.recent_activity?.minutes_today || 0) / (stats?.daily_goal || 15)) * 100)
  };

  const handleContinueLearning = (courseId) => {
    if (courseId) {
      navigate(`/courses/${courseId}/lessons`);
    }
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'practice':
        navigate('/practice');
        break;
      case 'flashcards':
        navigate('/flashcards');
        break;
      case 'quiz':
        navigate('/quizzes'); 
        break;
      case 'community':
        navigate('/community');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-duo-gray-light">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-dark">
                Welcome back, {user?.username || 'Student'}! 👋
              </h1>
              <p className="text-xl text-light mt-2">Ready to continue your language learning journey?</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-gradient-to-r from-duo-green to-duo-green-dark text-white px-8 py-4 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <Flame className="w-6 h-6" />
                  <span className="text-xl font-black">{stats?.current_streak || 0} day streak!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-duo-yellow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-light mb-1 font-bold uppercase tracking-wide">Current Streak</p>
                <p className="text-4xl font-black text-duo-yellow">{stats?.current_streak || 0}</p>
                <p className="text-xs text-light font-semibold">days</p>
              </div>
              <div className="w-16 h-16 bg-duo-yellow rounded-2xl flex items-center justify-center">
                <Flame className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-duo-blue">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-light mb-1 font-bold uppercase tracking-wide">Total XP</p>
                <p className="text-4xl font-black text-duo-blue">{stats?.total_xp || 0}</p>
                <p className="text-xs text-duo-green font-bold">+{stats?.recent_activity?.xp_this_week || 0} this week</p>
              </div>
              <div className="w-16 h-16 bg-duo-blue rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-duo-green">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-light mb-1 font-bold uppercase tracking-wide">Today's Goal</p>
                <p className="text-4xl font-black text-duo-green">{todayGoal.completed}/{todayGoal.target}</p>
                <p className="text-xs text-light font-semibold">minutes</p>
              </div>
              <div className="w-16 h-16 bg-duo-green rounded-2xl flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-duo-gray-light rounded-full h-3">
                <div 
                  className="bg-duo-green h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(todayGoal.percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-duo-purple">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-light mb-1 font-bold uppercase tracking-wide">Longest Streak</p>
                <p className="text-4xl font-black text-duo-purple">{stats?.longest_streak || 0}</p>
                <p className="text-xs text-light font-semibold">days record</p>
              </div>
              <div className="w-16 h-16 bg-duo-purple rounded-2xl flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Continue Learning Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-dark">Continue Learning</h2>
                <Link
                  to="/languages"
                  className="text-duo-blue hover:text-duo-blue font-black transition-colors duration-200 flex items-center space-x-2 text-sm uppercase tracking-wide"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="space-y-6">
                {Array.isArray(myCourses) && myCourses.length > 0 ? (
                  myCourses.slice(0, 3).map((enrollment) => {
                    const course = enrollment?.course || {};
                    const language = course?.language || {};
                    
                    return (
                      <div key={enrollment?.id || Math.random()} className="flex items-center justify-between p-6 border-2 border-gray-200 rounded-2xl hover:border-duo-green hover:shadow-lg transition-all duration-200">
                        <div className="flex items-center space-x-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-duo-green to-duo-blue rounded-2xl flex items-center justify-center shadow-lg">
                            <BookOpen className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-black text-dark">{course?.title || 'Course Title'}</h3>
                            <p className="text-light font-bold">{language?.name || 'Language'}</p>
                            <div className="flex items-center mt-3">
                              <div className="bg-duo-gray-light rounded-full h-3 w-40 mr-3">
                                <div 
                                  className="bg-duo-green h-3 rounded-full transition-all duration-500"
                                  style={{ width: `${enrollment?.progress_percentage || 0}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-bold text-light">{Math.round(enrollment?.progress_percentage || 0)}%</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleContinueLearning(course?.id)}
                          className="bg-duo-green text-white px-6 py-3 rounded-2xl hover:bg-duo-green-dark transition-colors duration-200 flex items-center space-x-2 font-black text-sm uppercase tracking-wide"
                        >
                          <PlayCircle className="w-5 h-5" />
                          <span>Continue</span>
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                    <p className="text-light text-xl mb-6 font-bold">No courses enrolled yet</p>
                    <Link
                      to="/languages"
                      className="bg-duo-green text-white px-8 py-4 rounded-2xl hover:bg-duo-green-dark transition-colors duration-200 font-black text-sm uppercase tracking-wide"
                    >
                      Start Learning
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-black text-dark mb-8">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => handleQuickAction('practice')}
                  className="flex flex-col items-center p-6 bg-duo-blue rounded-2xl hover:opacity-90 transition-opacity duration-200 shadow-lg transform hover:scale-105"
                >
                  <BookOpen className="w-10 h-10 text-white mb-3" />
                  <span className="text-sm font-black text-white uppercase tracking-wide">Practice</span>
                </button>
                <button
                  onClick={() => handleQuickAction('flashcards')}
                  className="flex flex-col items-center p-6 bg-duo-green rounded-2xl hover:opacity-90 transition-opacity duration-200 shadow-lg transform hover:scale-105"
                >
                  <Award className="w-10 h-10 text-white mb-3" />
                  <span className="text-sm font-black text-white uppercase tracking-wide">Flashcards</span>
                </button>
                <button
                  onClick={() => handleQuickAction('quiz')}
                  className="flex flex-col items-center p-6 bg-duo-purple rounded-2xl hover:opacity-90 transition-opacity duration-200 shadow-lg transform hover:scale-105"
                >
                  <Target className="w-10 h-10 text-white mb-3" />
                  <span className="text-sm font-black text-white uppercase tracking-wide">Quiz</span>
                </button>
                <button
                  onClick={() => handleQuickAction('community')}
                  className="flex flex-col items-center p-6 bg-duo-yellow rounded-2xl hover:opacity-90 transition-opacity duration-200 shadow-lg transform hover:scale-105"
                >
                  <Users className="w-10 h-10 text-white mb-3" />
                  <span className="text-sm font-black text-white uppercase tracking-wide">Community</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily Goal Progress */}
            <div className="bg-gradient-to-br from-duo-green to-duo-green-dark rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black">Today's Goal</h3>
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-black mb-2">{todayGoal.completed}/{todayGoal.target}</div>
                <p className="text-green-100 font-bold mb-6">minutes completed</p>
                <div className="bg-white/20 rounded-full h-4 mb-6">
                  <div 
                    className="bg-white h-4 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(todayGoal.percentage, 100)}%` }}
                  ></div>
                </div>
                <p className="text-green-100 font-bold">
                  {todayGoal.target - todayGoal.completed > 0 
                    ? `${todayGoal.target - todayGoal.completed} minutes to go!`
                    : 'Goal completed! 🎉'
                  }
                </p>
              </div>
            </div>

            {/* Course Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-xl font-black text-dark mb-6">Course Progress</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-light font-bold">Total Courses</span>
                  <span className="font-black text-dark text-xl">{stats?.total_courses || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light font-bold">Completed</span>
                  <span className="font-black text-duo-green text-xl">{stats?.completed_courses || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light font-bold">This Week</span>
                  <span className="font-black text-duo-blue text-xl">{stats?.recent_activity?.lessons_this_week || 0} lessons</span>
                </div>
              </div>
              <Link
                to="/languages"
                className="text-duo-blue hover:text-duo-blue font-black text-sm mt-6 inline-block uppercase tracking-wide"
              >
                Start Learning →
              </Link>
            </div>

            {/* Achievement Card */}
            <div className="bg-gradient-to-br from-duo-yellow to-duo-red rounded-2xl p-8 text-white shadow-xl">
              <div className="text-center">
                <Trophy className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-black mb-2">Keep it up!</h3>
                <p className="text-yellow-100 font-bold text-sm">
                  You're doing amazing! {stats?.current_streak || 0} days in a row!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
