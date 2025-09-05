import React from 'react';
import { ArrowLeft, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './Header';

const ComingSoon = ({ title, description, icon }) => {
  return (
    <div className="min-h-screen bg-duo-gray-light">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <Link
          to="/dashboard"
          className="flex items-center text-duo-blue hover:text-duo-blue font-bold mb-8 transition-colors transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-8xl mb-6 animate-bounce-gentle">{icon}</div>
            <h1 className="text-4xl md:text-5xl font-black text-dark mb-6">{title}</h1>
            <p className="text-xl text-light font-bold leading-relaxed mb-8">
              {description}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-black text-dark mb-4">Get Notified</h3>
            <p className="text-light font-bold mb-6">
              Be the first to know when this feature launches!
            </p>
            <button className="bg-duo-green text-white px-8 py-4 rounded-2xl hover:bg-duo-green-dark transition-colors font-black flex items-center mx-auto space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notify Me</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/courses"
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <h4 className="font-black text-dark mb-2">📚 Courses</h4>
              <p className="text-light font-bold text-sm">Continue learning with our courses</p>
            </Link>
            <Link
              to="/quizzes"
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <h4 className="font-black text-dark mb-2">🧠 Quizzes</h4>
              <p className="text-light font-bold text-sm">Test your knowledge</p>
            </Link>
            <Link
              to="/progress"
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <h4 className="font-black text-dark mb-2">📊 Progress</h4>
              <p className="text-light font-bold text-sm">Track your learning journey</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
