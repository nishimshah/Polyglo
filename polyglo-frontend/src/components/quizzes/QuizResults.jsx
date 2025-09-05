// // import React from 'react';
// // import { CheckCircle, XCircle, RotateCcw, ArrowRight, Star } from 'lucide-react';
// // import { Link } from 'react-router-dom';

// // const QuizResults = ({ results, quiz, onRetake }) => {
// //   const {
// //     score,
// //     passed,
// //     earned_points,
// //     total_points,
// //     time_spent_seconds,
// //     answers
// //   } = results;

// //   const formatTime = (seconds) => {
// //     const minutes = Math.floor(seconds / 60);
// //     const remainingSeconds = seconds % 60;
// //     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
// //   };

// //   const getScoreColor = () => {
// //     if (score >= 90) return 'text-emerald-600';
// //     if (score >= 70) return 'text-blue-600';
// //     if (score >= 50) return 'text-amber-600';
// //     return 'text-red-600';
// //   };

// //   const getScoreBgColor = () => {
// //     if (score >= 90) return 'from-emerald-500 to-emerald-600';
// //     if (score >= 70) return 'from-blue-500 to-blue-600';
// //     if (score >= 50) return 'from-amber-500 to-amber-600';
// //     return 'from-red-500 to-red-600';
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="container mx-auto px-6 py-8">
// //         <div className="max-w-4xl mx-auto">
// //           {/* Results Header */}
// //           <div className={`bg-gradient-to-r ${getScoreBgColor()} rounded-3xl p-8 text-white mb-8 text-center`}>
// //             <div className="mb-6">
// //               {passed ? (
// //                 <CheckCircle className="w-16 h-16 mx-auto mb-4" />
// //               ) : (
// //                 <XCircle className="w-16 h-16 mx-auto mb-4" />
// //               )}
// //             </div>
            
// //             <h1 className="text-4xl font-bold mb-2">
// //               {passed ? 'Congratulations!' : 'Keep Practicing!'}
// //             </h1>
// //             <p className="text-xl opacity-90">
// //               {passed 
// //                 ? 'You passed the quiz successfully!' 
// //                 : `You need ${quiz.passing_score}% to pass. You got ${score}%.`
// //               }
// //             </p>
// //           </div>

// //           {/* Score Summary */}
// //           <div className="grid md:grid-cols-4 gap-6 mb-8">
// //             <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
// //               <div className={`text-3xl font-bold ${getScoreColor()} mb-2`}>
// //                 {score}%
// //               </div>
// //               <div className="text-stone-600">Final Score</div>
// //             </div>
            
// //             <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
// //               <div className="text-3xl font-bold text-stone-800 mb-2">
// //                 {earned_points}/{total_points}
// //               </div>
// //               <div className="text-stone-600">Points Earned</div>
// //             </div>
            
// //             <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
// //               <div className="text-3xl font-bold text-stone-800 mb-2">
// //                 {formatTime(time_spent_seconds)}
// //               </div>
// //               <div className="text-stone-600">Time Taken</div>
// //             </div>
            
// //             <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
// //               <div className="text-3xl font-bold text-stone-800 mb-2">
// //                 {answers?.filter(a => a.is_correct).length || 0}/{answers?.length || 0}
// //               </div>
// //               <div className="text-stone-600">Correct Answers</div>
// //             </div>
// //           </div>

// //           {/* Detailed Results */}
// //           <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
// //             <h2 className="text-2xl font-bold text-stone-800 mb-6">Question Review</h2>
            
// //             <div className="space-y-6">
// //               {answers?.map((answer, index) => (
// //                 <div key={index} className="border-b border-stone-200 pb-6 last:border-b-0">
// //                   <div className="flex items-start justify-between mb-3">
// //                     <h3 className="text-lg font-semibold text-stone-800 flex-1">
// //                       Question {index + 1}: {answer.question.question_text}
// //                     </h3>
// //                     <div className="flex items-center ml-4">
// //                       {answer.is_correct ? (
// //                         <CheckCircle className="w-6 h-6 text-emerald-600" />
// //                       ) : (
// //                         <XCircle className="w-6 h-6 text-red-600" />
// //                       )}
// //                     </div>
// //                   </div>
                  
