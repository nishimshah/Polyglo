// import React from 'react';
// import { Volume2, Clock } from 'lucide-react';
// import MultipleChoice from './QuestionTypes/MultipleChoice';
// import TrueFalse from './QuestionTypes/TrueFalse';
// import FillInTheBlank from './QuestionTypes/FillInTheBlank';
// import Matching from './QuestionTypes/Matching';

// const QuizQuestion = ({ 
//   question, 
//   questionNumber, 
//   totalQuestions, 
//   selectedAnswer, 
//   onAnswerSelect, 
//   isRevealed = false,
//   timeSpent = 0 
// }) => {
  
//   const playAudio = () => {
//     if (question.audio_url) {
//       const audio = new Audio(question.audio_url);
//       audio.play();
//     }
//   };

//   const renderQuestionByType = () => {
//     const commonProps = {
//       question,
//       selectedAnswer,
//       onAnswerSelect,
//       isRevealed
//     };

//     switch (question.question_type) {
//       case 'multiple_choice':
//         return <MultipleChoice {...commonProps} />;
//       case 'true_false':
//         return <TrueFalse {...commonProps} />;
//       case 'fill_blank':
//         return <FillInTheBlank {...commonProps} />;
//       case 'matching':
//         return <Matching {...commonProps} />;
//       default:
//         return <div className="text-red-600">Unsupported question type: {question.question_type}</div>;
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-8">
//       {/* Question Header */}
//       <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200">
//         <div className="flex items-center space-x-4">
//           <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
//             Question {questionNumber} of {totalQuestions}
//           </div>
//           <div className="text-stone-600 text-sm">
//             {question.points} point{question.points !== 1 ? 's' : ''}
//           </div>
//         </div>
        
//         <div className="flex items-center space-x-4">
//           {timeSpent > 0 && (
//             <div className="flex items-center text-stone-500 text-sm">
//               <Clock className="w-4 h-4 mr-1" />
//               {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
//             </div>
//           )}
          
//           {question.audio_url && (
//             <button
//               onClick={playAudio}
//               className="bg-stone-100 hover:bg-stone-200 p-2 rounded-lg transition-colors duration-200"
//             >
//               <Volume2 className="w-5 h-5 text-stone-600" />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Question Image */}
//       {question.image_url && (
//         <div className="mb-6">
//           <img
//             src={question.image_url}
//             alt="Question"
//             className="max-w-full h-auto rounded-lg shadow-md mx-auto"
//           />
//         </div>
//       )}

//       {/* Question Content */}
//       <div className="min-h-96">
//         {renderQuestionByType()}
//       </div>

//       {/* Question Meta Info */}
//       <div className="mt-6 pt-4 border-t border-stone-200">
//         <div className="flex items-center justify-between text-sm text-stone-500">
//           <span className="capitalize">
//             {question.question_type.replace('_', ' ')} Question
//           </span>
//           {question.difficulty && (
//             <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//               question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
//               question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
//               'bg-red-100 text-red-800'
//             }`}>
//               {question.difficulty}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizQuestion;

import React from 'react';
import MultipleChoice from './QuestionTypes/MultipleChoice';
import TrueFalse from './QuestionTypes/TrueFalse';
import FillInTheBlank from './QuestionTypes/FillInTheBlank';
import Matching from './QuestionTypes/Matching';
import AudioQuestion from './QuestionTypes/AudioQuestion';

const QuizQuestion = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  isRevealed = false,
}) => {

  const commonProps = { question, selectedAnswer, onAnswerSelect, isRevealed };

  switch (question.question_type) {
    case 'multiple_choice':
      return <MultipleChoice {...commonProps} />;
    case 'true_false':
      return <TrueFalse {...commonProps} />;
    case 'fill_blank':
      return <FillInTheBlank {...commonProps} />;
    case 'matching':
      return <Matching {...commonProps} />;
    case 'audio':
      return <AudioQuestion {...commonProps} />;
    default:
      return <div className="text-red-600">Unsupported question type: {question.question_type}</div>;
  }
};

export default QuizQuestion;
