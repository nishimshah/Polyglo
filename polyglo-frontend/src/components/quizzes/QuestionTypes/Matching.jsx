import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const Matching = ({ question, selectedAnswer, onAnswerSelect, isRevealed = false }) => {
  const [matches, setMatches] = useState(selectedAnswer || {});
  const [selectedLeft, setSelectedLeft] = useState(null);
  
  const handleLeftSelect = (leftItem) => {
    if (isRevealed) return;
    setSelectedLeft(leftItem);
  };
  
  const handleRightSelect = (rightItem) => {
    if (isRevealed || !selectedLeft) return;
    
    const newMatches = { ...matches };
    
    // Remove any existing match for this right item
    Object.keys(newMatches).forEach(key => {
      if (newMatches[key] === rightItem) {
        delete newMatches[key];
      }
    });
    
    // Add new match
    newMatches[selectedLeft] = rightItem;
    setMatches(newMatches);
    onAnswerSelect(newMatches);
    setSelectedLeft(null);
  };
  
  const isCorrectMatch = (left, right) => {
    return question.correct_answer[left] === right;
  };
  
  const getMatchStyle = (item, type) => {
    const isSelected = type === 'left' ? selectedLeft === item : false;
    const isMatched = type === 'left' ? matches[item] : Object.values(matches).includes(item);
    
    if (isRevealed) {
      if (type === 'left') {
        const userMatch = matches[item];
        const correctMatch = question.correct_answer[item];
        if (userMatch === correctMatch) {
          return 'border-emerald-500 bg-emerald-50';
        } else if (userMatch) {
          return 'border-red-500 bg-red-50';
        }
      } else {
        const leftItem = Object.keys(matches).find(key => matches[key] === item);
        if (leftItem && isCorrectMatch(leftItem, item)) {
          return 'border-emerald-500 bg-emerald-50';
        } else if (leftItem) {
          return 'border-red-500 bg-red-50';
        }
      }
      return 'border-stone-200 bg-stone-50';
    }
    
    if (isSelected) return 'border-blue-500 bg-blue-50';
    if (isMatched) return 'border-stone-400 bg-stone-100';
    return 'border-stone-200 hover:border-stone-300 hover:bg-stone-50';
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-stone-800 mb-6">
        {question.question_text}
      </h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-3">
          <h4 className="font-semibold text-stone-700 mb-4">Match these items:</h4>
          {question.options.left.map((item, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => handleLeftSelect(item)}
                disabled={isRevealed}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${getMatchStyle(item, 'left')}`}
              >
                {item}
                {isRevealed && matches[item] && isCorrectMatch(item, matches[item]) && (
                  <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-emerald-600" />
                )}
                {isRevealed && matches[item] && !isCorrectMatch(item, matches[item]) && (
                  <XCircle className="absolute top-2 right-2 w-5 h-5 text-red-600" />
                )}
              </button>
              
              {matches[item] && (
                <div className="flex items-center mt-2 text-sm text-stone-600">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>{matches[item]}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Right Column */}
        <div className="space-y-3">
          <h4 className="font-semibold text-stone-700 mb-4">With these:</h4>
          {question.options.right.map((item, index) => (
            <button
              key={index}
              onClick={() => handleRightSelect(item)}
              disabled={isRevealed || !selectedLeft}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${getMatchStyle(item, 'right')}`}
            >
              {item}
              {isRevealed && Object.values(matches).includes(item) && (
                <div className="absolute top-2 right-2">
                  {(() => {
                    const leftItem = Object.keys(matches).find(key => matches[key] === item);
                    return isCorrectMatch(leftItem, item) ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    );
                  })()}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {selectedLeft && !isRevealed && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-blue-800">
            <span className="font-semibold">Selected:</span> {selectedLeft}
            <br />
            <span className="text-sm">Now click an item on the right to match it.</span>
          </p>
        </div>
      )}
      
      {isRevealed && question.explanation && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Explanation</h4>
          <p className="text-blue-700">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default Matching;
