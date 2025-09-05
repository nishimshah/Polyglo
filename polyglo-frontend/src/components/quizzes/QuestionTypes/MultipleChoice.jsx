// import React, { useState } from 'react';
// import { CheckCircle, XCircle } from 'lucide-react';

// const MultipleChoice = ({ question, selectedAnswer, onAnswerChange, isRevealed = false }) => {
//   return (
//     <div className="space-y-4">
//       <h3 className="text-xl font-bold text-stone-800 mb-6">
//         {question.question_text}
//       </h3>
      
//       <div className="space-y-3">
//         {question.options.map((option, index) => {
//           const isSelected = selectedAnswer === option;
//           const isCorrect = option === question.correct_answer;
          
//           let buttonStyle = 'border-stone-200 hover:border-stone-300 hover:bg-stone-50';
          
//           if (isRevealed) {
//             if (isCorrect) {
//               buttonStyle = 'border-emerald-500 bg-emerald-50';
//             } else if (isSelected && !isCorrect) {
//               buttonStyle = 'border-red-500 bg-red-50';
//             } else {
//               buttonStyle = 'border-stone-200 bg-stone-50';
//             }
//           } else if (isSelected) {
//             buttonStyle = 'border-blue-500 bg-blue-50';
//           }
          
//           return (
//             <button
//               key={index}
//               onClick={() => !isRevealed && onAnswerChange(option)}
//               disabled={isRevealed}
//               className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${buttonStyle}`}
//             >
//               <div className="flex items-center justify-between">
//                 <span className="font-medium text-stone-800">{option}</span>
//                 {isRevealed && isCorrect && (
//                   <CheckCircle className="w-5 h-5 text-emerald-600" />
//                 )}
//                 {isRevealed && isSelected && !isCorrect && (
//                   <XCircle className="w-5 h-5 text-red-600" />
//                 )}
//               </div>
//             </button>
//           );
//         })}
//       </div>
      
//       {isRevealed && question.explanation && (
//         <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
//           <h4 className="font-semibold text-blue-800 mb-2">Explanation</h4>
//           <p className="text-blue-700">{question.explanation}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MultipleChoice;

// src/components/quiz/QuestionTypes/MultipleChoice.jsx
import React from 'react';

const MultipleChoice = ({ question, selectedAnswer, onAnswerSelect }) => {
  console.log('MultipleChoice received props:', {
    question: question?.id,
    selectedAnswer,
    onAnswerSelect: typeof onAnswerSelect
  });

  const handleSelect = (answerId) => {
    if (typeof onAnswerSelect === 'function') {
      console.log('MultipleChoice calling onAnswerSelect with:', answerId);
      onAnswerSelect(answerId);
    } else {
      console.error('MultipleChoice: onAnswerSelect is not a function:', onAnswerSelect);
      alert('Answer handler is missing. Please check the QuizCard component.');
    }
  };

  if (!question || !question.options) {
    return <div>No question or options available</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-black text-dark mb-6">{question.question_text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={option.id || index}
            onClick={() => handleSelect(option.id || option.value || option)}
            className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 font-bold transform hover:scale-105 ${
              selectedAnswer === (option.id || option.value || option)
                ? 'bg-duo-blue text-white border-duo-blue shadow-lg'
                : 'bg-white text-dark border-gray-200 hover:border-duo-blue hover:shadow-lg'
            }`}
          >
            {option.text || option.label || option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;
