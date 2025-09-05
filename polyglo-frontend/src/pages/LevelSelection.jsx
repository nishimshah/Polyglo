import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  BookOpen, 
  Clock, 
  Award, 
  ArrowRight, 
  Lock, 
  CheckCircle,
  Play,
  Target
} from 'lucide-react';
import api from '../services/api';
import Header from '../components/common/Header';
import Loading from '../components/common/Loading';

const LevelSelection = () => {
  const { languageCode } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [enrollingLevel, setEnrollingLevel] = useState(null);

  // Fetch language levels
  const { data: levels, isLoading } = useQuery(
    ['language-levels', languageCode],
    async () => {
      const response = await api.get(`/courses/languages/${languageCode}/levels/`);
      return response.data;
    }
  );

  // Enroll in level mutation
  const enrollMutation = useMutation(
    (levelId) => api.post(`/courses/levels/${levelId}/enroll/`),
    {
      onSuccess: (data, levelId) => {
        queryClient.invalidateQueries(['language-levels', languageCode]);
        // Navigate to the first course in this level
        navigate(`/courses/level/${levelId}`);
      },
      onError: (error) => {
        console.error('Enrollment failed:', error);
      },
      onSettled: () => {
        setEnrollingLevel(null);
      }
    }
  );

  const handleLevelEnroll = async (level) => {
    if (enrollingLevel) return;
    
    setEnrollingLevel(level.id);
    enrollMutation.mutate(level.id);
  };

  const handleContinueLevel = (level) => {
    navigate(`/courses/level/${level.id}`);
  };

  if (isLoading) return <Loading />;

  const language = levels?.[0]?.language;

  const getDifficultyInfo = (difficulty) => {
    const info = {
      beginner: {
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-50',
        textColor: 'text-green-800',
        description: 'Perfect for complete beginners. Learn basic vocabulary, pronunciation, and simple sentences.',
        icon: '🌱',
        duration: '~15 hours'
      },
      intermediate: {
        color: 'from-yellow-500 to-orange-500',
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-800',
        description: 'Build on your foundation with conversations, grammar, and practical scenarios.',
        icon: '🚀',
        duration: '~20 hours'
      },
      advanced: {
        color: 'from-red-500 to-pink-500',
        bgColor: 'bg-red-50',
        textColor: 'text-red-800',
        description: 'Master complex grammar, literature, and achieve fluency in professional contexts.',
        icon: '👑',
        duration: '~30 hours'
      }
    };
    return info[difficulty] || info.beginner;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            {language?.flag_image ? (
              <img
                src={language.flag_image}
                alt={`${language.name} flag`}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg mr-4"
              />
            ) : (
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl text-white font-bold">
                  {language?.name?.charAt(0)}
                </span>
              </div>
            )}
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900">
                Learn {language?.name}
              </h1>
              <p className="text-gray-600">Choose your starting level</p>
            </div>
          </div>
        </div>

        {/* Skill Assessment Banner */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 text-center">
          <Target className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Not sure about your level?</h3>
          <p className="mb-4">Take our quick placement test to find the perfect starting point</p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
            Take Placement Test
          </button>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {levels?.map((level, index) => {
            const difficultyInfo = getDifficultyInfo(level.difficulty);
            const isLocked = level.required_previous_level && !level.previous_level_completed;
            const isCompleted = level.is_completed;
            const isEnrolled = level.is_enrolled;
            const isEnrolling = enrollingLevel === level.id;

            return (
              <div
                key={level.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                  isLocked ? 'opacity-60' : 'hover:shadow-xl transform hover:scale-105'
                }`}
              >
                {/* Level Header */}
                <div className={`h-32 bg-gradient-to-r ${difficultyInfo.color} relative flex items-center justify-center`}>
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">{difficultyInfo.icon}</div>
                    <h3 className="text-2xl font-bold">{level.title}</h3>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {isCompleted && (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Completed
                      </div>
                    )}
                    {isEnrolled && !isCompleted && (
                      <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Play className="w-4 h-4 mr-1" />
                        In Progress
                      </div>
                    )}
                    {isLocked && (
                      <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Lock className="w-4 h-4 mr-1" />
                        Locked
                      </div>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  {isEnrolled && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
                      <div 
                        className="h-1 bg-white transition-all duration-500"
                        style={{ width: `${level.progress_percentage || 0}%` }}
                      ></div>
                    </div>
                  )}
                </div>

                {/* Level Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {difficultyInfo.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className={`w-10 h-10 ${difficultyInfo.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
                        <BookOpen className={`w-5 h-5 ${difficultyInfo.textColor}`} />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {level.total_courses || 6}
                      </div>
                      <div className="text-xs text-gray-500">Courses</div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`w-10 h-10 ${difficultyInfo.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
                        <Clock className={`w-5 h-5 ${difficultyInfo.textColor}`} />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {difficultyInfo.duration}
                      </div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`w-10 h-10 ${difficultyInfo.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
                        <Award className={`w-5 h-5 ${difficultyInfo.textColor}`} />
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        Certificate
                      </div>
                      <div className="text-xs text-gray-500">Included</div>
                    </div>
                  </div>

                  {/* Requirements */}
                  {level.required_previous_level && (
                    <div className={`p-3 rounded-lg mb-4 ${
                      isLocked ? 'bg-gray-100' : 'bg-green-100'
                    }`}>
                      <div className="flex items-center">
                        {isLocked ? (
                          <Lock className="w-4 h-4 text-gray-500 mr-2" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        )}
                        <span className={`text-sm ${
                          isLocked ? 'text-gray-600' : 'text-green-700'
                        }`}>
                          Requires: {level.required_previous_level.title}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="mt-6">
                    {isLocked ? (
                      <button
                        disabled
                        className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-semibold cursor-not-allowed"
                      >
                        Complete Previous Level First
                      </button>
                    ) : isCompleted ? (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleContinueLevel(level)}
                          className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                        >
                          Review Content
                        </button>
                        <div className="flex items-center bg-green-100 text-green-800 px-3 py-2 rounded-lg">
                          <Award className="w-5 h-5" />
                        </div>
                      </div>
                    ) : isEnrolled ? (
                      <button
                        onClick={() => handleContinueLevel(level)}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Continue Learning ({level.progress_percentage || 0}%)
                      </button>
                    ) : (
                      <button
                        onClick={() => handleLevelEnroll(level)}
                        disabled={isEnrolling}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center disabled:opacity-50"
                      >
                        {isEnrolling ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                        ) : (
                          <ArrowRight className="w-5 h-5 mr-2" />
                        )}
                        {isEnrolling ? 'Starting...' : 'Start Level'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Learning Path Visualization */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Learning Journey</h3>
          <div className="flex items-center justify-center space-x-8 max-w-2xl mx-auto">
            {levels?.map((level, index) => (
              <React.Fragment key={level.id}>
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    level.is_completed 
                      ? 'bg-green-500 text-white' 
                      : level.is_enrolled 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {level.is_completed ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : (
                      <span className="text-xl font-bold">{index + 1}</span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-700 mt-2">
                    {level.difficulty.charAt(0).toUpperCase() + level.difficulty.slice(1)}
                  </p>
                </div>
                
                {index < levels.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelection;
