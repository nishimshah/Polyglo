// import React from 'react';
// import { CheckCircle, XCircle } from 'lucide-react';

// const TrueFalse = ({ question, selectedAnswer, onAnswerSelect, isRevealed = false }) => {
//   const options = ['True', 'False'];
  
//   return (
//     <div className="space-y-6">
//       <h3 className="text-xl font-bold text-stone-800 mb-6">
//         {question.question_text}
//       </h3>
      
//       <div className="grid grid-cols-2 gap-4">
//         {options.map((option) => {
//           const isSelected = selectedAnswer === option.toLowerCase();
//           const isCorrect = option.toLowerCase() === question.correct_answer;
          
//           let buttonStyle = 'border-stone-200 hover:border-stone-300 hover:bg-stone-50 text-stone-600';
          
//           if (isRevealed) {
//             if (isCorrect) {
//               buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800';
//             } else if (isSelected && !isCorrect) {
//               buttonStyle = 'border-red-500 bg-red-50 text-red-800';
//             } else {
//               buttonStyle = 'border-stone-200 bg-stone-50 text-stone-600';
//             }
//           } else if (isSelected) {
//             buttonStyle = 'border-blue-500 bg-blue-50 text-blue-800';
//           }
          
//           return (
//             <button
//               key={option}
//               onClick={() => !isRevealed && onAnswerSelect(option.toLowerCase())}
//               disabled={isRevealed}
//               className={`p-6 rounded-xl border-2 text-lg font-semibold transition-all duration-200 relative ${buttonStyle}`}
//             >
//               {option}
//               {isRevealed && isCorrect && (
//                 <CheckCircle className="absolute top-2 right-2 w-6 h-6 text-emerald-600" />
//               )}
//               {isRevealed && isSelected && !isCorrect && (
//                 <XCircle className="absolute top-2 right-2 w-6 h-6 text-red-600" />
//               )}
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

// export default TrueFalse;

// src/components/quiz/TrueFalse.jsx
import React from 'react';
import { Check, X } from 'lucide-react';

const TrueFalse = ({ question, selectedAnswer, onAnswerSelect }) => {
  console.log('TrueFalse component props:', { 
    question: question?.id, 
    selectedAnswer, 
    onAnswerSelect: typeof onAnswerSelect 
  });

  const handleAnswer = (answer) => {
    if (typeof onAnswerSelect === 'function') {
      console.log('Calling onAnswerSelect with:', answer);
      onAnswerSelect(answer);
    } else {
      console.error('onAnswerSelect is not a function:', onAnswerSelect);
      alert('Error: Answer handler is missing. Please refresh the quiz.');
    }
  };

  if (!question) {
    return <div>No question data available</div>;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-black text-dark mb-6">{question.question_text}</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* True Button */}
        <button
          onClick={() => handleAnswer('true')}
          className={`p-6 rounded-2xl border-2 transition-all duration-200 font-black text-lg flex items-center justify-center space-x-3 transform hover:scale-105 ${
            selectedAnswer === 'true'
              ? 'bg-duo-green text-white border-duo-green shadow-lg'
              : 'bg-white text-dark border-gray-200 hover:border-duo-green hover:shadow-lg'
          }`}
        >
          <Check className="w-6 h-6" />
          <span>True</span>
        </button>

        {/* False Button */}
        <button
          onClick={() => handleAnswer('false')}
          className={`p-6 rounded-2xl border-2 transition-all duration-200 font-black text-lg flex items-center justify-center space-x-3 transform hover:scale-105 ${
            selectedAnswer === 'false'
              ? 'bg-duo-red text-white border-duo-red shadow-lg'
              : 'bg-white text-dark border-gray-200 hover:border-duo-red hover:shadow-lg'
          }`}
        >
          <X className="w-6 h-6" />
          <span>False</span>
        </button>
      </div>
    </div>
  );
};

export default TrueFalse;
