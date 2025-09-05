import React from 'react';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-duo-gray-light flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="text-8xl mb-6">🤔</div>
          <h1 className="text-6xl font-black text-dark mb-4">404</h1>
          <h2 className="text-2xl font-black text-dark mb-4">Page Not Found</h2>
          <p className="text-xl text-light font-bold mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="w-full bg-duo-green text-white py-4 px-6 rounded-2xl hover:bg-duo-green-dark transition-colors font-black flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          
          <Link
            to="/dashboard"
            className="w-full bg-duo-blue text-white py-4 px-6 rounded-2xl hover:bg-duo-blue transition-colors font-black flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
          
          <Link
            to="/languages"
            className="w-full bg-duo-purple text-white py-4 px-6 rounded-2xl hover:bg-duo-purple transition-colors font-black flex items-center justify-center space-x-2"
          >
            <Search className="w-5 h-5" />
            <span>Browse Languages</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
