import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { 
  User, 
  Edit3, 
  Camera, 
  Mail, 
  Globe, 
  Target, 
  Flame, 
  Trophy, 
  Clock, 
  BookOpen,
  Award,
  Star,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Header from '../components/common/Header';
import Loading from '../components/common/Loading';
import StreakCounter from '../components/progress/StreakCounter';

const Profile = () => {
  const { user: authUser, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const queryClient = useQueryClient();

  // Available languages for selection
  const [availableLanguages] = useState([
    'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
    'Japanese', 'Chinese', 'Korean', 'Arabic', 'Russian',
    'Dutch', 'Swedish', 'Norwegian', 'Hindi', 'Thai'
  ]);

  // Force refresh user profile data when component mounts
  useEffect(() => {
    queryClient.invalidateQueries('user-profile');
    queryClient.invalidateQueries('progress-summary');
  }, [queryClient]);

  // Fetch complete user profile data
  const { data: userProfile, isLoading } = useQuery(
    'user-profile',
    async () => {
      const response = await api.get('/auth/profile/');
      console.log('Profile API Response:', response.data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setEditForm({
          username: data.username,
          native_language: data.native_language,
          daily_goal: data.daily_goal,
          learning_languages: data.learning_languages || []
        });
        if (refreshUser) {
          refreshUser(data);
        }
      },
      refetchOnMount: true,
      staleTime: 0, 
    }
  );

  // Fetch progress summary
  const { data: progressData } = useQuery(
    'progress-summary',
    async () => {
      const response = await api.get('/progress/summary/');
      return response.data;
    }
  );

  // Update profile mutation
  const updateProfileMutation = useMutation(
    (profileData) => api.patch('/auth/profile/', profileData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user-profile');
        queryClient.invalidateQueries('progress-summary');
        setIsEditing(false);
      }
    }
  );

  const handleSaveProfile = () => {
    console.log('Saving profile with data:', editForm);
    updateProfileMutation.mutate(editForm);
  };

  const handleLanguageToggle = (language) => {
    const currentLangs = editForm.learning_languages || [];
    if (currentLangs.includes(language)) {
      setEditForm({
        ...editForm,
        learning_languages: currentLangs.filter(lang => lang !== language)
      });
    } else {
      setEditForm({
        ...editForm,
        learning_languages: [...currentLangs, language]
      });
    }
  };

  const handleRemoveLanguage = (languageToRemove) => {
    const currentLangs = editForm.learning_languages || [];
    setEditForm({
      ...editForm,
      learning_languages: currentLangs.filter(lang => lang !== languageToRemove)
    });
  };

  if (isLoading) return <Loading />;

  const user = userProfile || authUser;
  const progress = progressData || {};

  console.log('Auth User:', authUser);
  console.log('User Profile:', userProfile);
  console.log('Learning Languages:', user.learning_languages);
  console.log('Total XP:', user.total_xp);

  // Calculate some stats
  const studyHours = Math.floor((user.total_study_time || 0) / 60);
  const studyMinutes = (user.total_study_time || 0) % 60;
  const joinDate = new Date(user.created_at || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  return (
    <div className="min-h-screen bg-duo-gray-light">
      <Header />
      
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-40 h-40 bg-gradient-to-br from-duo-green to-duo-blue rounded-full flex items-center justify-center text-white text-5xl font-black shadow-xl">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  user.username?.charAt(0).toUpperCase() || 'U'
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-12 h-12 bg-duo-yellow hover:bg-duo-red rounded-full flex items-center justify-center text-white shadow-xl transition-colors">
                <Camera className="w-6 h-6" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-dark mb-3">
                    {user.username}
                  </h1>
                  <p className="text-light flex items-center justify-center md:justify-start font-bold text-lg">
                    <Mail className="w-5 h-5 mr-2" />
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-6 md:mt-0 flex items-center px-6 py-3 bg-duo-blue hover:bg-duo-blue text-white rounded-2xl transition-colors font-black text-sm uppercase tracking-wide"
                >
                  <Edit3 className="w-5 h-5 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center p-4 bg-duo-blue rounded-2xl text-white">
                  <div className="text-3xl font-black">{user.total_xp || 0}</div>
                  <div className="text-sm font-bold opacity-90 uppercase tracking-wide">Total XP</div>
                </div>
                <div className="text-center p-4 bg-duo-green rounded-2xl text-white">
                  <div className="text-3xl font-black">{user.current_streak || 0}</div>
                  <div className="text-sm font-bold opacity-90 uppercase tracking-wide">Day Streak</div>
                </div>
                <div className="text-center p-4 bg-duo-purple rounded-2xl text-white">
                  <div className="text-3xl font-black">{user.lessons_completed_count || 0}</div>
                  <div className="text-sm font-bold opacity-90 uppercase tracking-wide">Lessons</div>
                </div>
                <div className="text-center p-4 bg-duo-yellow rounded-2xl text-white">
                  <div className="text-3xl font-black">{studyHours}h {studyMinutes}m</div>
                  <div className="text-sm font-bold opacity-90 uppercase tracking-wide">Study Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Edit Form */}
            {isEditing && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-black text-dark mb-8">Edit Profile</h2>
                <div className="space-y-6">
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-black text-dark mb-3 uppercase tracking-wide">
                      Username
                    </label>
                    <input
                      type="text"
                      value={editForm.username || ''}
                      onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                      className="w-full p-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-duo-green focus:border-duo-green font-bold"
                    />
                  </div>

                  {/* Native Language */}
                  <div>
                    <label className="block text-sm font-black text-dark mb-3 uppercase tracking-wide">
                      Native Language
                    </label>
                    <select
                      value={editForm.native_language || ''}
                      onChange={(e) => setEditForm({...editForm, native_language: e.target.value})}
                      className="w-full p-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-duo-green focus:border-duo-green font-bold"
                    >
                      <option value="">Select your native language</option>
                      {availableLanguages.map((language) => (
                        <option key={language} value={language}>{language}</option>
                      ))}
                    </select>
                  </div>

                  {/* Daily Goal */}
                  <div>
                    <label className="block text-sm font-black text-dark mb-3 uppercase tracking-wide">
                      Daily Goal (minutes)
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="180"
                      value={editForm.daily_goal || ''}
                      onChange={(e) => setEditForm({...editForm, daily_goal: parseInt(e.target.value)})}
                      className="w-full p-4 border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-duo-green focus:border-duo-green font-bold"
                    />
                  </div>

                  {/* Learning Languages */}
                  <div>
                    <label className="block text-sm font-black text-dark mb-4 uppercase tracking-wide">
                      Learning Languages
                    </label>
                    
                    {/* Currently Selected Languages */}
                    <div className="mb-6">
                      <p className="text-xs text-light mb-3 font-bold uppercase tracking-wide">Currently selected:</p>
                      <div className="flex flex-wrap gap-3">
                        {(editForm.learning_languages || []).map((language) => (
                          <div
                            key={language}
                            className="flex items-center bg-duo-blue text-white px-4 py-2 rounded-full font-bold"
                          >
                            <Globe className="w-4 h-4 mr-2" />
                            <span>{language}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveLanguage(language)}
                              className="ml-2 hover:text-duo-red"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        {(editForm.learning_languages || []).length === 0 && (
                          <p className="text-light font-bold">No languages selected</p>
                        )}
                      </div>
                    </div>

                    {/* Language Selection Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto border-2 border-gray-200 rounded-2xl p-4">
                      {availableLanguages
                        .filter(lang => lang !== editForm.native_language)
                        .map((language) => (
                        <label
                          key={language}
                          className={`flex items-center p-3 rounded-xl cursor-pointer transition-colors font-bold ${
                            (editForm.learning_languages || []).includes(language)
                              ? 'bg-duo-green text-white'
                              : 'hover:bg-duo-gray-light'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={(editForm.learning_languages || []).includes(language)}
                            onChange={() => handleLanguageToggle(language)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                            (editForm.learning_languages || []).includes(language)
                              ? 'bg-white border-white'
                              : 'border-gray-400'
                          }`}>
                            {(editForm.learning_languages || []).includes(language) && (
                              <svg className="w-3 h-3 text-duo-green" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm">{language}</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-xs text-light mt-3 font-bold">
                      Select the languages you want to learn. You can choose multiple languages.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-6 border-t-2 border-gray-200">
                    <button
                      onClick={handleSaveProfile}
                      disabled={updateProfileMutation.isLoading}
                      className="flex-1 bg-duo-green hover:bg-duo-green-dark text-white py-4 px-6 rounded-2xl transition-colors disabled:opacity-50 font-black text-sm uppercase tracking-wide"
                    >
                      {updateProfileMutation.isLoading ? (
                        <span className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Saving...
                        </span>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditForm({
                          username: user.username,
                          native_language: user.native_language,
                          daily_goal: user.daily_goal,
                          learning_languages: user.learning_languages || []
                        });
                      }}
                      className="flex-1 bg-duo-gray text-dark py-4 px-6 rounded-2xl hover:bg-gray-400 transition-colors font-black text-sm uppercase tracking-wide"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-black text-dark mb-8">Profile Information</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-duo-blue rounded-2xl flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-light font-bold uppercase tracking-wide">Username</p>
                      <p className="font-black text-dark text-xl">{user.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-duo-red rounded-2xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-light font-bold uppercase tracking-wide">Email</p>
                      <p className="font-black text-dark text-xl">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-duo-green rounded-2xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-light font-bold uppercase tracking-wide">Native Language</p>
                      <p className="font-black text-dark text-xl">{user.native_language || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-duo-purple rounded-2xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-light font-bold uppercase tracking-wide">Daily Goal</p>
                      <p className="font-black text-dark text-xl">{user.daily_goal} minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-duo-yellow rounded-2xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-light font-bold uppercase tracking-wide">Member Since</p>
                      <p className="font-black text-dark text-xl">{joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-black text-dark mb-8">Learning Statistics</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-duo-blue to-duo-purple rounded-2xl text-white">
                  <BookOpen className="w-12 h-12 mx-auto mb-4" />
                  <div className="text-3xl font-black">{user.lessons_completed_count || 0}</div>
                  <div className="text-sm font-bold opacity-90 uppercase tracking-wide">Lessons Completed</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-duo-green to-duo-blue rounded-2xl text-white">
                  <Trophy className="w-12 h-12 mx-auto mb-4" />
                  <div className="text-3xl font-black">{user.quizzes_completed_count || 0}</div>
                  <div className="text-sm font-bold opacity-90 uppercase tracking-wide">Quizzes Completed</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-duo-purple to-duo-red rounded-2xl text-white">
                  <Award className="w-12 h-12 mx-auto mb-4" />
                  <div className="text-3xl font-black">{user.flashcards_reviewed_count || 0}</div>
                  <div className="text-sm font-bold opacity-90 uppercase tracking-wide">Flashcards Reviewed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Streak Counter */}
            <div className="bg-gradient-to-br from-duo-yellow to-duo-red rounded-2xl p-8 text-white shadow-xl">
              <div className="text-center">
                <Flame className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-black mb-2">Streak Power!</h3>
                <div className="text-4xl font-black mb-2">{user.current_streak || 0}</div>
                <p className="text-sm font-bold opacity-90 uppercase tracking-wide mb-4">Day Streak</p>
                <div className="bg-white/20 rounded-full h-3 mb-4">
                  <div 
                    className="bg-white h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((user.current_streak || 0) / (user.longest_streak || 1) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs font-bold opacity-80">
                  Longest: {user.longest_streak || 0} days
                </p>
              </div>
            </div>

            {/* Learning Languages */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-xl font-black text-dark mb-6">Learning Languages</h3>
              {user.learning_languages && user.learning_languages.length > 0 ? (
                <div className="space-y-4">
                  {user.learning_languages.map((lang, index) => (
                    <div key={index} className="flex items-center p-4 bg-gradient-to-r from-duo-blue to-duo-purple rounded-2xl text-white">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4">
                        <Globe className="w-5 h-5" />
                      </div>
                      <span className="font-black text-lg">{lang}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-light mb-4 font-bold">No languages selected yet</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-duo-blue hover:text-duo-blue font-black text-sm uppercase tracking-wide"
                  >
                    Add learning languages
                  </button>
                </div>
              )}
            </div>

            {/* Study Time Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-xl font-black text-dark mb-6">Study Time</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-light font-bold">Total Time</span>
                  <span className="font-black text-dark text-xl">{studyHours}h {studyMinutes}m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light font-bold">Average per Day</span>
                  <span className="font-black text-dark text-xl">
                    {user.current_streak > 0 ? 
                      `${Math.round((user.total_study_time || 0) / user.current_streak)}m` : 
                      '0m'
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light font-bold">This Week</span>
                  <span className="font-black text-duo-green text-xl">{progress.weekly_stats?.total_study_time || 0}m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
