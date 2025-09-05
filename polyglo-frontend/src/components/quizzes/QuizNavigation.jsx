import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const QuizNavigation = ({ 
  currentQuestion, 
  totalQuestions, 
  answers, 
  onPrevious, 
  onNext, 
  onSubmit, 
  onQuestionJump 
}) => {
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const answeredQuestions = Object.keys(answers).length;
  const canSubmit = answeredQuestions === totalQuestions;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Question Grid */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-stone-800 mb-4">
          Questions ({answeredQuestions}/{totalQuestions} answered)
        </h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {Array.from({ length: totalQuestions }, (_, index) => {
            const questionNum = index + 1;
            const isAnswered = answers[index] !== undefined;
            const isCurrent = index === currentQuestion;
            
            return (
              <button
                key={index}
                onClick={() => onQuestionJump(index)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                  isCurrent
                    ? 'bg-blue-600 text-white'
                    : isAnswered
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {questionNum}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-stone-600 mb-2">
          <span>Progress</span>
          <span>{Math.round((answeredQuestions / totalQuestions) * 100)}%</span>
        </div>
        <div className="bg-stone-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Submit Warning */}
      {!canSubmit && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-amber-600 mr-3" />
            <div>
              <p className="text-amber-800 font-medium">
                {totalQuestions - answeredQuestions} question{totalQuestions - answeredQuestions !== 1 ? 's' : ''} remaining
              </p>
              <p className="text-amber-700 text-sm">
                Answer all questions before submitting the quiz.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrevious}
          disabled={currentQuestion === 0}
          className="flex items-center px-6 py-3 bg-stone-600 text-white rounded-xl hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </button>

        <div className="flex items-center space-x-3">
          {!isLastQuestion ? (
            <button
              onClick={onNext}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              disabled={!canSubmit}
              className="flex items-center px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizNavigation;
