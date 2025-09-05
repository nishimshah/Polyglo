
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useCourses } from '../hooks/useCourses';
// import { Search, Filter, Star, Clock, Users, BookOpen } from 'lucide-react';
// import Header from '../components/common/Header';
// import Loading from '../components/common/Loading';

// const Courses = () => {
//   const { user } = useAuth();
//   const { courses, loading, error, enrollInCourse, fetchCourses } = useCourses();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedDifficulty, setSelectedDifficulty] = useState('');
//   const [enrollingCourses, setEnrollingCourses] = useState(new Set());

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchCourses({ search: searchTerm, difficulty: selectedDifficulty });
//   };

//   const handleEnroll = async (courseId) => {
//     if (enrollingCourses.has(courseId)) return;
    
//     setEnrollingCourses(prev => new Set([...prev, courseId]));
//     try {
//       await enrollInCourse(courseId);
//       // Refresh courses to update enrollment status
//       fetchCourses({ search: searchTerm, difficulty: selectedDifficulty });
//     } catch (error) {
//       // Error is handled by the hook
//     } finally {
//       setEnrollingCourses(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(courseId);
//         return newSet;
//       });
//     }
//   };

//   const difficultyColors = {
//     beginner: 'bg-green-100 text-green-800',
//     intermediate: 'bg-yellow-100 text-yellow-800',
//     advanced: 'bg-red-100 text-red-800',
//   };

//   if (loading && courses.length === 0) return <Loading />;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
      
//       <div className="container mx-auto px-6 py-8">
//         {/* Header Section */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">Language Courses</h1>
//           <p className="text-gray-600">Choose from our wide selection of language courses</p>
//         </div>

//         {/* Search and Filter Section */}
//         <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//           <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search courses..."
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
            
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <select
//                 value={selectedDifficulty}
//                 onChange={(e) => setSelectedDifficulty(e.target.value)}
//                 className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
//               >
//                 <option value="">All Levels</option>
//                 <option value="beginner">Beginner</option>
//                 <option value="intermediate">Intermediate</option>
//                 <option value="advanced">Advanced</option>
//               </select>
//             </div>
            
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
//             >
//               {loading ? 'Searching...' : 'Search'}
//             </button>
//           </form>
//         </div>

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
//             <p className="text-red-800">{error}</p>
//             <button 
//               onClick={() => fetchCourses()}
//               className="mt-2 text-red-600 hover:text-red-700 font-medium"
//             >
//               Try again
//             </button>
//           </div>
//         )}

//         {/* Courses Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {Array.isArray(courses) && courses.map((course) => {
//             // Safe access to nested properties with fallbacks
//             const courseData = course || {};
//             const language = courseData.language || {};
//             const averageRating = Number(courseData.average_rating) || 0;
//             const totalLessons = Number(courseData.total_lessons) || 0;
//             const totalRatings = Number(courseData.total_ratings) || 0;
//             const difficulty = courseData.difficulty || 'beginner';
            
