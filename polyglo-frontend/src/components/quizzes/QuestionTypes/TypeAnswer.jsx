import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Volume2 } from 'lucide-react';

const TypeAnswer = ({ question, selectedAnswer, onAnswerChange }) => {
  const [userInput, setUserInput] = useState(selectedAnswer || '');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setUserInput(selectedAnswer || '');
  }, [selectedAnswer]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    onAnswerChange(value);
    setShowFeedback(false);
  };

  const handleSubmitAnswer = () => {
    if (!userInput.trim()) return;

    // Check if answer is correct (case-insensitive comparison)
    const correctAnswer = typeof question.correct_answer === 'string' 
      ? question.correct_answer 
      : question.correct_answer[0]; // If it's an array, take the first one

    const userAnswer = userInput.trim().toLowerCase();
    const correct = correctAnswer.toLowerCase();
    
    const correct_check = userAnswer === correct;
    setIsCorrect(correct_check);
    setShowFeedback(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmitAnswer();
    }
  };

  const playAudio = () => {
    if (question.audio_url) {
      const audio = new Audio(question.audio_url);
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Question Text */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {question.question_text}
        </h3>
        
        {/* Audio Player */}
        {question.audio_url && (
          <div className="mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={playAudio}
                className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg transition-colors"
              >
                <Volume2 className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600 font-medium">Play Audio</span>
              </button>
            </div>
            <audio controls className="w-full mt-2">
              <source src={question.audio_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {/* Image */}
        {question.image_url && (
          <img
            src={question.image_url}
            alt="Question"
            className="max-w-sm mx-auto rounded-lg shadow-md mb-4"
          />
        )}
      </div>

      {/* Input Field */}
      <div className="space-y-4">
        <div>
          <label htmlFor="answer-input" className="block text-sm font-medium text-gray-700 mb-2">
            Type your answer:
          </label>
          <input
            id="answer-input"
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter your answer here..."
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-lg"
            autoComplete="off"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmitAnswer}
          disabled={!userInput.trim()}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Check Answer
        </button>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`p-4 rounded-lg border-2 ${
          isCorrect 
            ? 'border-green-200 bg-green-50' 
            : 'border-red-200 bg-red-50'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600" />
            )}
            <span className={`font-semibold ${
              isCorrect ? 'text-green-800' : 'text-red-800'
            }`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          
          {!isCorrect && (
            <div className="text-red-700">
              <p className="mb-1">
                <strong>Correct answer:</strong> {
                  typeof question.correct_answer === 'string' 
                    ? question.correct_answer 
                    : question.correct_answer[0]
                }
              </p>
            </div>
          )}
          
          {question.explanation && (
            <div className={`mt-3 p-3 rounded ${
              isCorrect ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <p className={`text-sm ${
                isCorrect ? 'text-green-700' : 'text-red-700'
              }`}>
                <strong>Explanation:</strong> {question.explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Hint */}
      {question.hint && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            <strong>💡 Hint:</strong> {question.hint}
          </p>
        </div>
      )}
    </div>
  );
};

export default TypeAnswer;
