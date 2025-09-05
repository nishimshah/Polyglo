// import React, { useState, useEffect } from 'react';
// import { Clock } from 'lucide-react';
// import QuizTimer from './QuizTimer';
// import QuizNavigation from './QuizNavigation';
// import MultipleChoice from './QuestionTypes/MultipleChoice';
// import TrueFalse from './QuestionTypes/TrueFalse';
// import FillInTheBlanks from './QuestionTypes/FillInTheBlank';
// import TypeAnswer from './QuestionTypes/TypeAnswer';
// import AudioQuestion from './QuestionTypes/AudioQuestion';
// import Matching from './QuestionTypes/Matching';

// const QuizCard = ({ quiz, onSubmit }) => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [quizActive, setQuizActive] = useState(true);
//   const [startTime] = useState(Date.now());

//   const currentQuestion = quiz.questions?.[currentQuestionIndex];
//   const totalQuestions = quiz.questions?.length || 0;

//   // Debug logging
//   useEffect(() => {
//     console.log('Quiz data:', quiz);
//     console.log('Total questions:', totalQuestions);
//     console.log('Time limit:', quiz.time_limit_minutes);
//   }, [quiz, totalQuestions]);

//   const handleAnswerChange = (questionId, answerId) => {
//     console.log(`Answer changed for question ${questionId}:`, answerId);
//     setAnswers(prev => ({
//       ...prev,
//       [currentQuestionIndex]: answerId // Use index as key for your QuizNavigation
//     }));
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < totalQuestions - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(prev => prev - 1);
//     }
//   };

//   const handleQuestionJump = (questionIndex) => {
//     console.log(`Jumping to question ${questionIndex}`);
//     setCurrentQuestionIndex(questionIndex);
//   };

//   const handleTimeUp = () => {
//     console.log('Time is up! Auto-submitting quiz...');
//     setQuizActive(false);
//     handleSubmitQuiz();
//   };

//   const handleSubmitQuiz = async () => {
//     console.log('Submitting quiz with answers:', answers);
//     setIsSubmitting(true);
//     setQuizActive(false); // Stop the timer
    
//     try {
//       // Calculate time spent
//       const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      
//       // Transform answers to match your backend format
//       // Convert index-based answers to question-id based answers
//       const transformedAnswers = {};
//       Object.keys(answers).forEach(index => {
//         const questionIndex = parseInt(index);
//         const question = quiz.questions[questionIndex];
//         if (question) {
//           transformedAnswers[question.id] = answers[index];
//         }
//       });
      
//       console.log('Transformed answers:', transformedAnswers);
      
//       await onSubmit(transformedAnswers, timeSpent);
//     } catch (error) {
//       console.error('Error submitting quiz:', error);
//       setQuizActive(true); // Restart timer if submission failed
//       alert('Error submitting quiz. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const renderQuestion = () => {
//     if (!currentQuestion) {
//       return (
//         <div className="text-center text-gray-600 py-8">
//           <p className="text-lg">No question available</p>
//         </div>
//       );
//     }

//     const questionProps = {
//       question: currentQuestion,
//       selectedAnswer: answers[currentQuestionIndex],
//       onAnswerChange: (answerId) => handleAnswerChange(currentQuestion.id, answerId),
//     };

//     console.log('Rendering question type:', currentQuestion.question_type);
//     console.log('Current question:', currentQuestion);

//     switch (currentQuestion.question_type) {
//       case 'multiple_choice':
//         return <MultipleChoice {...questionProps} />;
      
//       case 'true_false':
//         return <TrueFalse {...questionProps} />;
      
//       case 'fill_blank':
//       case 'fill_in_blank':
//         return <FillInTheBlanks {...questionProps} />;
      
//       case 'type_answer':
//       case 'typing':
//         return <TypeAnswer {...questionProps} />;
      
//       case 'audio':
//         return <AudioQuestion {...questionProps} />;
      
//       case 'matching':
//         return <Matching {...questionProps} />;
      
//       default:
//         return (
//           <div className="text-center text-gray-600 py-8">
//             <p className="text-lg mb-2">Unsupported question type: {currentQuestion.question_type}</p>
//             <p className="text-sm">Please contact support for assistance.</p>
//           </div>
//         );
//     }
//   };

//   // Handle case where quiz has no questions
//   if (!quiz || totalQuestions === 0) {
//     return (
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
//         <div className="text-center text-gray-600">
//           <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
//           <h2 className="text-2xl font-semibold mb-2">No Questions Available</h2>
//           <p className="text-lg">This quiz doesn't have any questions yet.</p>
//           <p className="text-sm mt-2 text-gray-500">Please contact your instructor or try again later.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto space-y-6">
//       {/* Main Quiz Content */}
//       <div className="bg-white rounded-lg shadow-lg p-8">
//         {/* Header with Timer */}
//         <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
//             <p className="text-gray-600">
//               Question {currentQuestionIndex + 1} of {totalQuestions}
//             </p>
//             {quiz.description && (
//               <p className="text-sm text-gray-500 mt-1">{quiz.description}</p>
//             )}
//           </div>
          
