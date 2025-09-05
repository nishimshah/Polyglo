// // // import React, { useState } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import { useQuery } from '@tanstack/react-query';
// // // import api from '../services/api';
// // // import QuizCard from '../components/quizzes/QuizCard'; 
// // // import QuizResults from '../components/quizzes/QuizResults';
// // // import Loading from '../components/common/Loading';
// // // import { Clock, BookOpen, Trophy, AlertCircle } from 'lucide-react';

// // // const Quiz = () => {
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const [showQuiz, setShowQuiz] = useState(false);
// // //   const [quizAttempt, setQuizAttempt] = useState(null);
// // //   const [showResults, setShowResults] = useState(false);
// // //   const [quizResults, setQuizResults] = useState(null);

// // //   // Fetch quiz data
// // //   const { 
// // //     data: quiz, 
// // //     isLoading, 
// // //     error,
// // //     refetch 
// // //   } = useQuery(
// // //     ['quiz', id],
// // //     async () => {
// // //       const response = await api.get(`/quizzes/${id}/`);
// // //       return response.data;
// // //     },
// // //     {
// // //       enabled: !!id,
// // //       onError: (error) => {
// // //         console.error('Error fetching quiz:', error);
// // //       }
// // //     }
// // //   );

// // //   const startQuiz = async () => {
// // //   try {
// // //     const token = localStorage.getItem('access_token');
    
// // //     if (!token) {
// // //       alert('Authentication required. Please login again.');
// // //       navigate('/login');
// // //       return;
// // //     }
    
// // //     const response = await api.post(`/quizzes/${id}/start/`);
// // //     setQuizAttempt(response.data);
// // //     setShowQuiz(true);
// // //     } catch (error) {
// // //     console.error('Failed to start quiz attempt:', error);
    
// // //     if (error.response?.status === 403) {
// // //       // Handle authentication error
// // //       alert('Your session has expired. Please login again.');
// // //       localStorage.removeItem('access_token');
// // //       localStorage.removeItem('refresh_token');
// // //       navigate('/login');
// // //       } else {
// // //         alert('Failed to start quiz. Please try again.');
// // //       }
// // //     }
// // //   };

// // //   const handleQuizSubmit = async (answers, timeSpent) => {
// // //   if (!quizAttempt) {
// // //     alert('No active quiz attempt found.');
// // //     return;
// // //   }

// // //   try {
// // //     const response = await api.post(`/quizzes/attempts/${quizAttempt.id}/submit/`, {
// // //       answers: answers,
// // //       time_spent: timeSpent
// // //     });

// // //     console.log('Quiz submission response:', response.data); // Debug log

// // //     // Navigate to results with correct data structure
// // //     navigate('/quiz-results', { 
// // //       state: { 
// // //         attempt: response.data,  // This contains score, passed, etc.
// // //         quiz: quiz 
// // //       }
// // //     });
// // //   } catch (error) {
// // //     console.error('Error submitting quiz:', error);
// // //     alert('Error submitting quiz. Please try again.');
// // //   }
// // // };


