import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

const AudioPlayer = ({ audioFile, audioUrl, transcript }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioFile, audioUrl]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const clickX = e.nativeEvent.offsetX;
    const width = e.currentTarget.offsetWidth;
    const newTime = (clickX / width) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const restart = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    const audio = audioRef.current;
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-gradient-to-r from-stone-100 to-stone-200 rounded-2xl p-8">
      <audio
        ref={audioRef}
        src={audioFile || audioUrl}
        preload="metadata"
      />

      {/* Audio Player Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-stone-800">Audio Lesson</h3>
        {transcript && (
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="bg-stone-600 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors duration-200"
          >
            {showTranscript ? 'Hide' : 'Show'} Transcript
          </button>
        )}
      </div>

      {/* Main Player */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        {/* Progress Bar */}
        <div className="mb-6">
          <div 
            className="bg-stone-200 rounded-full h-3 cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-stone-600 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-6 mb-6">
          <button
            onClick={restart}
            className="bg-stone-100 hover:bg-stone-200 p-3 rounded-full transition-colors duration-200"
          >
            <RotateCcw className="w-6 h-6 text-stone-600" />
          </button>

          <button
            onClick={togglePlayPause}
            className="bg-blue-600 hover:bg-blue-700 p-4 rounded-full transition-colors duration-200 shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="bg-stone-100 hover:bg-stone-200 p-3 rounded-full transition-colors duration-200"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-stone-600" />
            ) : (
              <Volume2 className="w-6 h-6 text-stone-600" />
            )}
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center space-x-4">
          <Volume2 className="w-4 h-4 text-stone-500" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 accent-blue-600"
          />
          <span className="text-sm text-stone-500 w-8">{Math.round(volume * 100)}</span>
        </div>
      </div>

      {/* Transcript */}
      {transcript && showTranscript && (
        <div className="mt-6 bg-white rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-semibold text-stone-800 mb-4">Transcript</h4>
          <div className="prose max-w-none">
            <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
              {transcript}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
