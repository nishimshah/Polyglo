import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const FillInTheBlank = ({ question, selectedAnswer, onAnswerSelect, isRevealed = false }) => {
  const [inputValue, setInputValue] = useState(selectedAnswer || '');
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onAnswerSelect(value);
  };
  
  const isCorrect = isRevealed && 
    inputValue.toLowerCase().trim() === question.correct_answer.toLowerCase().trim();
  
  const parts = question.question_text.split('___');
  
  return (
    <div className="space-y-6">
      <div className="text-xl text-stone-700 leading-relaxed">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                disabled={isRevealed}
                className={`inline-block mx-2 px-4 py-2 border-2 rounded-lg outline-none min-w-40 font-semibold ${
                  isRevealed
                    ? isCorrect
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                      : 'border-red-500 bg-red-50 text-red-800'
                    : 'border-stone-300 focus:border-blue-500 bg-white'
                }`}
                placeholder="Type your answer..."
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {isRevealed && (
        <div className="space-y-4">
          <div className={`flex items-center space-x-2 ${
            isCorrect ? 'text-emerald-600' : 'text-red-600'
          }`}>
            {isCorrect ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span className="font-semibold">
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          
          {!isCorrect && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <span className="font-medium text-emerald-800">Correct answer: </span>
              <span className="text-emerald-700 font-semibold">{question.correct_answer}</span>
            </div>
          )}
          
          {question.explanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Explanation</h4>
              <p className="text-blue-700">{question.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FillInTheBlank;