// //                   <div className="grid md:grid-cols-2 gap-4 text-sm">
// //                     <div>
// //                       <span className="font-medium text-stone-600">Your Answer:</span>
// //                       <p className={`mt-1 ${answer.is_correct ? 'text-emerald-700' : 'text-red-700'}`}>
// //                         {typeof answer.user_answer === 'object' 
// //                           ? JSON.stringify(answer.user_answer)
// //                           : answer.user_answer
// //                         }
// //                       </p>
// //                     </div>
                    
// //                     {!answer.is_correct && (
// //                       <div>
// //                         <span className="font-medium text-stone-600">Correct Answer:</span>
// //                         <p className="text-emerald-700 mt-1">
// //                           {typeof answer.question.correct_answer === 'object'
// //                             ? JSON.stringify(answer.question.correct_answer)
// //                             : answer.question.correct_answer
// //                           }
// //                         </p>
// //                       </div>
// //                     )}
// //                   </div>
                  
// //                   {answer.question.explanation && (
// //                     <div className="mt-3 bg-blue-50 rounded-lg p-3">
// //                       <span className="font-medium text-blue-800">Explanation:</span>
// //                       <p className="text-blue-700 mt-1">{answer.question.explanation}</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Action Buttons */}
// //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //             <button
// //               onClick={onRetake}
// //               className="flex items-center justify-center px-8 py-4 bg-stone-600 text-white rounded-2xl hover:bg-stone-700 transition-colors duration-200 font-semibold"
// //             >
// //               <RotateCcw className="w-5 h-5 mr-2" />
// //               Retake Quiz
// //             </button>
            
// //             <Link
// //               to="/courses"
// //               className="flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors duration-200 font-semibold"
// //             >
// //               Back to Courses
// //               <ArrowRight className="w-5 h-5 ml-2" />
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default QuizResults;

// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Trophy, CheckCircle, XCircle, Clock, ArrowLeft, RotateCcw } from 'lucide-react';

// const QuizResults = ({ quiz, attempt, onRetry, onBackToQuizzes }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Get data from props or location state
//   const quizData = quiz || location.state?.quiz;
//   const attemptData = attempt || location.state?.attempt;

//   // Add debug logging
//   console.log('QuizResults props:', { quiz, attempt });
//   console.log('Location state:', location.state);
//   console.log('Quiz data:', quizData);
//   console.log('Attempt data:', attemptData);

//   if (!quizData || !attemptData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center max-w-md mx-auto p-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">No Results Found</h2>
//           <p className="text-gray-600 mb-4">Quiz results are not available.</p>
//           <button
//             onClick={() => navigate('/quizzes')}
//             className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Back to Quizzes
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Safely get the score and other properties
//   const passed = attemptData.passed || false;
//   const scorePercentage = attemptData.score ? Math.round(attemptData.score) : 0;
//   const earnedPoints = attemptData.earned_points || 0;
//   const totalPoints = attemptData.total_points || 0;
//   const timeSpent = attemptData.time_spent_seconds || 0;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-2xl mx-auto px-4">
//         <div className="bg-white rounded-lg shadow-lg p-8">
//           <div className="text-center mb-8">
//             {passed ? (
//               <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
//             ) : (
//               <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
//             )}
            
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">
//               {passed ? 'Congratulations!' : 'Better Luck Next Time'}
//             </h1>
//             <p className="text-gray-600">
//               {passed ? 'You passed the quiz!' : 'You can try again to improve your score.'}
//             </p>
//           </div>

//           <div className="bg-gray-50 rounded-lg p-6 mb-8">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">{quizData.title}</h2>
            
//             <div className="grid grid-cols-2 gap-4">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-blue-600 mb-1">
//                   {scorePercentage}%
//                 </div>
//                 <p className="text-sm text-gray-600">Your Score</p>
//               </div>
              
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-green-600 mb-1">
//                   {earnedPoints}/{totalPoints}
//                 </div>
//                 <p className="text-sm text-gray-600">Points Earned</p>
//               </div>
//             </div>

//             <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
//               <Clock className="w-4 h-4 mr-2" />
//               <span>
//                 Time taken: {Math.floor(timeSpent / 60)} minutes {timeSpent % 60} seconds
//               </span>
//             </div>
//           </div>

