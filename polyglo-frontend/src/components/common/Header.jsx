import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Globe, User, LogOut, Menu, X, ChevronDown, BarChart3, BookOpen, Trophy, Home } from 'lucide-react';
import logoImage from '../../assets/images/polyglo.png';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSmoothScroll = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const landingNavigation = [
    { id: 'hero', label: 'Home' },
    { id: 'languages', label: 'Languages' },
    { id: 'features', label: 'Features' },
    { id: 'about', label: 'About' }
  ];

  // Navigation items for authenticated users (app sections)
  const appNavigation = [
    { to: "/dashboard", label: "Dashboard", icon: Home },
    { to: "/languages", label: "Learning", icon: BookOpen },
    { to: "/quizzes", label: "Quizzes", icon: Trophy },
    { to: "/progress", label: "Progress", icon: BarChart3 }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src={logoImage} 
                alt="Polyglo Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <span className="text-2xl font-black text-duo-green">Polyglo</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              // Authenticated navigation (app sections)
              appNavigation.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center space-x-1 text-light hover:text-dark font-bold transition-colors duration-200 text-sm uppercase tracking-wide"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))
            ) : (
              // Non-authenticated navigation (landing page sections)
              landingNavigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSmoothScroll(item.id)}
                  className="text-light hover:text-dark font-bold transition-colors duration-200 text-sm uppercase tracking-wide"
                >
                  {item.label}
                </button>
              ))
            )}
          </nav>

          {/* User Menu */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-4 relative profile-dropdown">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 bg-duo-gray-light px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-duo-blue rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="text-dark font-bold">{user?.username}</span>
                <ChevronDown className="w-4 h-4 text-light" />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                  <Link
                    to="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-dark hover:bg-gray-50 transition-colors duration-200"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full text-left px-4 py-2 text-duo-red hover:bg-red-50 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-duo-blue font-bold hover:underline text-sm uppercase tracking-wide"
              >
                LOGIN
              </Link>
              <Link
                to="/signup"
                className="bg-duo-blue text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity duration-200 text-sm uppercase tracking-wide"
              >
                GET STARTED
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 
              <X className="w-6 h-6 text-dark" /> : 
              <Menu className="w-6 h-6 text-dark" />
            }
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="flex flex-col space-y-3 px-4">
              {isAuthenticated ? (
                // Authenticated mobile navigation
                <>
                  {appNavigation.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex items-center space-x-2 text-light hover:text-dark font-bold transition-colors duration-200 text-sm uppercase tracking-wide py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 text-dark hover:text-duo-blue font-bold py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-8 h-8 bg-duo-blue rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <span>{user?.username} - View Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 bg-duo-red text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity duration-200 text-sm uppercase tracking-wide w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>LOGOUT</span>
                    </button>
                  </div>
                </>
              ) : (
                // Non-authenticated mobile navigation
                <>
                  {landingNavigation.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSmoothScroll(item.id)}
                      className="text-left text-light hover:text-dark font-bold transition-colors duration-200 text-sm uppercase tracking-wide py-2 hover:underline w-full"
                    >
                      {item.label}
                    </button>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <Link
                      to="/login"
                      className="block text-duo-blue font-bold hover:underline text-sm uppercase tracking-wide py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      LOGIN
                    </Link>
                    <Link
                      to="/register"
                      className="block bg-duo-blue text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity duration-200 text-sm uppercase tracking-wide text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      GET STARTED
                    </Link>
                  </div>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