//             return (
//               <div key={courseData.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
//                 <div className="relative">
//                   <img
//                     src={courseData.cover_image || `https://via.placeholder.com/400x200?text=${encodeURIComponent(courseData.title || 'Course')}`}
//                     alt={courseData.title || 'Course'}
//                     className="w-full h-48 object-cover"
//                     onError={(e) => {
//                       e.target.src = `https://via.placeholder.com/400x200?text=${encodeURIComponent(courseData.title || 'Course')}`;
//                     }}
//                   />
//                   {courseData.is_premium && (
//                     <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
//                       Premium
//                     </div>
//                   )}
//                   <div className="absolute bottom-4 left-4">
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[difficulty] || difficultyColors.beginner}`}>
//                       {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-2">
//                     <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
//                       {courseData.title || 'Course Title'}
//                     </h3>
//                     <div className="flex items-center text-yellow-500">
//                       <Star className="w-4 h-4 fill-current" />
//                       <span className="ml-1 text-sm text-gray-600">
//                         {/* Fixed line 138 - Safe toFixed() usage */}
//                         {averageRating.toFixed(1)}
//                       </span>
//                     </div>
//                   </div>
                  
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                     {courseData.description || 'No description available'}
//                   </p>
                  
//                   <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//                     <div className="flex items-center">
//                       <BookOpen className="w-4 h-4 mr-1" />
//                       {totalLessons} lessons
//                     </div>
//                     <div className="flex items-center">
//                       <Clock className="w-4 h-4 mr-1" />
//                       ~{Math.round(totalLessons * 15)} min
//                     </div>
//                     <div className="flex items-center">
//                       <Users className="w-4 h-4 mr-1" />
//                       {totalRatings}
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <img
//                         src={language.flag_image || 'https://via.placeholder.com/24x16?text=🏳️'}
//                         alt={language.name || 'Language'}
//                         className="w-6 h-4 rounded object-cover"
//                         onError={(e) => {
//                           e.target.src = 'https://via.placeholder.com/24x16?text=🏳️';
//                         }}
//                       />
//                       <span className="ml-2 text-sm font-medium text-gray-700">
//                         {language.name || 'Language'}
//                       </span>
//                     </div>
                    
//                     {courseData.is_enrolled ? (
//                       <Link
//                         to={`/courses/${courseData.id}/lessons`}
//                         className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
//                       >
//                         Continue
//                       </Link>
//                     ) : (
//                       <button
//                         onClick={() => handleEnroll(courseData.id)}
//                         disabled={enrollingCourses.has(courseData.id)}
//                         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         {enrollingCourses.has(courseData.id) ? 'Enrolling...' : 'Enroll'}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Empty State */}
//         {(!Array.isArray(courses) || courses.length === 0) && !loading && (
//           <div className="text-center py-12">
//             <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
//             <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
//             <button
//               onClick={() => {
//                 setSearchTerm('');
//                 setSelectedDifficulty('');
//                 fetchCourses();
//               }}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
//             >
//               Show All Courses
//             </button>
//           </div>
//         )}

//         {/* Loading overlay for filtering */}
//         {loading && courses.length > 0 && (
//           <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading courses...</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Courses;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../hooks/useCourses';
import { Search, Filter, Star, Clock, Users, BookOpen } from 'lucide-react';
import Header from '../components/common/Header';
import Loading from '../components/common/Loading';

const Courses = () => {
  const { user } = useAuth();
  const { courses, loading, error, enrollInCourse, fetchCourses } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [enrollingCourses, setEnrollingCourses] = useState(new Set());

  // ✅ Load all courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCourses({
      search: searchTerm.trim(),
      difficulty: selectedDifficulty
    });
  };

  const handleEnroll = async (courseId) => {
    if (enrollingCourses.has(courseId)) return;

    setEnrollingCourses(prev => new Set([...prev, courseId]));
    try {
      await enrollInCourse(courseId);

      // ✅ Update local state instantly so it changes to Continue without reload
      fetchCourses({ search: searchTerm.trim(), difficulty: selectedDifficulty });
      // Alternatively for instant UI update without refetch:
      // setCourses(prev => prev.map(c => c.id === courseId ? { ...c, is_enrolled: true } : c));
    } catch (error) {
      console.error(error);
    } finally {
      setEnrollingCourses(prev => {
        const newSet = new Set(prev);
        newSet.delete(courseId);
        return newSet;
      });
    }
  };

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  if (loading && courses.length === 0) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Language Courses</h1>
          <p className="text-gray-600">Choose from our wide selection of language courses</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedDifficulty}
                onChange={(e) => {
                  setSelectedDifficulty(e.target.value);
                  fetchCourses({ search: searchTerm.trim(), difficulty: e.target.value });
                }}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
            <button
              onClick={() => fetchCourses()}
              className="mt-2 text-red-600 hover:text-red-700 font-medium"
            >
              Try again
            </button>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(courses) && courses.map((course) => {
            const courseData = course || {};
            const language = courseData.language || {};
            const averageRating = Number(courseData.average_rating) || 0;
            const totalLessons = Number(courseData.total_lessons) || 0;
            const totalRatings = Number(courseData.total_ratings) || 0;
            const difficulty = courseData.difficulty || 'beginner';

            return (
              <div key={courseData.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={courseData.cover_image || `https://via.placeholder.com/400x200?text=${encodeURIComponent(courseData.title || 'Course')}`}
                    alt={courseData.title || 'Course'}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x200?text=${encodeURIComponent(courseData.title || 'Course')}`;
                    }}
                  />
                  {courseData.is_premium && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Premium
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[difficulty] || difficultyColors.beginner}`}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                      {courseData.title || 'Course Title'}
                    </h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">
                        {averageRating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {courseData.description || 'No description available'}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {totalLessons} lessons
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      ~{Math.round(totalLessons * 15)} min
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {totalRatings}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={language.flag_image || 'https://via.placeholder.com/24x16?text=🏳️'}
                        alt={language.name || 'Language'}
                        className="w-6 h-4 rounded object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/24x16?text=🏳️';
                        }}
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {language.name || 'Language'}
                      </span>
                    </div>

                    {courseData.is_enrolled ? (
                      <Link
                        to={`/courses/${courseData.id}/lessons`}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                      >
                        Continue
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleEnroll(courseData.id)}
                        disabled={enrollingCourses.has(courseData.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {enrollingCourses.has(courseData.id) ? 'Enrolling...' : 'Enroll'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {(!Array.isArray(courses) || courses.length === 0) && !loading && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDifficulty('');
                fetchCourses();
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Show All Courses
            </button>
          </div>
        )}

        {/* Loading overlay */}
        {loading && courses.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading courses...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