//           <div className="flex justify-center space-x-4">
//             <button
//               onClick={onBackToQuizzes || (() => navigate('/quizzes'))}
//               className="flex items-center bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Quizzes
//             </button>
            
//             {!passed && (
//               <button
//                 onClick={onRetry || (() => navigate(`/quiz/${quizData.id}`))}
//                 className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//               >
//                 <RotateCcw className="w-4 h-4 mr-2" />
//                 Try Again
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizResults;


import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, CheckCircle, XCircle, Clock, ArrowLeft, RotateCcw, Star, Award, Target, Flame } from 'lucide-react';
import Header from '../common/Header';

const QuizResults = ({ quiz, attempt, onRetry, onBackToQuizzes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from props or location state
  const quizData = quiz || location.state?.quiz;
  const attemptData = attempt || location.state?.attempt;

  // Add debug logging
  console.log('QuizResults props:', { quiz, attempt });
  console.log('Location state:', location.state);
  console.log('Quiz data:', quizData);
  console.log('Attempt data:', attemptData);

  if (!quizData || !attemptData) {
    return (
      <div className="min-h-screen bg-duo-gray-light">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
            <div className="w-16 h-16 bg-duo-gray rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-dark mb-4">No Results Found</h2>
            <p className="text-light font-bold mb-6">Quiz results are not available.</p>
            <button
              onClick={() => navigate('/quizzes')}
              className="bg-duo-blue text-white px-8 py-3 rounded-2xl hover:bg-duo-blue font-black uppercase tracking-wide transform hover:scale-105 transition-all"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Safely get the score and other properties
  const passed = attemptData.passed || false;
  const scorePercentage = attemptData.score ? Math.round(attemptData.score) : 0;
  const earnedPoints = attemptData.earned_points || 0;
  const totalPoints = attemptData.total_points || 0;
  const timeSpent = attemptData.time_spent_seconds || 0;

  // Get performance level for styling
  const getPerformanceLevel = (score) => {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'great';
    if (score >= 70) return 'good';
    if (score >= 60) return 'fair';
    return 'needs-improvement';
  };

  const performanceLevel = getPerformanceLevel(scorePercentage);

  return (
    <div className="min-h-screen bg-duo-gray-light">
      <Header />
      
      <div className="py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Results Header */}
            <div className={`relative h-48 ${passed ? 'bg-gradient-to-r from-duo-green to-duo-green-dark' : 'bg-gradient-to-r from-duo-red to-duo-purple'}`}>
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  {/* {passed ? (
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                      <Trophy className="w-12 h-12 text-white" />
                    </div>
                  ) : (
                    // <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    //   <RotateCcw className="w-12 h-12 text-white" />
                    // </div>
                  )} */}
                  
                  <h1 className="text-4xl font-black mb-3">
                    {passed ? 'Congratulations! 🎉' : 'Keep Trying! 💪'}
                  </h1>
                  <p className="text-xl font-bold opacity-90">
                    {passed ? 'You crushed this quiz!' : 'Every attempt makes you stronger!'}
                  </p>
                </div>
              </div>

              {/* Floating decorative elements */}
              {passed && (
                <>
                  <div className="absolute top-6 left-6 w-8 h-8 bg-duo-yellow rounded-full flex items-center justify-center animate-bounce-gentle">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-12 right-8 w-6 h-6 bg-white bg-opacity-30 rounded-full animate-float"></div>
                  <div className="absolute bottom-8 right-12 w-4 h-4 bg-duo-yellow rounded-full animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
                </>
              )}
            </div>

            <div className="p-8">
              {/* Quiz Title */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-dark mb-2">{quizData.title}</h2>
                <p className="text-light font-bold">Quiz Results Summary</p>
              </div>
              
              {/* Score Display */}
              <div className="bg-duo-gray-light rounded-2xl p-8 mb-8 text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Score Percentage */}
                  <div className="text-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      passed ? 'bg-duo-green' : 'bg-duo-red'
                    }`}>
                      {passed ? (
                        <CheckCircle className="w-10 h-10 text-white" />
                      ) : (
                        <XCircle className="w-10 h-10 text-white" />
                      )}
                    </div>
                    <div className={`text-4xl font-black mb-2 ${
                      passed ? 'text-duo-green' : 'text-duo-red'
                    }`}>
                      {scorePercentage}%
                    </div>
                    <p className="text-light font-bold uppercase tracking-wide">Your Score</p>
                  </div>
                  
                  {/* Points Earned */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-duo-blue rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-4xl font-black text-duo-blue mb-2">
                      {earnedPoints}/{totalPoints}
                    </div>
                    <p className="text-light font-bold uppercase tracking-wide">Points Earned</p>
                  </div>

                  {/* Time Spent */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-duo-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-4xl font-black text-duo-yellow mb-2">
                      {Math.floor(timeSpent / 60)}:{String(timeSpent % 60).padStart(2, '0')}
                    </div>
                    <p className="text-light font-bold uppercase tracking-wide">Time Taken</p>
                  </div>
                </div>

                {/* Performance Badge */}
                <div className="mt-8">
                  <div className={`inline-flex items-center px-6 py-3 rounded-full font-black text-white ${
                    performanceLevel === 'excellent' ? 'bg-duo-green' :
                    performanceLevel === 'great' ? 'bg-duo-blue' :
                    performanceLevel === 'good' ? 'bg-duo-yellow' :
                    performanceLevel === 'fair' ? 'bg-duo-purple' :
                    'bg-duo-red'
                  }`}>
                    <Award className="w-5 h-5 mr-2" />
                    <span className="uppercase tracking-wide">
                      {performanceLevel === 'excellent' ? 'Excellent Work!' :
                       performanceLevel === 'great' ? 'Great Job!' :
                       performanceLevel === 'good' ? 'Good Effort!' :
                       performanceLevel === 'fair' ? 'Fair Attempt' :
                       'Keep Practicing!'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance Feedback */}
              <div className={`p-6 rounded-2xl mb-8 ${
                passed 
                  ? 'bg-duo-green bg-opacity-10 border-2 border-duo-green border-opacity-20' 
                  : 'bg-duo-red bg-opacity-10 border-2 border-duo-red border-opacity-20'
              }`}>
                <div className="text-center">
                  <h3 className={`text-xl font-black mb-3 ${passed ? 'text-white' : 'text-white'}`}>
                    {passed ? 'Mission Accomplished!' : '🚀 Ready for Round Two?'}
                  </h3>
                  <p className="text-dark font-bold leading-relaxed">
                    {passed 
                      ? `Amazing work! You scored ${scorePercentage}% and demonstrated excellent understanding of the material. You're ready to move forward in your learning journey!`
                      : `Don't give up! You scored ${scorePercentage}% which shows you're making progress. Review the material and try again - you've got this!`
                    }
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={onBackToQuizzes || (() => navigate('/quizzes'))}
                  className="flex items-center justify-center bg-duo-gray text-white px-8 py-4 rounded-2xl hover:bg-duo-gray font-black transition-all transform hover:scale-105 shadow-lg uppercase tracking-wide"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Quizzes
                </button>
                
                {!passed && (
                  <button
                    onClick={onRetry || (() => navigate(`/quiz/${quizData.id}`))}
                    className="flex items-center justify-center bg-duo-blue text-white px-8 py-4 rounded-2xl hover:bg-duo-blue font-black transition-all transform hover:scale-105 shadow-lg uppercase tracking-wide"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Try Again
                  </button>
                )}

                {passed && (
                  <button
                    onClick={() => navigate('/quizzes')}
                    className="flex items-center justify-center bg-duo-green text-white px-8 py-4 rounded-2xl hover:bg-duo-green-dark font-black transition-all transform hover:scale-105 shadow-lg uppercase tracking-wide"
                  >
                    <Flame className="w-5 h-5 mr-2" />
                    Next Challenge
                  </button>
                )}
              </div>

              {/* Motivational Section */}
              <div className="mt-12 text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-duo-purple rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-dark mb-3">Keep Learning!</h3>
                  <p className="text-light font-bold">
                    {passed 
                      ? "Congratulations on passing! Continue your learning journey with more quizzes and challenges."
                      : "Every expert was once a beginner. Keep practicing and you'll master this topic!"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
