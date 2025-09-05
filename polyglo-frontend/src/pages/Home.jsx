import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Play, 
  Star, 
  ArrowRight, 
  Globe, 
  Users, 
  Award,
  CheckCircle,
  Heart,
  Zap,
  Trophy,
  Target,
  Languages
} from 'lucide-react';
import Header from '../components/common/Header';
import logoImage from '../assets/images/polyglo.png';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState('es');

  const popularLanguages = [
    { code: 'es', name: 'Spanish', flag: '🇪🇸', learners: '25M+' },
    { code: 'fr', name: 'French', flag: '🇫🇷', learners: '18M+' },
    { code: 'de', name: 'German', flag: '🇩🇪', learners: '12M+' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', learners: '15M+' }
  ];

  const allLanguages = [
    ...popularLanguages,
    { code: 'it', name: 'Italian', flag: '🇮🇹', learners: '8M+' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', learners: '6M+' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', learners: '10M+' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', learners: '7M+' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - ID: hero */}
      <section id="hero" className="pt-8 pb-20 px-6  scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
            
            {/* Left Content - Streamlined */}
            <div className="space-y-8 text-center lg:text-left">

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-dark leading-tight">
                The free, fun, and
                <br />
                <span className="text-duo-green">effective</span> way
                <br />
                to learn a language!
              </h1>
              
              <p className="text-xl md:text-2xl text-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Learn 40+ languages with quick, bite-sized lessons. 
                Backed by science, powered by AI.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm">
                <div className="flex items-center space-x-2 bg-duo-gray-light px-4 py-2 rounded-full">
                  <Users className="w-4 h-4 text-duo-blue" />
                  <span className="font-semibold text-dark">500M+ learners</span>
                </div>
                <div className="flex items-center space-x-2 bg-duo-gray-light px-4 py-2 rounded-full">
                  <Award className="w-4 h-4 text-duo-yellow" />
                  <span className="font-semibold text-dark">#1 Education app</span>
                </div>
                <div className="flex items-center space-x-2 bg-duo-gray-light px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-duo-green" />
                  <span className="font-semibold text-dark">Free forever</span>
                </div>
              </div>
            </div>
            
            {/* Right Visual - Enhanced and Better Balanced */}
            <div className="flex justify-center lg:justify-center">
              <div className="relative">
                {/* Main Mascot */}
                <div className="w-96 h-96 bg-gradient-to-br from-duo-green to-duo-green-dark rounded-full flex items-center justify-center shadow-2xl animate-float">
                  <img 
                    src={logoImage} 
                    alt="Polyglo Mascot" 
                    className="w-56 h-56 object-contain animate-bounce-gentle"
                  />
                </div>
                
                {/* Enhanced Floating Achievement Icons */}
                <div className="absolute -top-8 -right-8 bg-duo-yellow p-5 rounded-full shadow-xl animate-bounce-gentle">
                  <Star className="w-8 h-8 text-white" />
                </div>
                
                <div className="absolute -bottom-8 -left-8 bg-duo-blue p-5 rounded-full shadow-xl animate-bounce-gentle" style={{animationDelay: '0.5s'}}>
                  <Heart className="w-8 h-8 text-white" />
                </div>
                
                <div className="absolute top-12 -left-16 bg-duo-red p-5 rounded-full shadow-xl animate-bounce-gentle" style={{animationDelay: '1s'}}>
                  <Zap className="w-8 h-8 text-white" />
                </div>
                
                <div className="absolute bottom-12 -right-16 bg-duo-purple p-5 rounded-full shadow-xl animate-bounce-gentle" style={{animationDelay: '1.5s'}}>
                  <Trophy className="w-8 h-8 text-white" />
                </div>

                {/* Additional floating stats */}
                <div className="absolute top-1/4 left-12 bg-white p-4 rounded-2xl shadow-lg animate-bounce-gentle" style={{animationDelay: '2s'}}>
                  <div className="text-center">
                    <div className="text-2xl font-black text-duo-green">127</div>
                    <div className="text-xs font-semibold text-gray-600">Day Streak</div>
                  </div>
                </div>

                <div className="absolute bottom-1/4 right-12 bg-white p-4 rounded-2xl shadow-lg animate-bounce-gentle" style={{animationDelay: '2.5s'}}>
                  <div className="text-center">
                    <div className="text-2xl font-black text-duo-blue">2,847</div>
                    <div className="text-xs font-semibold text-gray-600">XP Earned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Language Selection Section - ID: languages */}
      <section id="languages" className="py-16 px-6 bg-duo-gray-light scroll-mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-dark mb-4">
              Choose Your Language
            </h2>
            <p className="text-xl text-light">
              Select from our most popular languages and start learning today
            </p>
          </div>

          {/* Language Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            {popularLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => setSelectedLanguage(language.code)}
                className={`p-6 rounded-2xl transition-all duration-200 transform hover:scale-105 ${
                  selectedLanguage === language.code
                    ? 'bg-duo-green text-white shadow-xl scale-105'
                    : 'bg-white text-dark hover:bg-duo-green hover:text-white shadow-lg'
                }`}
              >
                <div className="text-5xl mb-3">{language.flag}</div>
                <h3 className="text-lg font-black mb-1">{language.name}</h3>
                <p className={`text-sm font-semibold ${
                  selectedLanguage === language.code ? 'text-white opacity-90' : 'text-duo-green'
                }`}>
                  {language.learners} learning
                </p>
              </button>
            ))}
          </div>

          <Link 
            to="/languages"
            className="inline-flex items-center text-duo-blue font-bold text-lg mb-8"
          >
            <Languages className="mr-2 w-5 h-5" />
            View all 40+ languages
          </Link>
        </div>
      </section>

      {/* Main CTA Section - Centered */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6">
              Ready to start learning?
            </h2>
            <p className="text-xl text-light leading-relaxed max-w-2xl mx-auto mb-8">
              Join over 500 million learners who are mastering new languages with Polyglo. 
              It's 100% free and scientifically proven to work.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-6">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-block bg-duo-green text-white px-16 py-6 rounded-2xl text-2xl font-black hover:bg-duo-green-dark transition-all duration-200 transform hover:scale-105 shadow-xl"
              >
                CONTINUE LEARNING
              </Link>
            ) : (
              <div className="space-y-4">
                <Link
                  to="/signup"
                  className="block bg-duo-green text-white px-16 py-6 rounded-2xl text-2xl font-black hover:bg-duo-green-dark transition-all duration-200 transform hover:scale-105 shadow-xl max-w-md mx-auto"
                >
                  GET STARTED
                </Link>
                <Link
                  to="/login"
                  className="block text-duo-blue font-bold text-xl hover:underline"
                >
                  I ALREADY HAVE AN ACCOUNT
                </Link>
              </div>
            )}
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-light">
            <span className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-duo-green" />
              Free forever
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-duo-green" />
              No ads or hidden fees
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-duo-green" />
              Learn at your own pace
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-duo-green" />
              Scientifically proven
            </span>
          </div>
        </div>
      </section>

      {/* Features Section - ID: features */}
      <section id="features" className="py-20 px-6 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6">
              Why Polyglo works
            </h2>
            <p className="text-xl text-light max-w-3xl mx-auto leading-relaxed">
              Our teaching methodology is backed by science and designed 
              to help you build real conversational skills.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                emoji: "🧠",
                title: "Science-based",
                description: "Lessons are based on learning science to help you acquire language naturally and efficiently.",
                bgColor: "bg-duo-green"
              },
              {
                emoji: "🎯",
                title: "Personalized",
                description: "AI adapts to your learning style and pace, providing lessons tailored just for you.",
                bgColor: "bg-duo-blue"
              },
              {
                emoji: "🎮",
                title: "Game-like",
                description: "Stay motivated with streaks, XP, achievements, and friendly competition.",
                bgColor: "bg-duo-purple"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                <div className={`w-20 h-20 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <span className="text-4xl">{feature.emoji}</span>
                </div>
                <h3 className="text-2xl font-black text-dark mb-4">{feature.title}</h3>
                <p className="text-light leading-relaxed text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section (Stats) - ID: about */}
      <section id="about" className="py-16 bg-duo-gray-light scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6">
              About Polyglo
            </h2>
            <p className="text-xl text-light max-w-3xl mx-auto">
              Join millions of learners worldwide who trust Polyglo for their language learning journey
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500M+", label: "Learners worldwide", icon: Users, color: "text-duo-blue" },
              { number: "40+", label: "Languages available", icon: Globe, color: "text-duo-green" },
              { number: "#1", label: "Education app", icon: Award, color: "text-duo-yellow" },
              { number: "15 min", label: "Daily lessons", icon: Target, color: "text-duo-red" }
            ].map((stat, index) => (
              <div key={index} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                <div className="text-3xl font-black text-dark mb-1">{stat.number}</div>
                <div className="text-light font-bold text-sm uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Languages Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6">
              All available languages
            </h2>
            <p className="text-xl text-light">
              Explore all languages available on our platform
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {allLanguages.map((language, index) => (
              <Link
                key={language.code}
                to={`/languages/${language.code}`}
                className="bg-blue-200 p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-200 transform hover:scale-105 animate-fade-in border-2 border-transparent hover:border-duo-green"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-5xl mb-3">{language.flag}</div>
                <h3 className="text-lg font-black text-dark mb-2">{language.name}</h3>
                <p className="text-dark font-bold text-sm">{language.learners} learning</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