//           {/* Timer - Only show if time limit exists and is valid */}
//           {quiz.time_limit_minutes && !isNaN(quiz.time_limit_minutes) && quiz.time_limit_minutes > 0 && (
//             <div className="flex-shrink-0">
//               <QuizTimer
//                 timeLimit={Number(quiz.time_limit_minutes)}
//                 onTimeUp={handleTimeUp}
//                 isActive={quizActive && !isSubmitting}
//               />
//             </div>
//           )}
//         </div>

//         {/* Progress Indicator */}
//         <div className="mb-8">
//           <div className="flex justify-between text-sm text-gray-600 mb-2">
//             <span>Progress</span>
//             <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Complete</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-blue-500 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
//             ></div>
//           </div>
//         </div>

//         {/* Question Content */}
//         <div className="mb-8 min-h-[400px]">
//           {isSubmitting ? (
//             <div className="text-center py-16">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//               <p className="text-lg text-gray-600">Submitting your quiz...</p>
//               <p className="text-sm text-gray-500 mt-2">Please wait while we process your answers.</p>
//             </div>
//           ) : (
//             renderQuestion()
//           )}
//         </div>
//       </div>

//       {/* Navigation Component */}
//       {!isSubmitting && (
//         <QuizNavigation
//           currentQuestion={currentQuestionIndex}
//           totalQuestions={totalQuestions}
//           answers={answers}
//           onPrevious={handlePrevious}
//           onNext={handleNext}
//           onSubmit={handleSubmitQuiz}
//           onQuestionJump={handleQuestionJump}
//         />
//       )}

//       {/* Quiz Info Panel */}
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Quiz Information</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//           <div className="text-center p-3 bg-blue-50 rounded-lg">
//             <p className="font-semibold text-blue-800">Total Questions</p>
//             <p className="text-2xl font-bold text-blue-600">{totalQuestions}</p>
//           </div>
//           <div className="text-center p-3 bg-green-50 rounded-lg">
//             <p className="font-semibold text-green-800">Answered</p>
//             <p className="text-2xl font-bold text-green-600">{Object.keys(answers).length}</p>
//           </div>
//           <div className="text-center p-3 bg-orange-50 rounded-lg">
//             <p className="font-semibold text-orange-800">Remaining</p>
//             <p className="text-2xl font-bold text-orange-600">{totalQuestions - Object.keys(answers).length}</p>
//           </div>
//           <div className="text-center p-3 bg-purple-50 rounded-lg">
//             <p className="font-semibold text-purple-800">Passing Score</p>
//             <p className="text-2xl font-bold text-purple-600">{quiz.passing_score || 70}%</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizCard;

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import QuizTimer from './QuizTimer';
import QuizNavigation from './QuizNavigation';
import MultipleChoice from './QuestionTypes/MultipleChoice';
import TrueFalse from './QuestionTypes/TrueFalse';
import FillInTheBlanks from './QuestionTypes/FillInTheBlank';
import TypeAnswer from './QuestionTypes/TypeAnswer';
import AudioQuestion from './QuestionTypes/AudioQuestion';
import Matching from './QuestionTypes/Matching';