// // //   if (isLoading) {
// // //     return <Loading />;
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="text-center max-w-md mx-auto p-6">
// // //           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
// // //           <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Quiz</h2>
// // //           <p className="text-gray-600 mb-4">
// // //             {error.response?.data?.error || 'Failed to load quiz. Please try again.'}
// // //           </p>
// // //           <button
// // //             onClick={() => refetch()}
// // //             className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors mr-4"
// // //           >
// // //             Try Again
// // //           </button>
// // //           <button
// // //             onClick={() => navigate('/quizzes')}
// // //             className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
// // //           >
// // //             Back to Quizzes
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!quiz) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="text-center">
// // //           <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// // //           <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Not Found</h2>
// // //           <p className="text-gray-600 mb-4">The requested quiz could not be found.</p>
// // //           <button
// // //             onClick={() => navigate('/quizzes')}
// // //             className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
// // //           >
// // //             Back to Quizzes
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (showResults) {
// // //     return (
// // //       <QuizResults
// // //         quiz={quiz}
// // //         attempt={quizResults}
// // //         onRetry={() => {
// // //           setShowResults(false);
// // //           setShowQuiz(false);
// // //           setQuizAttempt(null);
// // //         }}
// // //         onBackToQuizzes={() => navigate('/quizzes')}
// // //       />
// // //     );
// // //   }

// // //   if (showQuiz) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 py-8">
// // //         <QuizCard quiz={quiz} onSubmit={handleQuizSubmit} />
// // //       </div>
// // //     );
// // //   }

// // //   // Quiz intro/start screen
// // //   return (
// // //     <div className="min-h-screen bg-gray-50 py-8">
// // //       <div className="max-w-2xl mx-auto px-4">
// // //         <div className="bg-white rounded-lg shadow-lg p-8">
// // //           <div className="text-center mb-8">
// // //             <Trophy className="w-16 h-16 text-blue-500 mx-auto mb-4" />
// // //             <h1 className="text-3xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
// // //             <p className="text-gray-600">{quiz.description}</p>
// // //           </div>

// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
// // //             <div className="text-center p-4 bg-blue-50 rounded-lg">
// // //               <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
// // //               <p className="text-sm text-gray-600">Questions</p>
// // //               <p className="text-xl font-bold text-blue-600">
// // //                 {quiz.question_count || quiz.questions?.length || 0}
// // //               </p>
// // //             </div>
            
// // //             <div className="text-center p-4 bg-green-50 rounded-lg">
// // //               <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
// // //               <p className="text-sm text-gray-600">Time Limit</p>
// // //               <p className="text-xl font-bold text-green-600">{quiz.time_limit_minutes} min</p>
// // //             </div>
            
// // //             <div className="text-center p-4 bg-purple-50 rounded-lg">
// // //               <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
// // //               <p className="text-sm text-gray-600">Passing Score</p>
// // //               <p className="text-xl font-bold text-purple-600">{quiz.passing_score}%</p>
// // //             </div>
// // //           </div>

// // //           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
// // //             <h3 className="font-semibold text-yellow-800 mb-2">Quiz Instructions:</h3>
// // //             <ul className="text-sm text-yellow-700 space-y-1">
// // //               <li>• Read each question carefully before answering</li>
// // //               <li>• You can navigate between questions using Next/Previous buttons</li>
// // //               <li>• Make sure to answer all questions before submitting</li>
// // //               <li>• Your progress is automatically saved</li>
// // //             </ul>
// // //           </div>

// // //           <div className="text-center">
// // //             <button
// // //               onClick={startQuiz}
// // //               className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
// // //             >
// // //               Start Quiz
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Quiz;


// // import React, { useState } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { useQuery } from '@tanstack/react-query';
// // import { useAuth } from '../context/AuthContext';
// // import api from '../services/api';
// // import QuizCard from '../components/quizzes/QuizCard'; 
// // import QuizResults from '../components/quizzes/QuizResults';
// // import Loading from '../components/common/Loading';
// // import Header from '../components/common/Header';
// // import { Clock, BookOpen, Trophy, AlertCircle, ArrowLeft, Users, Star } from 'lucide-react';

// // const Quiz = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const { user, logout } = useAuth();
// //   const [showQuiz, setShowQuiz] = useState(false);
// //   const [quizAttempt, setQuizAttempt] = useState(null);
// //   const [showResults, setShowResults] = useState(false);
// //   const [quizResults, setQuizResults] = useState(null);
// //   const [isStarting, setIsStarting] = useState(false); // Added missing state

// //   // Fetch quiz data
// //   const { 
// //     data: quiz, 
// //     isLoading, 
// //     error,
// //     refetch 
// //   } = useQuery(
// //     ['quiz', id],
// //     async () => {
// //       const response = await api.get(`/quizzes/${id}/`);
// //       return response.data;
// //     },
// //     {
// //       enabled: !!id,
// //       onError: (error) => {
// //         console.error('Error fetching quiz:', error);
        
// //         // Handle authentication errors during quiz fetch
// //         if (error.response?.status === 401 || error.response?.status === 403) {
// //           handleAuthError();
// //         }
// //       }
// //     }
// //   );

// //   const handleAuthError = () => {
// //     alert('Your session has expired. Please login again.');
// //     if (logout) {
// //       logout(); // Use auth context logout method
// //     } else {
// //       localStorage.removeItem('access_token');
// //       localStorage.removeItem('refresh_token');
// //     }
// //     navigate('/login');
// //   };

// //   const startQuiz = async () => {
// //     // Prevent multiple attempts to start
// //     if (isStarting) return;
    
// //     setIsStarting(true);
    
// //     try {
// //       const token = localStorage.getItem('access_token');
      
// //       if (!token) {
// //         alert('Authentication required. Please login again.');
// //         navigate('/login');
// //         return;
// //       }

// //       // Check if user is authenticated
// //       if (!user) {
// //         alert('Please login to start the quiz.');
// //         navigate('/login');
// //         return;
// //       }
      
// //       const response = await api.post(`/quizzes/${id}/start/`);
      
// //       // Validate response data
// //       if (!response.data) {
// //         throw new Error('Invalid response from server');
// //       }
      
// //       setQuizAttempt(response.data);
// //       setShowQuiz(true);
      
// //     } catch (error) {
// //       console.error('Failed to start quiz attempt:', error);
      
// //       if (error.response?.status === 403) {
// //         const errorMessage = error.response?.data?.error || '';
        
// //         if (errorMessage.includes('Maximum attempts') || 
// //             errorMessage.includes('attempt limit') ||
// //             errorMessage.includes('attempts exceeded')) {
// //           // Handle attempt limit exceeded
// //           alert('You have reached the maximum number of attempts for this quiz. Please contact your instructor if you need additional attempts.');
// //           navigate('/quizzes');
// //         } else if (errorMessage.includes('enrollment') || 
// //                    errorMessage.includes('not enrolled')) {
// //           // Handle enrollment requirement
// //           alert('You must be enrolled in the course to take this quiz.');
// //           if (quiz?.course?.id) {
// //             navigate(`/courses/${quiz.course.id}`);
// //           } else {
// //             navigate('/courses');
// //           }
// //         } else {
// //           // Handle other 403 errors (auth, session, etc.)
// //           handleAuthError();
// //         }
// //       } else if (error.response?.status === 401) {
// //         // Handle authentication error
// //         handleAuthError();
// //       } else if (error.response?.status === 404) {
// //         alert('Quiz not found or no longer available.');
// //         navigate('/quizzes');
// //       } else {
// //         const errorMessage = error.response?.data?.error || 'Failed to start quiz. Please try again.';
// //         alert(errorMessage);
// //       }
// //     } finally {
// //       setIsStarting(false);
// //     }
// //   };

// //   const handleQuizSubmit = async (answers, timeSpent) => {
// //     if (!quizAttempt) {
// //       alert('No active quiz attempt found.');
// //       return;
// //     }

// //     // Validate answers
// //     if (!answers || Object.keys(answers).length === 0) {
// //       alert('Please answer at least one question before submitting.');
// //       return;
// //     }

// //     try {
// //       const response = await api.post(`/quizzes/attempts/${quizAttempt.id}/submit/`, {
// //         answers: answers,
// //         time_spent: timeSpent || 0
// //       });

// //       console.log('Quiz submission response:', response.data);

// //       // Validate response
// //       if (!response.data) {
// //         throw new Error('Invalid response from server');
// //       }

// //       // Navigate to results with correct data structure
// //       navigate('/quiz-results', { 
// //         state: { 
// //           attempt: response.data,
// //           quiz: quiz 
// //         }
// //       });
      
// //     } catch (error) {
// //       console.error('Error submitting quiz:', error);
      
// //       if (error.response?.status === 401 || error.response?.status === 403) {
// //         handleAuthError();
// //       } else {
// //         const errorMessage = error.response?.data?.error || 'Error submitting quiz. Please try again.';
// //         alert(errorMessage);
// //       }
// //     }
// //   };

// //   const handleBackToQuizzes = () => {
// //     navigate('/quizzes');
// //   };

// //   const handleRetryQuiz = () => {
// //     setShowResults(false);
// //     setShowQuiz(false);
// //     setQuizAttempt(null);
// //     setQuizResults(null);
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50">
// //         <Header />
// //         <Loading />
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gray-50">
// //         <Header />
// //         <div className="flex items-center justify-center py-20">
// //           <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
// //             <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
// //             <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Quiz</h2>
// //             <p className="text-gray-600 mb-4">
// //               {error.response?.data?.error || 'Failed to load quiz. Please try again.'}
// //             </p>
// //             <div className="flex flex-col sm:flex-row gap-3 justify-center">
// //               <button
// //                 onClick={() => refetch()}
// //                 className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
// //               >
// //                 Try Again
// //               </button>
// //               <button
// //                 onClick={handleBackToQuizzes}
// //                 className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
// //               >
// //                 Back to Quizzes
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!quiz) {
// //     return (
// //       <div className="min-h-screen bg-gray-50">
// //         <Header />
// //         <div className="flex items-center justify-center py-20">
// //           <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
// //             <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// //             <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Not Found</h2>
// //             <p className="text-gray-600 mb-4">The requested quiz could not be found.</p>
// //             <button
// //               onClick={handleBackToQuizzes}
// //               className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
// //             >
// //               Back to Quizzes
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (showResults) {
// //     return (
// //       <div className="min-h-screen bg-gray-50">
// //         <Header />
// //         <QuizResults
// //           quiz={quiz}
// //           attempt={quizResults}
// //           onRetry={handleRetryQuiz}
// //           onBackToQuizzes={handleBackToQuizzes}
// //         />
// //       </div>
// //     );
// //   }

// //   if (showQuiz) {
// //     return (
// //       <div className="min-h-screen bg-gray-50">
// //         <Header />
// //         <div className="py-8">
// //           <QuizCard 
// //             quiz={quiz} 
// //             attempt={quizAttempt}
// //             onSubmit={handleQuizSubmit}
// //             onCancel={() => {
// //               if (window.confirm('Are you sure you want to cancel this quiz? Your progress will be lost.')) {
// //                 setShowQuiz(false);
// //                 setQuizAttempt(null);
// //               }
// //             }}
// //           />
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Quiz intro/start screen
// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Header />
      
// //       <div className="py-8">
// //         <div className="max-w-4xl mx-auto px-4">
// //           {/* Back button */}
// //           <button
// //             onClick={handleBackToQuizzes}
// //             className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
// //           >
// //             <ArrowLeft className="w-4 h-4 mr-2" />
// //             Back to Quizzes
// //           </button>

// //           <div className="bg-white rounded-lg shadow-lg overflow-hidden">
// //             {/* Quiz header with gradient */}
// //             <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
// //               <div className="absolute inset-0 bg-black bg-opacity-30"></div>
// //               <div className="absolute inset-0 flex items-center justify-center">
// //                 <div className="text-center text-white">
// //                   <Trophy className="w-16 h-16 mx-auto mb-4 opacity-90" />
// //                   <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
// //                   <p className="text-lg opacity-90">
// //                     {quiz.course?.title || 'Language Quiz'}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="p-8">
// //               {/* Quiz description */}
// //               <div className="text-center mb-8">
// //                 <p className="text-gray-600 text-lg leading-relaxed">
// //                   {quiz.description || 'Test your knowledge with this comprehensive quiz.'}
// //                 </p>
// //               </div>

// //               {/* Quiz stats */}
// //               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// //                 <div className="text-center p-4 bg-blue-50 rounded-lg">
// //                   <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
// //                   <p className="text-sm text-gray-600">Questions</p>
// //                   <p className="text-xl font-bold text-blue-600">
// //                     {quiz.question_count || quiz.questions?.length || 0}
// //                   </p>
// //                 </div>
                
// //                 <div className="text-center p-4 bg-green-50 rounded-lg">
// //                   <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
// //                   <p className="text-sm text-gray-600">Time Limit</p>
// //                   <p className="text-xl font-bold text-green-600">
// //                     {quiz.time_limit_minutes || 30} min
// //                   </p>
// //                 </div>
                
// //                 <div className="text-center p-4 bg-purple-50 rounded-lg">
// //                   <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
// //                   <p className="text-sm text-gray-600">Passing Score</p>
// //                   <p className="text-xl font-bold text-purple-600">
// //                     {quiz.passing_score || 70}%
// //                   </p>
// //                 </div>

// //                 <div className="text-center p-4 bg-orange-50 rounded-lg">
// //                   <Star className="w-8 h-8 text-orange-500 mx-auto mb-2" />
// //                   <p className="text-sm text-gray-600">Difficulty</p>
// //                   <p className="text-xl font-bold text-orange-600 capitalize">
// //                     {quiz.difficulty || 'Medium'}
// //                   </p>
// //                 </div>
// //               </div>

// //               {/* Previous attempts info */}
// //               {quiz.user_attempts && quiz.user_attempts > 0 && (
// //                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
// //                   <div className="flex items-center">
// //                     <Users className="w-5 h-5 text-blue-500 mr-2" />
// //                     <span className="text-blue-800 font-medium">
// //                       Previous Attempts: {quiz.user_attempts}
// //                     </span>
// //                   </div>
// //                   {quiz.best_score && (
// //                     <p className="text-blue-600 text-sm mt-1">
// //                       Best Score: {quiz.best_score}%
// //                     </p>
// //                   )}
// //                 </div>
// //               )}

// //               {/* Quiz instructions */}
// //               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
// //                 <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
// //                   <AlertCircle className="w-5 h-5 mr-2" />
// //                   Quiz Instructions:
// //                 </h3>
// //                 <ul className="text-sm text-yellow-700 space-y-2">
// //                   <li>• Read each question carefully before answering</li>
// //                   <li>• You can navigate between questions using Next/Previous buttons</li>
// //                   <li>• Make sure to answer all questions before submitting</li>
// //                   <li>• Your progress is automatically saved as you go</li>
// //                   <li>• Once submitted, you cannot change your answers</li>
// //                 </ul>
// //               </div>

// //               {/* Course enrollment check */}
// //               {quiz.requires_enrollment && !quiz.is_enrolled && (
// //                 <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
// //                   <p className="text-red-800">
// //                     You must be enrolled in the course to take this quiz.
// //                   </p>
// //                   <button
// //                     onClick={() => navigate(`/courses/${quiz.course?.id}`)}
// //                     className="mt-2 text-red-600 hover:text-red-700 font-medium underline"
// //                   >
// //                     View Course Details
// //                   </button>
// //                 </div>
// //               )}

// //               {/* Start quiz button */}
// //               <div className="text-center">
// //                 <button
// //                   onClick={startQuiz}
// //                   disabled={isStarting || (quiz.requires_enrollment && !quiz.is_enrolled)}
// //                   className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
// //                 >
// //                   {isStarting ? (
// //                     <>
// //                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
// //                       Starting Quiz...
// //                     </>
// //                   ) : (
// //                     <>
// //                       <Trophy className="w-5 h-5 mr-2" />
// //                       Start Quiz
// //                     </>
// //                   )}
// //                 </button>
                
// //                 {(quiz.requires_enrollment && !quiz.is_enrolled) && (
// //                   <p className="text-gray-500 text-sm mt-2">
// //                     Course enrollment required to start quiz
// //                   </p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Quiz;


import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import QuizCard from '../components/quizzes/QuizCard'; 
import QuizResults from '../components/quizzes/QuizResults';
import Loading from '../components/common/Loading';
import Header from '../components/common/Header';
import { Clock, BookOpen, Trophy, AlertCircle, ArrowLeft, Users, Star, Target, Flame } from 'lucide-react';

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAttempt, setQuizAttempt] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [isStarting, setIsStarting] = useState(false);

  // Fetch quiz data
  const { 
    data: quiz, 
    isLoading, 
    error,
    refetch 
  } = useQuery(
    ['quiz', id],
    async () => {
      const response = await api.get(`/quizzes/${id}/`);
      return response.data;
    },
    {
      enabled: !!id,
      onError: (error) => {
        console.error('Error fetching quiz:', error);
        
        if (error.response?.status === 401 || error.response?.status === 403) {
          handleAuthError();
        }
      }
    }
  );

  const handleAuthError = () => {
    alert('Your session has expired. Please login again.');
    if (logout) {
      logout();
    } else {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
    navigate('/login');
  };

  const startQuiz = async () => {
    if (isStarting) return;
    
    setIsStarting(true);
    
    try {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        alert('Authentication required. Please login again.');
        navigate('/login');
        return;
      }

      if (!user) {
        alert('Please login to start the quiz.');
        navigate('/login');
        return;
      }
      
      const response = await api.post(`/quizzes/${id}/start/`);
      
      if (!response.data) {
        throw new Error('Invalid response from server');
      }
      
      setQuizAttempt(response.data);
      setShowQuiz(true);
      
    } catch (error) {
      console.error('Failed to start quiz attempt:', error);
      
      if (error.response?.status === 403) {
        const errorMessage = error.response?.data?.error || '';
        
        if (errorMessage.includes('Maximum attempts') || 
            errorMessage.includes('attempt limit') ||
            errorMessage.includes('attempts exceeded')) {
          alert('You have reached the maximum number of attempts for this quiz. Please contact your instructor if you need additional attempts.');
          navigate('/quizzes');
        } else if (errorMessage.includes('enrollment') || 
                   errorMessage.includes('not enrolled')) {
          alert('You must be enrolled in the course to take this quiz.');
          if (quiz?.course?.id) {
            navigate(`/courses/${quiz.course.id}`);
          } else {
            navigate('/courses');
          }
        } else {
          handleAuthError();
        }
      } else if (error.response?.status === 401) {
        handleAuthError();
      } else if (error.response?.status === 404) {
        alert('Quiz not found or no longer available.');
        navigate('/quizzes');
      } else {
        const errorMessage = error.response?.data?.error || 'Failed to start quiz. Please try again.';
        alert(errorMessage);
      }
    } finally {
      setIsStarting(false);
    }
  };

  const handleQuizSubmit = async (answers, timeSpent) => {
    if (!quizAttempt) {
      alert('No active quiz attempt found.');
      return;
    }

    if (!answers || Object.keys(answers).length === 0) {
      alert('Please answer at least one question before submitting.');
      return;
    }

    try {
      const response = await api.post(`/quizzes/attempts/${quizAttempt.id}/submit/`, {
        answers: answers,
        time_spent: timeSpent || 0
      });

      console.log('Quiz submission response:', response.data);

      if (!response.data) {
        throw new Error('Invalid response from server');
      }

      navigate('/quiz-results', { 
        state: { 
          attempt: response.data,
          quiz: quiz 
        }
      });
      
    } catch (error) {
      console.error('Error submitting quiz:', error);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleAuthError();
      } else {
        const errorMessage = error.response?.data?.error || 'Error submitting quiz. Please try again.';
        alert(errorMessage);
      }
    }
  };

  const handleBackToQuizzes = () => {
    navigate('/quizzes');
  };

  const handleRetryQuiz = () => {
    setShowResults(false);
    setShowQuiz(false);
    setQuizAttempt(null);
    setQuizResults(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-duo-gray-light">
        <Header />
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-duo-gray-light">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
            <div className="w-16 h-16 bg-duo-red rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-dark mb-4">Error Loading Quiz</h2>
            <p className="text-light font-bold mb-6">
              {error.response?.data?.error || 'Failed to load quiz. Please try again.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => refetch()}
                className="bg-duo-blue text-white px-6 py-3 rounded-2xl hover:bg-duo-blue font-black uppercase tracking-wide transform hover:scale-105 transition-all"
              >
                Try Again
              </button>
              <button
                onClick={handleBackToQuizzes}
                className="bg-duo-gray text-white px-6 py-3 rounded-2xl hover:bg-duo-gray font-black uppercase tracking-wide transform hover:scale-105 transition-all"
              >
                Back to Quizzes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-duo-gray-light">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
            <div className="w-16 h-16 bg-duo-gray rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-dark mb-4">Quiz Not Found</h2>
            <p className="text-light font-bold mb-6">The requested quiz could not be found.</p>
            <button
              onClick={handleBackToQuizzes}
              className="bg-duo-blue text-white px-6 py-3 rounded-2xl hover:bg-duo-blue font-black uppercase tracking-wide transform hover:scale-105 transition-all"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-duo-gray-light">
        <Header />
        <QuizResults
          quiz={quiz}
          attempt={quizResults}
          onRetry={handleRetryQuiz}
          onBackToQuizzes={handleBackToQuizzes}
        />
      </div>
    );
  }

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-duo-gray-light">
        <Header />
        <div className="py-8">
          <QuizCard 
            quiz={quiz} 
            attempt={quizAttempt}
            onSubmit={handleQuizSubmit}
            onCancel={() => {
              if (window.confirm('Are you sure you want to cancel this quiz? Your progress will be lost.')) {
                setShowQuiz(false);
                setQuizAttempt(null);
              }
            }}
          />
        </div>
      </div>
    );
  }

  // Quiz intro/start screen
  return (
    <div className="min-h-screen bg-duo-gray-light">
      <Header />
      
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back button */}
          <button
            onClick={handleBackToQuizzes}
            className="flex items-center text-duo-blue hover:text-duo-blue font-black mb-8 transition-colors transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Quizzes
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Quiz header with Duolingo gradient */}
            <div className="relative h-48 bg-gradient-to-r from-duo-purple to-duo-red">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  {/* <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                    <Trophy className="w-10 h-10 text-white" />
                  </div> */}
                  <h1 className="text-4xl font-black mb-3">{quiz.title}</h1>
                  <p className="text-xl font-bold opacity-90">
                    {quiz.course?.title || 'Language Quiz Challenge'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Quiz description */}
              <div className="text-center mb-8">
                <p className="text-light font-bold text-xl leading-relaxed">
                  {quiz.description || 'Test your knowledge with this comprehensive quiz challenge!'}
                </p>
              </div>

              {/* Quiz stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-6 bg-duo-blue bg-opacity-10 rounded-2xl border-2 border-duo-blue border-opacity-20">
                  <div className="w-12 h-12 bg-duo-blue rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-white font-bold mb-1 uppercase tracking-wide">Questions</p>
                  <p className="text-2xl font-black text-white">
                    {quiz.question_count || quiz.questions?.length || 0}
                  </p>
                </div>
                
                <div className="text-center p-6 bg-duo-green bg-opacity-10 rounded-2xl border-2 border-duo-green border-opacity-20">
                  <div className="w-12 h-12 bg-duo-green rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-white font-bold mb-1 uppercase tracking-wide">Time Limit</p>
                  <p className="text-2xl font-black text-white">
                    {quiz.time_limit_minutes || 30} min
                  </p>
                </div>
                
                <div className="text-center p-6 bg-duo-purple bg-opacity-10 rounded-2xl border-2 border-duo-purple border-opacity-20">
                  <div className="w-12 h-12 bg-duo-purple rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-white font-bold mb-1 uppercase tracking-wide">Passing Score</p>
                  <p className="text-2xl font-black text-white">
                    {quiz.passing_score || 70}%
                  </p>
                </div>

                <div className="text-center p-6 bg-duo-yellow bg-opacity-10 rounded-2xl border-2 border-duo-yellow border-opacity-20">
                  <div className="w-12 h-12 bg-duo-yellow rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-white font-bold mb-1 uppercase tracking-wide">Difficulty</p>
                  <p className="text-2xl font-black text-white capitalize">
                    {quiz.difficulty || 'Medium'}
                  </p>
                </div>
              </div>

              {/* Previous attempts info */}
              {quiz.user_attempts && quiz.user_attempts > 0 && (
                <div className="bg-duo-blue bg-opacity-10 border-2 border-duo-blue border-opacity-20 rounded-2xl p-6 mb-8">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-duo-blue rounded-full flex items-center justify-center mr-3">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-duo-blue font-black text-lg">
                      Previous Attempts: {quiz.user_attempts}
                    </span>
                  </div>
                  {quiz.best_score && (
                    <p className="text-duo-blue font-bold mt-2">
                      Best Score: {quiz.best_score}%
                    </p>
                  )}
                </div>
              )}

              {/* Quiz instructions */}
              <div className="bg-duo-yellow bg-opacity-10 border-2 border-duo-yellow border-opacity-20 rounded-2xl p-6 mb-8">
                <h3 className="font-black text-black mb-4 flex items-center text-lg">
                  <div className="w-4 h-6 bg-duo-yellow rounded-full flex items-center justify-center mr-3">
                    <AlertCircle className="w-5 h-3 text-black" />
                  </div>
                  Quiz Instructions:
                </h3>
                <ul className="text-dark font-bold space-y-2">
                  <li>• Read each question carefully before answering</li>
                  <li>• You can navigate between questions using Next/Previous buttons</li>
                  <li>• Make sure to answer all questions before submitting</li>
                  <li>• Your progress is automatically saved as you go</li>
                  <li>• Once submitted, you cannot change your answers</li>
                </ul>
              </div>

              {/* Course enrollment check */}
              {quiz.requires_enrollment && !quiz.is_enrolled && (
                <div className="bg-duo-red bg-opacity-10 border-2 border-duo-red border-opacity-20 rounded-2xl p-6 mb-8">
                  <p className="text-duo-red font-black text-lg mb-4">
                    You must be enrolled in the course to take this quiz.
                  </p>
                  <button
                    onClick={() => navigate(`/courses/${quiz.course?.id}`)}
                    className="bg-duo-red text-white px-6 py-3 rounded-xl font-black hover:bg-duo-red transition-colors uppercase tracking-wide transform hover:scale-105"
                  >
                    View Course Details
                  </button>
                </div>
              )}

              {/* Start quiz button */}
              <div className="text-center">
                <button
                  onClick={startQuiz}
                  disabled={isStarting || (quiz.requires_enrollment && !quiz.is_enrolled)}
                  className="bg-duo-green text-white px-12 py-4 rounded-2xl text-xl font-black hover:bg-duo-green-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto shadow-xl transform hover:scale-105 uppercase tracking-wide"
                >
                  {isStarting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Starting Quiz...
                    </>
                  ) : (
                    <>
                      <Trophy className="w-6 h-6 mr-3" />
                      Start Quiz Challenge
                    </>
                  )}
                </button>
                
                {(quiz.requires_enrollment && !quiz.is_enrolled) && (
                  <p className="text-light font-bold mt-4">
                    Course enrollment required to start quiz
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;


// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useQuery } from 'react-query';
// import { useAuth } from '../context/AuthContext';
// import api from '../services/api';
// import QuizCard from '../components/quizzes/QuizCard'; 
// import QuizResults from '../components/quizzes/QuizResults';
// import Loading from '../components/common/Loading';
// import Header from '../components/common/Header';
// import { Clock, BookOpen, Trophy, AlertCircle, ArrowLeft, Users, Star, Target, Flame } from 'lucide-react';

// const Quiz = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();
//   const [showQuiz, setShowQuiz] = useState(false);
//   const [quizAttempt, setQuizAttempt] = useState(null);
//   const [showResults, setShowResults] = useState(false);
//   const [quizResults, setQuizResults] = useState(null);
//   const [isStarting, setIsStarting] = useState(false);

//   // ✅ FIXED: Updated to React Query v5 syntax
//   const { 
//     data: quiz, 
//     isLoading, 
//     error,
//     refetch 
//   } = useQuery({
//     queryKey: ['quiz', id],
//     queryFn: async () => {
//       const response = await api.get(`/quizzes/${id}/`);
//       return response.data;
//     },
//     enabled: !!id,
//     staleTime: 5 * 60 * 1000,
//     onError: (error) => {
//       console.error('Error fetching quiz:', error);
      
//       if (error.response?.status === 401 || error.response?.status === 403) {
//         handleAuthError();
//       }
//     }
//   });

//   const handleAuthError = () => {
//     alert('Your session has expired. Please login again.');
//     if (logout) {
//       logout();
//     } else {
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('refresh_token');
//     }
//     navigate('/login');
//   };

//   const startQuiz = async () => {
//     if (isStarting) return;
    
//     setIsStarting(true);
    
//     try {
//       const token = localStorage.getItem('access_token');
      
//       if (!token) {
//         alert('Authentication required. Please login again.');
//         navigate('/login');
//         return;
//       }

//       if (!user) {
//         alert('Please login to start the quiz.');
//         navigate('/login');
//         return;
//       }
      
//       // ✅ FIXED: Use correct endpoint for starting quiz
//       const response = await api.post(`/quizzes/${id}/start/`);
      
//       if (!response.data) {
//         throw new Error('Invalid response from server');
//       }
      
//       setQuizAttempt(response.data);
//       setShowQuiz(true);
      
//     } catch (error) {
//       console.error('Failed to start quiz attempt:', error);
      
//       if (error.response?.status === 403) {
//         const errorMessage = error.response?.data?.error || '';
        
//         if (errorMessage.includes('Maximum attempts') || 
//             errorMessage.includes('attempt limit') ||
//             errorMessage.includes('attempts exceeded')) {
//           alert('You have reached the maximum number of attempts for this quiz. Please contact your instructor if you need additional attempts.');
//           navigate('/quizzes');
//         } else if (errorMessage.includes('enrollment') || 
//                    errorMessage.includes('not enrolled')) {
//           alert('You must be enrolled in the course to take this quiz.');
//           if (quiz?.course?.id) {
//             navigate(`/courses/${quiz.course.id}`);
//           } else {
//             navigate('/courses');
//           }
//         } else {
//           handleAuthError();
//         }
//       } else if (error.response?.status === 401) {
//         handleAuthError();
//       } else if (error.response?.status === 404) {
//         alert('Quiz not found or no longer available.');
//         navigate('/quizzes');
//       } else {
//         const errorMessage = error.response?.data?.error || 'Failed to start quiz. Please try again.';
//         alert(errorMessage);
//       }
//     } finally {
//       setIsStarting(false);
//     }
//   };

//   const handleQuizSubmit = async (answers, timeSpent) => {
//     if (!quizAttempt) {
//       alert('No active quiz attempt found.');
//       return;
//     }

//     if (!answers || Object.keys(answers).length === 0) {
//       alert('Please answer at least one question before submitting.');
//       return;
//     }

//     try {
//       const response = await api.post(`/quizzes/attempts/${quizAttempt.id}/submit/`, {
//         answers: answers,
//         time_spent: timeSpent || 0
//       });

//       console.log('Quiz submission response:', response.data);

//       if (!response.data) {
//         throw new Error('Invalid response from server');
//       }

//       navigate('/quiz-results', { 
//         state: { 
//           attempt: response.data,
//           quiz: quiz 
//         }
//       });
      
//     } catch (error) {
//       console.error('Error submitting quiz:', error);
      
//       if (error.response?.status === 401 || error.response?.status === 403) {
//         handleAuthError();
//       } else {
//         const errorMessage = error.response?.data?.error || 'Error submitting quiz. Please try again.';
//         alert(errorMessage);
//       }
//     }
//   };

//   const handleBackToQuizzes = () => {
//     navigate('/quizzes');
//   };

//   const handleRetryQuiz = () => {
//     setShowResults(false);
//     setShowQuiz(false);
//     setQuizAttempt(null);
//     setQuizResults(null);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-duo-gray-light">
//         <Header />
//         <Loading />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-duo-gray-light">
//         <Header />
//         <div className="flex items-center justify-center py-20">
//           <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
//             <div className="w-16 h-16 bg-duo-red rounded-full flex items-center justify-center mx-auto mb-6">
//               <AlertCircle className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-3xl font-black text-dark mb-4">Error Loading Quiz</h2>
//             <p className="text-light font-bold mb-6">
//               {error.response?.data?.error || 'Failed to load quiz. Please try again.'}
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 justify-center">
//               <button
//                 onClick={() => refetch()}
//                 className="bg-duo-blue text-white px-6 py-3 rounded-2xl hover:bg-duo-blue font-black uppercase tracking-wide transform hover:scale-105 transition-all"
//               >
//                 Try Again
//               </button>
//               <button
//                 onClick={handleBackToQuizzes}
//                 className="bg-duo-gray text-white px-6 py-3 rounded-2xl hover:bg-duo-gray font-black uppercase tracking-wide transform hover:scale-105 transition-all"
//               >
//                 Back to Quizzes
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Rest of your component remains the same...
//   if (!quiz) {
//     return (
//       <div className="min-h-screen bg-duo-gray-light">
//         <Header />
//         <div className="flex items-center justify-center py-20">
//           <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
//             <div className="w-16 h-16 bg-duo-gray rounded-full flex items-center justify-center mx-auto mb-6">
//               <BookOpen className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-3xl font-black text-dark mb-4">Quiz Not Found</h2>
//             <p className="text-light font-bold mb-6">The requested quiz could not be found.</p>
//             <button
//               onClick={handleBackToQuizzes}
//               className="bg-duo-blue text-white px-6 py-3 rounded-2xl hover:bg-duo-blue font-black uppercase tracking-wide transform hover:scale-105 transition-all"
//             >
//               Back to Quizzes
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (showResults) {
//     return (
//       <div className="min-h-screen bg-duo-gray-light">
//         <Header />
//         <QuizResults
//           quiz={quiz}
//           attempt={quizResults}
//           onRetry={handleRetryQuiz}
//           onBackToQuizzes={handleBackToQuizzes}
//         />
//       </div>
//     );
//   }

//   if (showQuiz) {
//     return (
//       <div className="min-h-screen bg-duo-gray-light">
//         <Header />
//         <div className="py-8">
//           <QuizCard 
//             quiz={quiz} 
//             attempt={quizAttempt}
//             onSubmit={handleQuizSubmit}
//             onCancel={() => {
//               if (window.confirm('Are you sure you want to cancel this quiz? Your progress will be lost.')) {
//                 setShowQuiz(false);
//                 setQuizAttempt(null);
//               }
//             }}
//           />
//         </div>
//       </div>
//     );
//   }

//   // Quiz intro/start screen - rest of your component remains the same
//   return (
//     <div className="min-h-screen bg-duo-gray-light">
//       <Header />
      
//       <div className="py-8">
//         <div className="max-w-4xl mx-auto px-4">
//           {/* Back button */}
//           <button
//             onClick={handleBackToQuizzes}
//             className="flex items-center text-duo-blue hover:text-duo-blue font-black mb-8 transition-colors transform hover:scale-105"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back to Quizzes
//           </button>

//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             {/* Quiz header with Duolingo gradient */}
//             <div className="relative h-48 bg-gradient-to-r from-duo-purple to-duo-red">
//               <div className="absolute inset-0 bg-black bg-opacity-20"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="text-center text-white">
//                   <h1 className="text-4xl font-black mb-3">{quiz.title}</h1>
//                   <p className="text-xl font-bold opacity-90">
//                     {quiz.course?.title || 'Language Quiz Challenge'}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-8">
//               {/* Quiz description */}
//               <div className="text-center mb-8">
//                 <p className="text-light font-bold text-xl leading-relaxed">
//                   {quiz.description || 'Test your knowledge with this comprehensive quiz challenge!'}
//                 </p>
//               </div>

//               {/* Quiz stats */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//                 <div className="text-center p-6 bg-duo-blue bg-opacity-10 rounded-2xl border-2 border-duo-blue border-opacity-20">
//                   <div className="w-12 h-12 bg-duo-blue rounded-full flex items-center justify-center mx-auto mb-3">
//                     <BookOpen className="w-6 h-6 text-white" />
//                   </div>
//                   <p className="text-sm text-duo-blue font-bold mb-1 uppercase tracking-wide">Questions</p>
//                   <p className="text-2xl font-black text-duo-blue">
//                     {quiz.question_count || quiz.questions?.length || 0}
//                   </p>
//                 </div>
                
//                 <div className="text-center p-6 bg-duo-green bg-opacity-10 rounded-2xl border-2 border-duo-green border-opacity-20">
//                   <div className="w-12 h-12 bg-duo-green rounded-full flex items-center justify-center mx-auto mb-3">
//                     <Clock className="w-6 h-6 text-white" />
//                   </div>
//                   <p className="text-sm text-duo-green font-bold mb-1 uppercase tracking-wide">Time Limit</p>
//                   <p className="text-2xl font-black text-duo-green">
//                     {quiz.time_limit_minutes || 30} min
//                   </p>
//                 </div>
                
//                 <div className="text-center p-6 bg-duo-purple bg-opacity-10 rounded-2xl border-2 border-duo-purple border-opacity-20">
//                   <div className="w-12 h-12 bg-duo-purple rounded-full flex items-center justify-center mx-auto mb-3">
//                     <Trophy className="w-6 h-6 text-white" />
//                   </div>
//                   <p className="text-sm text-duo-purple font-bold mb-1 uppercase tracking-wide">Passing Score</p>
//                   <p className="text-2xl font-black text-duo-purple">
//                     {quiz.passing_score || 70}%
//                   </p>
//                 </div>

//                 <div className="text-center p-6 bg-duo-yellow bg-opacity-10 rounded-2xl border-2 border-duo-yellow border-opacity-20">
//                   <div className="w-12 h-12 bg-duo-yellow rounded-full flex items-center justify-center mx-auto mb-3">
//                     <Star className="w-6 h-6 text-white" />
//                   </div>
//                   <p className="text-sm text-duo-yellow font-bold mb-1 uppercase tracking-wide">Difficulty</p>
//                   <p className="text-2xl font-black text-duo-yellow capitalize">
//                     {quiz.difficulty || 'Medium'}
//                   </p>
//                 </div>
//               </div>

//               {/* Previous attempts info */}
//               {quiz.user_attempts && quiz.user_attempts > 0 && (
//                 <div className="bg-duo-blue bg-opacity-10 border-2 border-duo-blue border-opacity-20 rounded-2xl p-6 mb-8">
//                   <div className="flex items-center">
//                     <div className="w-8 h-8 bg-duo-blue rounded-full flex items-center justify-center mr-3">
//                       <Users className="w-4 h-4 text-white" />
//                     </div>
//                     <span className="text-duo-blue font-black text-lg">
//                       Previous Attempts: {quiz.user_attempts}
//                     </span>
//                   </div>
//                   {quiz.best_score && (
//                     <p className="text-duo-blue font-bold mt-2">
//                       Best Score: {quiz.best_score}%
//                     </p>
//                   )}
//                 </div>
//               )}

//               {/* Quiz instructions */}
//               <div className="bg-duo-yellow bg-opacity-10 border-2 border-duo-yellow border-opacity-20 rounded-2xl p-6 mb-8">
//                 <h3 className="font-black text-duo-yellow mb-4 flex items-center text-lg">
//                   <div className="w-6 h-6 bg-duo-yellow rounded-full flex items-center justify-center mr-3">
//                     <AlertCircle className="w-4 h-4 text-white" />
//                   </div>
//                   Quiz Instructions:
//                 </h3>
//                 <ul className="text-dark font-bold space-y-2">
//                   <li>• Read each question carefully before answering</li>
//                   <li>• You can navigate between questions using Next/Previous buttons</li>
//                   <li>• Make sure to answer all questions before submitting</li>
//                   <li>• Your progress is automatically saved as you go</li>
//                   <li>• Once submitted, you cannot change your answers</li>
//                 </ul>
//               </div>

//               {/* Course enrollment check */}
//               {quiz.requires_enrollment && !quiz.is_enrolled && (
//                 <div className="bg-duo-red bg-opacity-10 border-2 border-duo-red border-opacity-20 rounded-2xl p-6 mb-8">
//                   <p className="text-duo-red font-black text-lg mb-4">
//                     You must be enrolled in the course to take this quiz.
//                   </p>
//                   <button
//                     onClick={() => navigate(`/courses/${quiz.course?.id}`)}
//                     className="bg-duo-red text-white px-6 py-3 rounded-xl font-black hover:bg-duo-red transition-colors uppercase tracking-wide transform hover:scale-105"
//                   >
//                     View Course Details
//                   </button>
//                 </div>
//               )}

//               {/* Start quiz button */}
//               <div className="text-center">
//                 <button
//                   onClick={startQuiz}
//                   disabled={isStarting || (quiz.requires_enrollment && !quiz.is_enrolled)}
//                   className="bg-duo-green text-white px-12 py-4 rounded-2xl text-xl font-black hover:bg-duo-green-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto shadow-xl transform hover:scale-105 uppercase tracking-wide"
//                 >
//                   {isStarting ? (
//                     <>
//                       <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
//                       Starting Quiz...
//                     </>
//                   ) : (
//                     <>
//                       <Trophy className="w-6 h-6 mr-3" />
//                       Start Quiz Challenge
//                     </>
//                   )}
//                 </button>
                
//                 {(quiz.requires_enrollment && !quiz.is_enrolled) && (
//                   <p className="text-light font-bold mt-4">
//                     Course enrollment required to start quiz
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quiz;
