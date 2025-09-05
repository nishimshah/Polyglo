import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Globe, ArrowRight, Star, Users, BookOpen, Clock } from 'lucide-react';
import api from '../services/api';
import Header from '../components/common/Header';
import Loading from '../components/common/Loading';

const LanguageSelection = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const { data: languages, isLoading } = useQuery(
    'languages',
    async () => {
      const response = await api.get('/courses/languages/');
      return response.data;
    }
  );

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    // Navigate to difficulty selection for the selected language
    navigate(`/languages/${language.code}/levels`);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Language
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your language learning journey today. Select a language to begin with our structured learning path.
          </p>
        </div>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {languages?.map((language) => (
            <div
              key={language.id}
              onClick={() => handleLanguageSelect(language)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
            >
              {/* Language Flag/Image */}
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative flex items-center justify-center">
                {language.flag_image ? (
                  <img
                    src={language.flag_image}
                    alt={`${language.name} flag`}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <Globe className="w-8 h-8 text-blue-500" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white">{language.name}</h3>
                </div>
              </div>

              {/* Language Info */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {language.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {language.total_levels || 3}
                    </div>
                    <div className="text-xs text-gray-500">Levels</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      ~{language.estimated_hours || 45}h
                    </div>
                    <div className="text-xs text-gray-500">Duration</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {language.learners_count || '10k+'}
                    </div>
                    <div className="text-xs text-gray-500">Learners</div>
                  </div>
                </div>

                {/* Difficulty Badge */}
                <div className="flex items-center justify-between">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    language.difficulty === 'beginner' 
                      ? 'bg-green-100 text-green-800'
                      : language.difficulty === 'intermediate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {language.difficulty.charAt(0).toUpperCase() + language.difficulty.slice(1)} Friendly
                  </div>
                  
                  <div className="flex items-center text-blue-600">
                    <span className="text-sm font-medium mr-2">Start Learning</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Can't decide? Start with our most popular language for beginners
          </p>
          <button
            onClick={() => navigate('/languages/es/levels')}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-semibold"
          >
            Start with Spanish
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
