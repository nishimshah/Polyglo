import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Play, Pause, CheckCircle, XCircle } from 'lucide-react';

const AudioQuestion = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  isRevealed = false,
}) => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [inputValue, setInputValue] = useState(selectedAnswer || '');

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.onended = () => setIsPlaying(false);
  }, []);

  const handlePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onAnswerSelect && onAnswerSelect(e.target.value);
  };

  // Score logic (case-insensitive and trims input)
  const isCorrect =
    isRevealed &&
    inputValue.trim().toLowerCase() === question.correct_answer.trim().toLowerCase();

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-stone-800 mb-4">
        {question.question_text || 'Listen and type what you hear:'}
      </h3>
      <audio ref={audioRef} src={question.audio_url} preload="auto" />
      <button
        onClick={handlePlayAudio}
        className="bg-blue-100 hover:bg-blue-200 p-4 rounded-full transition-colors duration-200 mb-2"
      >
        {isPlaying ? (
          <Pause className="w-7 h-7 text-blue-600" />
        ) : (
          <Volume2 className="w-7 h-7 text-blue-600" />
        )}
      </button>
      <div>
        <input
          type="text"
          placeholder="Type your answer"
          disabled={isRevealed}
          value={inputValue}
          onChange={handleInputChange}
          className={`w-full px-6 py-3 border-2 rounded-xl font-semibold text-lg focus:outline-none ${
            isRevealed
              ? isCorrect
                ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                : 'border-red-500 bg-red-50 text-red-800'
              : 'border-stone-300 focus:border-blue-500 bg-white text-stone-800'
          }`}
        />
      </div>
      {isRevealed && (
        <>
          <div
            className={`flex items-center gap-2 mt-4 font-semibold ${
              isCorrect ? 'text-emerald-600' : 'text-red-600'
            }`}
          >
            {isCorrect ? <CheckCircle /> : <XCircle />}
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </div>
          {!isCorrect && (
            <div className="mt-2 text-stone-700">
              <span className="font-medium">Correct Answer: </span>
              <span className="text-emerald-700">{question.correct_answer}</span>
            </div>
          )}
          {question.explanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
              <h4 className="font-semibold text-blue-800 mb-2">Explanation</h4>
              <p className="text-blue-700">{question.explanation}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AudioQuestion;
