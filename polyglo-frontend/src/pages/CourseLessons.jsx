
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { ArrowLeft, PlayCircle, CheckCircle, Lock, Clock, Star, Trophy, BookOpen } from 'lucide-react';
import Header from '../components/common/Header';
import Loading from '../components/common/Loading';

const CourseLessons = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [hasAutoCompleted, setHasAutoCompleted] = useState(false);
  const [completingLessons, setCompletingLessons] = useState(new Set()); // Track which lessons are being completed

  // Fetch course details
  const { 
    data: course, 
    isLoading: courseLoading, 
    error: courseError 
  } = useQuery(
    ['course', courseId],
    async () => {
      const response = await api.get(`/courses/${courseId}/`);
      return response.data;
    },
    {
      enabled: !!courseId,
      staleTime: 30 * 1000, // Reduced to 30 seconds for faster updates
      refetchOnWindowFocus: true,
    }
  );

  // Fetch course lessons
  const { 
    data: lessonsData, 
    isLoading: lessonsLoading,
    error: lessonsError,
    refetch: refetchLessons
  } = useQuery(
    ['course-lessons', courseId],
    async () => {
      const response = await api.get(`/courses/${courseId}/lessons/`);
      return response.data;
    },
    {
      enabled: !!courseId,
      staleTime: 15 * 1000, // 15 seconds for lessons
      refetchOnWindowFocus: true,
    }
  );

  // Complete lesson mutation with optimistic updates
  const completeLessonMutation = useMutation(
    async ({ lessonId, score = 100 }) => {
      const response = await api.post(`/lessons/${lessonId}/complete/`, { score });
      return response.data;
    },
    {
      onMutate: ({ lessonId }) => {
        // Optimistic update - immediately show as completing
        setCompletingLessons(prev => new Set(prev).add(lessonId));
      },
      onSuccess: (data, variables) => {
        const { lessonId } = variables;
        console.log('✅ Lesson completed successfully:', lessonId);
        
        // Remove from completing set
        setCompletingLessons(prev => {
          const newSet = new Set(prev);
          newSet.delete(lessonId);
          return newSet;
        });

        // Update lesson data optimistically in cache
        queryClient.setQueryData(['course-lessons', courseId], (oldData) => {
          if (!oldData) return oldData;
          
          const lessons = oldData.results || oldData || [];
          const updatedLessons = lessons.map(lesson => 
            lesson.id === lessonId 
              ? { ...lesson, is_completed: true, completed_at: new Date().toISOString(), score: variables.score }
              : lesson
          );
          
          return oldData.results ? { ...oldData, results: updatedLessons } : updatedLessons;
        });

        // Invalidate queries for fresh data
        queryClient.invalidateQueries(['course-lessons', courseId]);
        queryClient.invalidateQueries(['course', courseId]);
        queryClient.invalidateQueries(['progress-summary']);
        queryClient.invalidateQueries(['my-enrollments']);
        queryClient.invalidateQueries(['dashboard-courses']);
        queryClient.invalidateQueries(['courses', 'languages']); // For language-specific updates
        
        // Force refresh after a short delay
        setTimeout(() => {
          refetchLessons();
        }, 500);
      },
      onError: (error, variables) => {
        const { lessonId } = variables;
        console.error('❌ Failed to complete lesson:', error);
        
        // Remove from completing set on error
        setCompletingLessons(prev => {
          const newSet = new Set(prev);
          newSet.delete(lessonId);
          return newSet;
        });
      }
    }
  );

  // Complete entire course mutation
  const completeCourseMutation = useMutation(
    (score = 100) => api.post(`/courses/${courseId}/complete/`, { score }),
    {
      onSuccess: () => {
        console.log('🎉 Course completed successfully!');
        
        // Update course as completed optimistically
        queryClient.setQueryData(['course', courseId], (oldData) => {
          if (!oldData) return oldData;
          return { ...oldData, is_completed: true, progress_percentage: 100 };
        });

        // Invalidate all related queries
        queryClient.invalidateQueries(['course-lessons', courseId]);
        queryClient.invalidateQueries(['course', courseId]);
        queryClient.invalidateQueries(['progress-summary']);
        queryClient.invalidateQueries(['my-enrollments']);
        queryClient.invalidateQueries(['dashboard-courses']);
        queryClient.invalidateQueries(['courses']); // For course list updates
        queryClient.invalidateQueries(['languages']); // For language progress updates
        
        refetchLessons();
      }
    }
  );

  const isLoading = courseLoading || lessonsLoading;
  const error = courseError || lessonsError;

  // Calculate progress with real-time updates
  const lessons = lessonsData?.results || lessonsData || [];
  const completedLessons = lessons.filter(lesson => 
    lesson.is_completed || completingLessons.has(lesson.id)
  ).length;
  const progressPercentage = lessons.length > 0 ? Math.round((completedLessons / lessons.length) * 100) : 0;
  
  // Calculate XP with real-time updates
  const earnedXP = lessons.reduce((acc, lesson) => {
    if (lesson.is_completed || completingLessons.has(lesson.id)) {
      return acc + (lesson.xp_reward || 10);
    }
    return acc;
  }, 0);

  const totalXP = lessons.reduce((acc, lesson) => acc + (lesson.xp_reward || 10), 0);

  // Check if course should be marked as completed
  const shouldCompleteWholeCourse = completedLessons === lessons.length && 
                                   lessons.length > 0 && 
                                   !course?.is_completed && 
                                   !hasAutoCompleted;

  // Auto-completion logic
  const handleAutoCompletion = useCallback(() => {
    if (shouldCompleteWholeCourse && !completeCourseMutation.isLoading) {
      console.log('🎯 All lessons completed, completing course...');
      setHasAutoCompleted(true);
      completeCourseMutation.mutate(95);
    }
  }, [shouldCompleteWholeCourse, completeCourseMutation, hasAutoCompleted]);

  useEffect(() => {
    handleAutoCompletion();
  }, [handleAutoCompletion]);

  // Handle lesson completion with immediate UI feedback
  const handleCompleteLesson = useCallback(async (lessonId) => {
    if (completeLessonMutation.isLoading || completingLessons.has(lessonId)) return;
    
    console.log('🎯 Completing lesson:', lessonId);
    completeLessonMutation.mutate({ lessonId, score: 90 });
  }, [completeLessonMutation, completingLessons]);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-duo-gray-light">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="bg-duo-red rounded-2xl p-8 max-w-md mx-auto shadow-xl">
              <h1 className="text-2xl font-black text-white mb-4">Error Loading Course</h1>
              <p className="text-white font-bold mb-6">{error.message || 'Failed to load course'}</p>
              <Link
                to="/languages"
                className="flex items-center text-duo-blue hover:text-duo-blue font-bold mb-8 transition-colors transform hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Languages
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-duo-gray-light">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-duo-blue hover:text-duo-blue font-black transition-colors duration-200 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
        </div>

        {/* Course Header */}
        {course && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-duo-purple rounded-2xl flex items-center justify-center mr-6">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-dark mb-2">{course.title}</h1>
                  <p className="text-light font-bold text-lg">{course.description}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="text-sm bg-duo-green text-white px-3 py-1 rounded-full font-black uppercase">
                      {course.difficulty || 'Beginner'}
                    </span>
                    <span className="text-sm bg-duo-blue text-white px-3 py-1 rounded-full font-black">
                      {course.language?.name || 'Language'}
                    </span>
                    {(course.is_completed || progressPercentage === 100) && (
                      <span className="text-sm bg-duo-yellow text-white px-3 py-1 rounded-full font-black uppercase animate-pulse">
                        ✨ Completed!
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-4xl font-black mb-1 transition-colors duration-500 ${
                  progressPercentage === 100 ? 'text-duo-yellow animate-pulse' : 'text-duo-green'
                }`}>
                  {progressPercentage}%
                </div>
                <div className="text-sm text-light font-bold uppercase tracking-wide">Complete</div>
              </div>
            </div>

            {/* Real Progress Bar with Animation */}
            <div className="mb-6">
              <div className="bg-duo-gray-light rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-4 rounded-full transition-all duration-1000 ${
                    progressPercentage === 100 
                      ? 'bg-gradient-to-r from-duo-yellow to-duo-green' 
                      : 'bg-duo-green'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-light font-bold mt-3">
                <span className="transition-all duration-300">
                  {completedLessons} of {lessons.length} lessons completed
                </span>
                <span>{totalXP} total XP available</span>
              </div>
            </div>

            {/* Course Stats with Real-time Updates */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-duo-gray-light rounded-2xl">
                <div className="text-2xl font-black text-duo-blue mb-1">{lessons.length}</div>
                <div className="text-xs text-light font-bold uppercase tracking-wide">Total Lessons</div>
              </div>
              <div className="text-center p-4 bg-duo-gray-light rounded-2xl">
                <div className={`text-2xl font-black mb-1 transition-all duration-300 ${
                  completedLessons > 0 ? 'text-duo-green' : 'text-duo-gray'
                }`}>
                  {completedLessons}
                </div>
                <div className="text-xs text-light font-bold uppercase tracking-wide">Completed</div>
              </div>
              <div className="text-center p-4 bg-duo-gray-light rounded-2xl">
                <div className={`text-2xl font-black mb-1 transition-all duration-300 ${
                  earnedXP > 0 ? 'text-duo-yellow' : 'text-duo-gray'
                }`}>
                  {earnedXP}
                </div>
                <div className="text-xs text-light font-bold uppercase tracking-wide">XP Earned</div>
              </div>
              <div className="text-center p-4 bg-duo-gray-light rounded-2xl">
                <div className="text-2xl font-black text-duo-purple mb-1">
                  {Math.round(lessons.reduce((acc, lesson) => acc + (lesson.duration_minutes || 15), 0) / 60)}h
                </div>
                <div className="text-xs text-light font-bold uppercase tracking-wide">Total Time</div>
              </div>
            </div>
          </div>
        )}

        {/* Lessons List */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-black text-dark mb-8">Course Lessons</h2>
          
          {lessons.length > 0 ? (
            <div className="space-y-4">
              {lessons.map((lesson, index) => {
                const isCompleting = completingLessons.has(lesson.id);
                const isCompleted = lesson.is_completed || isCompleting;
                
                return (
                  <div
                    key={lesson.id}
                    className={`flex items-center justify-between p-6 border-2 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                      isCompleted
                        ? 'bg-duo-green bg-opacity-10 border-duo-green hover:shadow-lg' 
                        : lesson.is_premium 
                        ? 'bg-duo-yellow bg-opacity-10 border-duo-yellow hover:shadow-lg' 
                        : 'bg-duo-gray-light border-gray-200 hover:border-duo-blue hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center space-x-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                        isCompleted
                          ? 'bg-duo-green text-white' 
                          : lesson.is_premium 
                          ? 'bg-duo-yellow text-white' 
                          : 'bg-duo-blue text-white'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className={`w-7 h-7 ${isCompleting ? 'animate-spin' : 'animate-bounce'}`} />
                        ) : lesson.is_premium ? (
                          <Lock className="w-7 h-7" />
                        ) : (
                          <span className="text-xl font-black">{lesson.order || index + 1}</span>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-black text-dark mb-1">{lesson.title}</h3>
                        <p className="text-light font-bold">{lesson.description}</p>
                        <div className="flex items-center mt-2 text-sm text-light font-bold space-x-6">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {lesson.duration_minutes || 15} min
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-duo-yellow" />
                            {lesson.xp_reward || 10} XP
                          </div>
                          <div className="bg-duo-purple text-white px-2 py-1 rounded-full text-xs font-black uppercase">
                            {lesson.lesson_type || 'Interactive'}
                          </div>
                          {isCompleted && !isCompleting && lesson.completed_at && (
                            <div className="text-xs text-duo-green font-bold animate-fade-in">
                              ✅ Completed {new Date(lesson.completed_at).toLocaleDateString()}
                            </div>
                          )}
                          {isCompleting && (
                            <div className="text-xs text-duo-blue font-bold animate-pulse">
                              ⏳ Completing...
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {isCompleted && !isCompleting && (
                        <div className="bg-duo-green text-white px-4 py-2 rounded-full font-black text-sm uppercase tracking-wide animate-fade-in">
                          ✨ Completed {lesson.score && `(${lesson.score}%)`}
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <Link
                          to={`/lessons/${lesson.id}`}
                          className={`px-6 py-3 rounded-2xl font-black transition-all duration-300 flex items-center space-x-2 shadow-lg transform hover:scale-105 uppercase tracking-wide ${
                            isCompleted
                              ? 'bg-duo-gray text-white hover:bg-duo-gray'
                              : 'bg-duo-green text-white hover:bg-duo-green-dark'
                          }`}
                        >
                          <PlayCircle className="w-5 h-5" />
                          <span>{isCompleted ? 'Review' : 'Start'}</span>
                        </Link>

                        {!isCompleted && (
                          <button
                            onClick={() => handleCompleteLesson(lesson.id)}
                            disabled={completeLessonMutation.isLoading || isCompleting}
                            className="px-4 py-3 bg-duo-blue text-white rounded-2xl font-black text-sm hover:bg-duo-blue-dark disabled:opacity-50 transition-all duration-200"
                            title="Mark as completed"
                          >
                            {isCompleting ? '⏳' : '✅'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-duo-gray rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-black text-dark mb-4">No lessons available yet</h3>
              <p className="text-light font-bold text-xl mb-8">This course is being prepared. Check back soon!</p>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-duo-blue text-white px-8 py-4 rounded-2xl hover:bg-duo-blue font-black transition-all duration-300 transform hover:scale-105 shadow-lg uppercase tracking-wide"
              >
                Browse Other Courses
              </button>
            </div>
          )}
        </div>

        {/* Course Completion Banner */}
        {progressPercentage === 100 && (
          <div className="mt-8 bg-gradient-to-r from-duo-green to-duo-blue rounded-2xl p-8 text-center shadow-2xl animate-fade-in">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-3xl font-black text-white mb-4">Congratulations!</h2>
            <p className="text-white font-bold text-xl mb-6">
              You've completed all lessons in {course?.title}! You earned {earnedXP} XP!
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-white text-duo-green px-6 py-3 rounded-2xl font-black hover:bg-gray-100 transform hover:scale-105"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => navigate('/languages')}
                className="bg-duo-yellow text-white px-6 py-3 rounded-2xl font-black hover:bg-duo-yellow-dark transform hover:scale-105"
              >
                Choose New Course
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseLessons;
