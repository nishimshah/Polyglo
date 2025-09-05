import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { BookOpen, Users, Clock, Star, ArrowRight, Globe, Trophy, Flame, Target, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/common/Header';
import Loading from '../components/common/Loading';

const Languages = () => {
  const { user } = useAuth();
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('authToken');
        const config = token ? {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        } : {};
        
        const response = await api.get('/courses/languages/', config);
        console.log('Languages response:', response.data);
        console.log('Results array:', response.data.results);
        
        if (response.data && response.data.results) {
          setLanguages(response.data.results);
        } else if (Array.isArray(response.data)) {
          setLanguages(response.data);
        } else {
          setLanguages([]);
          setError('Invalid response format');
        }
        
      } catch (error) {
        console.error('Error fetching languages:', error);
        console.error('Error response:', error.response?.data);
        setError('Failed to load languages. Please try again.');
        setLanguages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % languages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + languages.length) % languages.length);
  };

  // Get visible slides (current + 2 on each side)
  const getVisibleSlides = () => {
    const totalSlides = languages.length;
    if (totalSlides === 0) return [];

    const visibleSlides = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + totalSlides) % totalSlides;
      visibleSlides.push({
        ...languages[index],
        position: i,
        isCenter: i === 0
      });
    }
    return visibleSlides;
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-duo-gray-light">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-dark mb-6">
              Choose Your Language
            </h1>
            <p className="text-xl md:text-2xl text-light font-bold max-w-3xl mx-auto leading-relaxed">
              Explore our language carousel and find your perfect learning journey
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm mb-8">
            <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-gray-200">
              <Users className="w-5 h-5 text-duo-blue" />
              <span className="font-black text-dark">500M+ learners</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-gray-200">
              <Trophy className="w-5 h-5 text-duo-yellow" />
              <span className="font-black text-dark">#1 Education app</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-gray-200">
              <Target className="w-5 h-5 text-duo-green" />
              <span className="font-black text-dark">Free forever</span>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-duo-red rounded-2xl p-6 mb-8 max-w-md mx-auto shadow-lg">
            <p className="text-white text-center font-bold text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-white text-duo-red px-6 py-2 rounded-xl font-black text-sm hover:bg-gray-100 transition-colors block mx-auto uppercase tracking-wide"
            >
              Try Again
            </button>
          </div>
        )}

        {/* 3D Carousel */}
        {languages.length > 0 && (
          <div className="relative mb-16">
            <div className="relative h-[500px] overflow-hidden">
              {/* Carousel Container */}
              <div 
                ref={carouselRef}
                className="relative w-full h-full flex items-center justify-center perspective-1000"
              >
                {getVisibleSlides().map((language, index) => {
                  const { position, isCenter } = language;
                  
                  return (
                    <Link
                      key={`${language.id}-${position}`}
                      to={`/languages/${language.code}/levels`}
                      className={`absolute transition-all duration-700 ease-out cursor-pointer group ${
                        isCenter ? 'z-30' : 'z-10'
                      }`}
                      style={{
                        transform: `
                          translateX(${position * 280}px) 
                          translateZ(${isCenter ? 0 : -200}px) 
                          rotateY(${position * -15}deg)
                          scale(${isCenter ? 1 : 0.8})
                        `,
                        opacity: Math.abs(position) > 2 ? 0 : isCenter ? 1 : 0.6
                      }}
                    >
                      <div className={`bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-transparent transition-all duration-500 w-80 h-96 ${
                        isCenter 
                          ? 'hover:border-duo-green hover:shadow-2xl transform hover:scale-105' 
                          : 'hover:border-duo-blue'
                      }`}>
                        {/* Simple Flag Section Only */}
                        <div className="relative h-47 w-full overflow-hidden rounded-t-3xl">
                          {language.flag_image ? (
                            <img
                              src={language.flag_image}
                              alt={`${language.name} flag`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextElementSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div className="w-full h-full bg-duo-gray flex items-center justify-center text-white text-3xl font-black" style={{display: language.flag_image ? 'none' : 'flex'}}>
                            {language.name?.charAt(0) || '?'}
                          </div>
                        </div>


                        {/* Content */}
                        <div className="p-6 h-64 flex flex-col justify-between">
                          <div>
                            <h3 className="text-2xl font-black text-dark mb-3 group-hover:text-duo-green transition-colors">
                              {language.name}
                            </h3>
                            
                            <p className="text-light font-bold text-sm mb-6 leading-relaxed line-clamp-2">
                              {language.description || `Master ${language.name} through interactive lessons and real conversations.`}
                            </p>
                            
                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2 mb-6">
                              <div className="text-center">
                                <div className="w-8 h-8 bg-duo-blue rounded-full flex items-center justify-center mx-auto mb-1">
                                  <Users className="w-4 h-4 text-white" />
                                </div>
                                <div className="text-xs font-black text-dark">{language.learners_count || 0}</div>
                                <div className="text-xs text-light font-bold">Learners</div>
                              </div>
                              <div className="text-center">
                                <div className="w-8 h-8 bg-duo-green rounded-full flex items-center justify-center mx-auto mb-1">
                                  <Clock className="w-4 h-4 text-white" />
                                </div>
                                <div className="text-xs font-black text-dark">{language.estimated_hours || 45}h</div>
                                <div className="text-xs text-light font-bold">Duration</div>
                              </div>
                              <div className="text-center">
                                <div className="w-8 h-8 bg-duo-yellow rounded-full flex items-center justify-center mx-auto mb-1">
                                  <Star className="w-4 h-4 text-white" />
                                </div>
                                <div className="text-xs font-black text-dark">{(language.average_rating || 4.5).toFixed(1)}</div>
                                <div className="text-xs text-light font-bold">Rating</div>
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                            <div className="text-duo-green font-black text-sm uppercase tracking-wide group-hover:text-duo-green-dark transition-colors">
                              Start Learning
                            </div>
                            <ArrowRight className="w-5 h-5 text-duo-green group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white hover:bg-duo-green text-duo-green hover:text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-40 group"
              >
                <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white text-duo-green hover:text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-40 group"
              >
                <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center space-x-3 mt-8">
              {languages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-duo-green w-8' 
                      : 'bg-gray-300 hover:bg-duo-green hover:scale-125'
                  }`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-6 max-w-md mx-auto">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-duo-green h-2 rounded-full transition-all duration-700"
                  style={{ width: `${((currentIndex + 1) / languages.length) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-light font-bold mt-2">
                <span>Language {currentIndex + 1}</span>
                <span>{languages.length} Total</span>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {(!Array.isArray(languages) || languages.length === 0) && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-duo-gray rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
              <Globe className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-black text-dark mb-4">No languages available</h3>
            <p className="text-light font-bold text-xl mb-8 max-w-md mx-auto">
              Languages will appear here once they are added to the system.
            </p>
          </div>
        )}

        
      </div>

      {/* Custom CSS for 3D effect */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Languages;