const QuizCard = ({ quiz, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizActive, setQuizActive] = useState(true);
  const [startTime] = useState(Date.now());

  const currentQuestion = quiz.questions?.[currentQuestionIndex];
  const totalQuestions = quiz.questions?.length || 0;

  // Debug logging
  useEffect(() => {
    console.log('Quiz data:', quiz);
    console.log('Total questions:', totalQuestions);
    console.log('Time limit:', quiz.time_limit_minutes);
    console.log('Current answers state:', answers);
  }, [quiz, totalQuestions, answers]);

  // ✅ FIXED: Added the missing handleAnswerSelect function
  const handleAnswerSelect = (answer) => {
    console.log('QuizCard handleAnswerSelect called:', { 
      questionId: currentQuestion?.id,
      questionIndex: currentQuestionIndex,
      answer 
    });
    
    if (!currentQuestion?.id) {
      console.error('No current question ID');
      return;
    }
    
    // ✅ FIXED: Store answer by question ID (not index)
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  // ✅ ENHANCED: Keep this for backward compatibility but fix the storage
  const handleAnswerChange = (questionId, answerId) => {
    console.log(`Answer changed for question ${questionId}:`, answerId);
    
    // ✅ FIXED: Store by question ID consistently
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleQuestionJump = (questionIndex) => {
    console.log(`Jumping to question ${questionIndex}`);
    if (questionIndex >= 0 && questionIndex < totalQuestions) {
      setCurrentQuestionIndex(questionIndex);
    }
  };

  const handleTimeUp = () => {
    console.log('Time is up! Auto-submitting quiz...');
    setQuizActive(false);
    handleSubmitQuiz();
  };

  const handleSubmitQuiz = async () => {
    console.log('Submitting quiz with answers:', answers);
    setIsSubmitting(true);
    setQuizActive(false);
    
    try {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      
      // ✅ FIXED: No need to transform - answers are already stored by question ID
      console.log('Final answers for submission:', answers);
      
      await onSubmit(answers, timeSpent);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setQuizActive(true);
      alert('Error submitting quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ FIXED: Updated renderQuestion function
  const renderQuestion = () => {
    if (!currentQuestion) {
      return (
        <div className="text-center text-gray-600 py-8">
          <p className="text-lg">No question available</p>
        </div>
      );
    }

    // ✅ FIXED: Get selected answer by question ID
    const selectedAnswer = answers[currentQuestion.id];

    console.log('Rendering question type:', currentQuestion.question_type);
    console.log('Current question ID:', currentQuestion.id);
    console.log('Selected answer for this question:', selectedAnswer);
    console.log('handleAnswerSelect function type:', typeof handleAnswerSelect);

    // ✅ FIXED: Use onAnswerSelect (consistent with question components)
    const questionProps = {
      question: currentQuestion,
      selectedAnswer: selectedAnswer,
      onAnswerSelect: handleAnswerSelect, // ✅ This matches what components expect
    };

    switch (currentQuestion.question_type) {
      case 'multiple_choice':
        return <MultipleChoice {...questionProps} />;
      
      case 'true_false':
        return <TrueFalse {...questionProps} />;
      
      case 'fill_blank':
      case 'fill_in_blank':
        return <FillInTheBlanks {...questionProps} />;
      
      case 'type_answer':
      case 'typing':
        return <TypeAnswer {...questionProps} />;
      
      case 'audio':
        return <AudioQuestion {...questionProps} />;
      
      case 'matching':
        return <Matching {...questionProps} />;
      
      default:
        return (
          <div className="text-center text-gray-600 py-8">
            <p className="text-lg mb-2">Unsupported question type: {currentQuestion.question_type}</p>
            <p className="text-sm">Please contact support for assistance.</p>
          </div>
        );
    }
  };

  // Handle case where quiz has no questions
  if (!quiz || totalQuestions === 0) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center text-gray-600">
          <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold mb-2">No Questions Available</h2>
          <p className="text-lg">This quiz doesn't have any questions yet.</p>
          <p className="text-sm mt-2 text-gray-500">Please contact your instructor or try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Main Quiz Content */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header with Timer */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
            <p className="text-gray-600">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </p>
            {quiz.description && (
              <p className="text-sm text-gray-500 mt-1">{quiz.description}</p>
            )}
          </div>
          
          {/* Timer */}
          {quiz.time_limit_minutes && !isNaN(quiz.time_limit_minutes) && quiz.time_limit_minutes > 0 && (
            <div className="flex-shrink-0">
              <QuizTimer
                timeLimit={Number(quiz.time_limit_minutes)}
                onTimeUp={handleTimeUp}
                isActive={quizActive && !isSubmitting}
              />
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Content */}
        <div className="mb-8 min-h-[400px]">
          {isSubmitting ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Submitting your quiz...</p>
              <p className="text-sm text-gray-500 mt-2">Please wait while we process your answers.</p>
            </div>
          ) : (
            renderQuestion()
          )}
        </div>
      </div>

      {/* Navigation Component */}
      {!isSubmitting && (
        <QuizNavigation
          currentQuestion={currentQuestionIndex}
          totalQuestions={totalQuestions}
          answers={answers}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmitQuiz}
          onQuestionJump={handleQuestionJump}
          questions={quiz.questions} // ✅ Added for better navigation
        />
      )}

      {/* ✅ ENHANCED: Quiz Info Panel with better answer counting */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quiz Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="font-semibold text-blue-800">Total Questions</p>
            <p className="text-2xl font-bold text-blue-600">{totalQuestions}</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="font-semibold text-green-800">Answered</p>
            <p className="text-2xl font-bold text-green-600">
              {Object.keys(answers).filter(key => 
                answers[key] !== undefined && 
                answers[key] !== null && 
                answers[key] !== ''
              ).length}
            </p>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <p className="font-semibold text-orange-800">Remaining</p>
            <p className="text-2xl font-bold text-orange-600">
              {totalQuestions - Object.keys(answers).filter(key => 
                answers[key] !== undefined && 
                answers[key] !== null && 
                answers[key] !== ''
              ).length}
            </p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <p className="font-semibold text-purple-800">Passing Score</p>
            <p className="text-2xl font-bold text-purple-600">{quiz.passing_score || 70}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
