// // // import React, { useState, useEffect } from 'react';
// // // import { useParams, Link } from 'react-router-dom';
// // // import { useAuth } from '../context/AuthContext';
// // // import api from '../services/api';
// // // import { 
// // //   Search, 
// // //   Star, 
// // //   Clock, 
// // //   Users, 
// // //   BookOpen, 
// // //   Play, 
// // //   ArrowLeft,
// // //   Award,
// // //   Target,
// // //   CheckCircle,
// // //   Lock,
// // //   ArrowRight
// // // } from 'lucide-react';
// // // import Header from '../components/common/Header';
// // // import Loading from '../components/common/Loading';

// // // const LanguageLevels = () => {
// // //   const { languageCode } = useParams();
// // //   const { user } = useAuth();
// // //   const [allCourses, setAllCourses] = useState([]);
// // //   const [language, setLanguage] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [enrollingCourses, setEnrollingCourses] = useState(new Set());
// // //   const [locallyEnrolledCourses, setLocallyEnrolledCourses] = useState(new Set());

// // //   useEffect(() => {
// // //     const fetchLanguageData = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const params = { language: languageCode };
// // //         if (searchTerm.trim()) params.search = searchTerm.trim();

// // //         const [coursesResponse, languagesResponse] = await Promise.all([
// // //           api.get(`/courses/?${new URLSearchParams(params).toString()}`),
// // //           api.get('/courses/languages/')
// // //         ]);

// // //         setAllCourses(coursesResponse.data.results || coursesResponse.data || []);
        
// // //         // Find the specific language
// // //         const allLanguages = languagesResponse.data?.results || languagesResponse.data || [];
// // //         const currentLanguage = allLanguages.find(lang => lang.code === languageCode);
// // //         setLanguage(currentLanguage);

// // //       } catch (err) {
// // //         console.error('Error fetching data:', err);
// // //         setError('Failed to load language data. Please try again.');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchLanguageData();
// // //   }, [languageCode, searchTerm]);

// // //   // Group courses by difficulty level
// // //   const coursesByLevel = React.useMemo(() => {
// // //     const grouped = {
// // //       beginner: [],
// // //       intermediate: [],
// // //       advanced: []
// // //     };

// // //     allCourses.forEach(course => {
// // //       const difficulty = course.difficulty || 'beginner';
// // //       if (grouped[difficulty]) {
// // //         grouped[difficulty].push(course);
// // //       }
// // //     });

// // //     return grouped;
// // //   }, [allCourses]);

// // //   const handleEnroll = async (courseId) => {
// // //     if (enrollingCourses.has(courseId)) return;
    
// // //     setEnrollingCourses(prev => new Set([...prev, courseId]));
    
// // //     try {
// // //       await api.post(`/courses/${courseId}/enroll/`);
// // //       setLocallyEnrolledCourses(prev => new Set([...prev, courseId]));
      
// // //       // Refresh courses
// // //       const params = { language: languageCode };
// // //       if (searchTerm.trim()) params.search = searchTerm.trim();
      
// // //       const response = await api.get(`/courses/?${new URLSearchParams(params).toString()}`);
// // //       setAllCourses(response.data.results || response.data || []);
      
// // //     } catch (error) {
// // //       console.error('Enrollment failed:', error);
// // //       setLocallyEnrolledCourses(prev => {
// // //         const newSet = new Set(prev);
// // //         newSet.delete(courseId);
// // //         return newSet;
// // //       });
// // //     } finally {
// // //       setEnrollingCourses(prev => {
// // //         const newSet = new Set(prev);
// // //         newSet.delete(courseId);
// // //         return newSet;
// // //       });
// // //     }
// // //   };

// // //   const getDifficultyInfo = (level) => {
// // //     const info = {
// // //       beginner: {
// // //         color: 'from-green-500 to-green-600',
// // //         bgColor: 'bg-green-50',
// // //         textColor: 'text-green-800',
// // //         description: 'Perfect for complete beginners. Learn basic vocabulary, pronunciation, and simple sentences.',
// // //         icon: '🌱',
// // //         duration: '~15 hours'
// // //       },
// // //       intermediate: {
// // //         color: 'from-yellow-500 to-orange-500',
// // //         bgColor: 'bg-yellow-50',
// // //         textColor: 'text-yellow-800',
// // //         description: 'Build on your foundation with conversations, grammar, and practical scenarios.',
// // //         icon: '🚀',
// // //         duration: '~20 hours'
// // //       },
// // //       advanced: {
// // //         color: 'from-red-500 to-pink-500',
// // //         bgColor: 'bg-red-50',
// // //         textColor: 'text-red-800',
// // //         description: 'Master complex grammar, literature, and achieve fluency in professional contexts.',
// // //         icon: '👑',
// // //         duration: '~30 hours'
// // //       }
// // //     };
// // //     return info[level] || info.beginner;
// // //   };

// // //   const getLevelStats = (courses) => {
// // //     const totalCourses = courses.length;
// // //     const enrolledCourses = courses.filter(course => 
// // //       course.is_enrolled || locallyEnrolledCourses.has(course.id)
// // //     ).length;
// // //     const completedCourses = courses.filter(course => course.is_completed).length;
    
// // //     return { totalCourses, enrolledCourses, completedCourses };
// // //   };

// // //   // Check if a level is unlocked based on previous level completion
// // //   const isLevelUnlocked = (level) => {
// // //     if (level === 'beginner') return true; // Beginner is always unlocked
    
// // //     const levelOrder = ['beginner', 'intermediate', 'advanced'];
// // //     const currentLevelIndex = levelOrder.indexOf(level);
// // //     const previousLevel = levelOrder[currentLevelIndex - 1];
    
// // //     if (!previousLevel) return true;
    
// // //     const previousLevelCourses = coursesByLevel[previousLevel] || [];
// // //     const previousLevelStats = getLevelStats(previousLevelCourses);
    
// // //     // Level is unlocked if previous level has courses and all are completed
// // //     return previousLevelStats.totalCourses > 0 && 
// // //            previousLevelStats.completedCourses === previousLevelStats.totalCourses;
// // //   };

// // //   // Get the required previous level info
// // //   const getRequiredPreviousLevel = (level) => {
// // //     const levelOrder = ['beginner', 'intermediate', 'advanced'];
// // //     const currentLevelIndex = levelOrder.indexOf(level);
// // //     if (currentLevelIndex <= 0) return null;
    
// // //     const previousLevel = levelOrder[currentLevelIndex - 1];
// // //     return {
// // //       name: previousLevel.charAt(0).toUpperCase() + previousLevel.slice(1),
// // //       level: previousLevel
// // //     };
// // //   };

// // //   const handleLevelAction = (level, courses) => {
// // //     if (!isLevelUnlocked(level)) return;
    
// // //     // Find the first unenrolled course or first course
// // //     const nextCourse = courses.find(course => 
// // //       !course.is_enrolled && !locallyEnrolledCourses.has(course.id)
// // //     ) || courses[0];
    
// // //     if (nextCourse) {
// // //       handleEnroll(nextCourse.id);
// // //     }
// // //   };

// // //   if (loading) return <Loading />;

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       <Header />
      
// // //       <div className="container mx-auto px-6 py-8">
// // //         {/* Back Button */}
// // //         <Link
// // //           to="/languages"
// // //           className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
// // //         >
// // //           <ArrowLeft className="w-4 h-4 mr-2" />
// // //           Back to Languages
// // //         </Link>

// // //         {/* Header Section - Styled like LevelSelection */}
// // //         <div className="text-center mb-12">
// // //           <div className="flex items-center justify-center mb-4">
// // //             {language?.flag_image ? (
// // //               <img
// // //                 src={language.flag_image}
// // //                 alt={`${language.name} flag`}
// // //                 className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg mr-4"
// // //               />
// // //             ) : (
// // //               <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mr-4">
// // //                 <span className="text-2xl text-white font-bold">
// // //                   {language?.name?.charAt(0) || '?'}
// // //                 </span>
// // //               </div>
// // //             )}
// // //             <div className="text-left">
// // //               <h1 className="text-4xl font-bold text-gray-900">
// // //                 Learn {language?.name || 'Language'}
// // //               </h1>
// // //               <p className="text-gray-600">Choose your starting level</p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Skill Assessment Banner */}
// // //         <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 text-center">
// // //           <Target className="w-12 h-12 mx-auto mb-4" />
// // //           <h3 className="text-xl font-bold mb-2">Looking for specific courses?</h3>
// // //           <p className="mb-4">Search through our course catalog to find exactly what you need</p>
// // //           <div className="relative max-w-md mx-auto">
// // //             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 w-5 h-5" />
// // //             <input
// // //               type="text"
// // //               value={searchTerm}
// // //               onChange={(e) => setSearchTerm(e.target.value)}
// // //               placeholder={`Search ${language?.name || 'language'} courses...`}
// // //               className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* Error State */}
// // //         {error && (
// // //           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
// // //             <p className="text-red-800 text-center">{error}</p>
// // //             <button 
// // //               onClick={() => window.location.reload()} 
// // //               className="mt-2 text-red-600 hover:text-red-800 text-sm underline block mx-auto"
// // //             >
// // //               Try Again
// // //             </button>
// // //           </div>
// // //         )}

// // //         {/* Levels Grid - Styled like LevelSelection */}
// // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
// // //           {['beginner', 'intermediate', 'advanced'].map((level) => {
// // //             const courses = coursesByLevel[level] || [];
// // //             const stats = getLevelStats(courses);
// // //             const difficultyInfo = getDifficultyInfo(level);
// // //             const progressPercentage = stats.totalCourses > 0 
// // //               ? Math.round((stats.enrolledCourses / stats.totalCourses) * 100) 
// // //               : 0;
// // //             const isCompleted = stats.completedCourses === stats.totalCourses && stats.totalCourses > 0;
// // //             const hasEnrolledCourses = stats.enrolledCourses > 0;
// // //             const isUnlocked = isLevelUnlocked(level);
// // //             const requiredPreviousLevel = getRequiredPreviousLevel(level);

// // //             return (
// // //               <div
// // //                 key={level}
// // //                 className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
// // //                   !isUnlocked ? 'opacity-60' : 'hover:shadow-xl transform hover:scale-105'
// // //                 }`}
// // //               >
// // //                 {/* Level Header */}
// // //                 <div className={`h-32 bg-gradient-to-r ${difficultyInfo.color} relative flex items-center justify-center`}>
// // //                   <div className="text-center text-white">
// // //                     <div className="text-4xl mb-2">{difficultyInfo.icon}</div>
// // //                     <h3 className="text-2xl font-bold capitalize">{level}</h3>
// // //                   </div>
                  
// // //                   {/* Status Badge */}
// // //                   <div className="absolute top-4 right-4">
// // //                     {!isUnlocked && (
// // //                       <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
// // //                         <Lock className="w-4 h-4 mr-1" />
// // //                         Locked
// // //                       </div>
// // //                     )}
// // //                     {isUnlocked && isCompleted && (
// // //                       <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
// // //                         <CheckCircle className="w-4 h-4 mr-1" />
// // //                         Completed
// // //                       </div>
// // //                     )}
// // //                     {isUnlocked && hasEnrolledCourses && !isCompleted && (
// // //                       <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
// // //                         <Play className="w-4 h-4 mr-1" />
// // //                         In Progress
// // //                       </div>
// // //                     )}
// // //                     {isUnlocked && stats.totalCourses === 0 && (
// // //                       <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
// // //                         <Lock className="w-4 h-4 mr-1" />
// // //                         Coming Soon
// // //                       </div>
// // //                     )}
// // //                   </div>
                  
// // //                   {/* Progress Bar */}
// // //                   {isUnlocked && hasEnrolledCourses && (
// // //                     <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
// // //                       <div 
// // //                         className="h-1 bg-white transition-all duration-500"
// // //                         style={{ width: `${progressPercentage}%` }}
// // //                       ></div>
// // //                     </div>
// // //                   )}
// // //                 </div>

// // //                 {/* Level Content */}
// // //                 <div className="p-6">
// // //                   <p className="text-gray-600 mb-4 line-clamp-3">
// // //                     {difficultyInfo.description}
// // //                   </p>

// // //                   {/* Stats Grid */}
// // //                   <div className="grid grid-cols-3 gap-4 mb-6">
// // //                     <div className="text-center">
// // //                       <div className={`w-10 h-10 ${difficultyInfo.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
// // //                         <BookOpen className={`w-5 h-5 ${difficultyInfo.textColor}`} />
// // //                       </div>
// // //                       <div className="text-sm font-semibold text-gray-900">
// // //                         {stats.totalCourses}
// // //                       </div>
// // //                       <div className="text-xs text-gray-500">Courses</div>
// // //                     </div>
                    
// // //                     <div className="text-center">
// // //                       <div className={`w-10 h-10 ${difficultyInfo.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
// // //                         <Clock className={`w-5 h-5 ${difficultyInfo.textColor}`} />
// // //                       </div>
// // //                       <div className="text-sm font-semibold text-gray-900">
// // //                         {difficultyInfo.duration}
// // //                       </div>
// // //                       <div className="text-xs text-gray-500">Duration</div>
// // //                     </div>
                    
// // //                     <div className="text-center">
// // //                       <div className={`w-10 h-10 ${difficultyInfo.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
// // //                         <Award className={`w-5 h-5 ${difficultyInfo.textColor}`} />
// // //                       </div>
// // //                       <div className="text-sm font-semibold text-gray-900">
// // //                         Certificate
// // //                       </div>
// // //                       <div className="text-xs text-gray-500">Included</div>
// // //                     </div>
// // //                   </div>

// // //                   {/* Requirements Section */}
// // //                   {requiredPreviousLevel && (
// // //                     <div className={`p-3 rounded-lg mb-4 ${
// // //                       !isUnlocked ? 'bg-gray-100' : 'bg-green-100'
// // //                     }`}>
// // //                       <div className="flex items-center">
// // //                         {!isUnlocked ? (
// // //                           <Lock className="w-4 h-4 text-gray-500 mr-2" />
// // //                         ) : (
// // //                           <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
// // //                         )}
// // //                         <span className={`text-sm ${
// // //                           !isUnlocked ? 'text-gray-600' : 'text-green-700'
// // //                         }`}>
// // //                           Requires: Complete {requiredPreviousLevel.name} Level
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                   )}

// // //                   {/* Course Preview */}
// // //                   {isUnlocked && courses.length > 0 && (
// // //                     <div className="bg-gray-50 rounded-lg p-3 mb-4">
// // //                       <h4 className="text-sm font-semibold text-gray-900 mb-2">Featured Courses:</h4>
// // //                       <div className="space-y-2">
// // //                         {courses.slice(0, 3).map((course) => (
// // //                           <div key={course.id} className="flex items-center justify-between text-sm">
// // //                             <span className="text-gray-700 truncate flex-1">{course.title}</span>
// // //                             <div className="flex items-center ml-2">
// // //                               {(course.is_enrolled || locallyEnrolledCourses.has(course.id)) && (
// // //                                 <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
// // //                               )}
// // //                               <Star className="w-3 h-3 text-yellow-500 mr-1" />
// // //                               <span className="text-gray-500">{(course.average_rating || 4.5).toFixed(1)}</span>
// // //                             </div>
// // //                           </div>
// // //                         ))}
// // //                         {courses.length > 3 && (
// // //                           <div className="text-xs text-gray-500">
// // //                             +{courses.length - 3} more courses
// // //                           </div>
// // //                         )}
// // //                       </div>
// // //                     </div>
// // //                   )}

// // //                   {/* Action Button */}
// // //                   <div className="mt-6">
// // //                     {!isUnlocked ? (
// // //                       <button
// // //                         disabled
// // //                         className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-semibold cursor-not-allowed"
// // //                       >
// // //                         Complete {requiredPreviousLevel?.name} Level First
// // //                       </button>
// // //                     ) : stats.totalCourses === 0 ? (
// // //                       <button
// // //                         disabled
// // //                         className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-semibold cursor-not-allowed"
// // //                       >
// // //                         Courses Coming Soon
// // //                       </button>
// // //                     ) : isCompleted ? (
// // //                       <div className="flex gap-3">
// // //                         <Link
// // //                           to={`/courses/${courses[0]?.id}/lessons`}
// // //                           className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold text-center"
// // //                         >
// // //                           Review Content
// // //                         </Link>
// // //                         <div className="flex items-center bg-green-100 text-green-800 px-3 py-2 rounded-lg">
// // //                           <Award className="w-5 h-5" />
// // //                         </div>
// // //                       </div>
// // //                     ) : hasEnrolledCourses ? (
// // //                       <Link
// // //                         to={`/courses/${courses.find(c => c.is_enrolled || locallyEnrolledCourses.has(c.id))?.id}/lessons`}
// // //                         className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
// // //                       >
// // //                         <Play className="w-5 h-5 mr-2" />
// // //                         Continue Learning ({progressPercentage}%)
// // //                       </Link>
// // //                     ) : (
// // //                       <button
// // //                         onClick={() => handleLevelAction(level, courses)}
// // //                         className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
// // //                       >
// // //                         <ArrowRight className="w-5 h-5 mr-2" />
// // //                         Start {level.charAt(0).toUpperCase() + level.slice(1)}
// // //                       </button>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             );
// // //           })}
// // //         </div>

// // //         {/* Learning Path Visualization */}
// // //         {allCourses.length > 0 && (
// // //           <div className="mt-12 text-center">
// // //             <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Learning Journey</h3>
// // //             <div className="flex items-center justify-center space-x-8 max-w-2xl mx-auto">
// // //               {['beginner', 'intermediate', 'advanced'].map((level, index) => {
// // //                 const courses = coursesByLevel[level] || [];
// // //                 const stats = getLevelStats(courses);
// // //                 const isCompleted = stats.completedCourses === stats.totalCourses && stats.totalCourses > 0;
// // //                 const hasEnrolledCourses = stats.enrolledCourses > 0;
// // //                 const isUnlocked = isLevelUnlocked(level);

// // //                 return (
// // //                   <React.Fragment key={level}>
// // //                     <div className="text-center">
// // //                       <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
// // //                         !isUnlocked
// // //                           ? 'bg-gray-300 text-gray-500'
// // //                           : isCompleted 
// // //                           ? 'bg-green-500 text-white' 
// // //                           : hasEnrolledCourses 
// // //                           ? 'bg-blue-500 text-white' 
// // //                           : 'bg-gray-200 text-gray-500'
// // //                       }`}>
// // //                         {!isUnlocked ? (
// // //                           <Lock className="w-8 h-8" />
// // //                         ) : isCompleted ? (
// // //                           <CheckCircle className="w-8 h-8" />
// // //                         ) : (
// // //                           <span className="text-xl font-bold">{index + 1}</span>
// // //                         )}
// // //                       </div>
// // //                       <p className="text-sm font-medium text-gray-700 mt-2 capitalize">
// // //                         {level}
// // //                       </p>
// // //                       {!isUnlocked && (
// // //                         <p className="text-xs text-gray-500 mt-1">Locked</p>
// // //                       )}
// // //                     </div>
                    
// // //                     {index < 2 && (
// // //                       <ArrowRight className={`w-6 h-6 ${isUnlocked ? 'text-gray-400' : 'text-gray-300'}`} />
// // //                     )}
// // //                   </React.Fragment>
// // //                 );
// // //               })}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Empty State */}
// // //         {allCourses.length === 0 && !loading && (
// // //           <div className="text-center py-12">
// // //             <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// // //             <h3 className="text-xl font-semibold text-gray-900 mb-2">
// // //               No {language?.name || 'language'} courses available
// // //             </h3>
// // //             <p className="text-gray-600 mb-6">
// // //               Courses will be organized by difficulty levels once they are added.
// // //             </p>
// // //             <Link
// // //               to="/languages"
// // //               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-block"
// // //             >
// // //               Choose Different Language
// // //             </Link>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default LanguageLevels;


// // import React, { useState, useEffect } from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';
// // import api from '../services/api';
// // import { 
// //   Search, 
// //   Star, 
// //   Clock, 
// //   Users, 
// //   BookOpen, 
// //   Play, 
// //   ArrowLeft,
// //   Award,
// //   Target,
// //   CheckCircle,
// //   Lock,
// //   ArrowRight,
// //   Globe,
// //   Trophy,
// //   Flame
// // } from 'lucide-react';
// // import Header from '../components/common/Header';
// // import Loading from '../components/common/Loading';

// // const LanguageLevels = () => {
// //   const { languageCode } = useParams();
// //   const { user } = useAuth();
// //   const [allCourses, setAllCourses] = useState([]);
// //   const [language, setLanguage] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [enrollingCourses, setEnrollingCourses] = useState(new Set());
// //   const [locallyEnrolledCourses, setLocallyEnrolledCourses] = useState(new Set());

// //   useEffect(() => {
// //     const fetchLanguageData = async () => {
// //       try {
// //         setLoading(true);
// //         const params = { language: languageCode };
// //         if (searchTerm.trim()) params.search = searchTerm.trim();

// //         const [coursesResponse, languagesResponse] = await Promise.all([
// //           api.get(`/courses/?${new URLSearchParams(params).toString()}`),
// //           api.get('/courses/languages/')
// //         ]);

// //         setAllCourses(coursesResponse.data.results || coursesResponse.data || []);
        
// //         // Find the specific language
// //         const allLanguages = languagesResponse.data?.results || languagesResponse.data || [];
// //         const currentLanguage = allLanguages.find(lang => lang.code === languageCode);
// //         setLanguage(currentLanguage);

// //       } catch (err) {
// //         console.error('Error fetching data:', err);
// //         setError('Failed to load language data. Please try again.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchLanguageData();
// //   }, [languageCode, searchTerm]);

// //   // Group courses by difficulty level
// //   const coursesByLevel = React.useMemo(() => {
// //     const grouped = {
// //       beginner: [],
// //       intermediate: [],
// //       advanced: []
// //     };

// //     allCourses.forEach(course => {
// //       const difficulty = course.difficulty || 'beginner';
// //       if (grouped[difficulty]) {
// //         grouped[difficulty].push(course);
// //       }
// //     });

// //     return grouped;
// //   }, [allCourses]);

// //   const handleEnroll = async (courseId) => {
// //     if (enrollingCourses.has(courseId)) return;
    
// //     setEnrollingCourses(prev => new Set([...prev, courseId]));
    
// //     try {
// //       await api.post(`/courses/${courseId}/enroll/`);
// //       setLocallyEnrolledCourses(prev => new Set([...prev, courseId]));
      
// //       // Refresh courses
// //       const params = { language: languageCode };
// //       if (searchTerm.trim()) params.search = searchTerm.trim();
      
// //       const response = await api.get(`/courses/?${new URLSearchParams(params).toString()}`);
// //       setAllCourses(response.data.results || response.data || []);
      
// //     } catch (error) {
// //       console.error('Enrollment failed:', error);
// //       setLocallyEnrolledCourses(prev => {
// //         const newSet = new Set(prev);
// //         newSet.delete(courseId);
// //         return newSet;
// //       });
// //     } finally {
// //       setEnrollingCourses(prev => {
// //         const newSet = new Set(prev);
// //         newSet.delete(courseId);
// //         return newSet;
// //       });
// //     }
// //   };

// //   const getDifficultyInfo = (level) => {
// //     const info = {
// //       beginner: {
// //         color: 'from-duo-green to-duo-green-dark',
// //         bgColor: 'bg-duo-green',
// //         textColor: 'text-white',
// //         description: 'Perfect for complete beginners. Learn basic vocabulary, pronunciation, and simple sentences.',
// //         icon: '🌱',
// //         duration: '~15 hours'
// //       },
// //       intermediate: {
// //         color: 'from-duo-yellow to-duo-red',
// //         bgColor: 'bg-duo-yellow',
// //         textColor: 'text-white',
// //         description: 'Build on your foundation with conversations, grammar, and practical scenarios.',
// //         icon: '🚀',
// //         duration: '~20 hours'
// //       },
// //       advanced: {
// //         color: 'from-duo-red to-duo-purple',
// //         bgColor: 'bg-duo-purple',
// //         textColor: 'text-white',
// //         description: 'Master complex grammar, literature, and achieve fluency in professional contexts.',
// //         icon: '👑',
// //         duration: '~30 hours'
// //       }
// //     };
// //     return info[level] || info.beginner;
// //   };

// //   const getLevelStats = (courses) => {
// //     const totalCourses = courses.length;
// //     const enrolledCourses = courses.filter(course => 
// //       course.is_enrolled || locallyEnrolledCourses.has(course.id)
// //     ).length;
// //     const completedCourses = courses.filter(course => course.is_completed).length;
    
// //     return { totalCourses, enrolledCourses, completedCourses };
// //   };

// //   // Check if a level is unlocked based on previous level completion
// //   const isLevelUnlocked = (level) => {
// //     if (level === 'beginner') return true; // Beginner is always unlocked
    
// //     const levelOrder = ['beginner', 'intermediate', 'advanced'];
// //     const currentLevelIndex = levelOrder.indexOf(level);
// //     const previousLevel = levelOrder[currentLevelIndex - 1];
    
// //     if (!previousLevel) return true;
    
// //     const previousLevelCourses = coursesByLevel[previousLevel] || [];
// //     const previousLevelStats = getLevelStats(previousLevelCourses);
    
// //     // Level is unlocked if previous level has courses and all are completed
// //     return previousLevelStats.totalCourses > 0 && 
// //            previousLevelStats.completedCourses === previousLevelStats.totalCourses;
// //   };

// //   // Get the required previous level info
// //   const getRequiredPreviousLevel = (level) => {
// //     const levelOrder = ['beginner', 'intermediate', 'advanced'];
// //     const currentLevelIndex = levelOrder.indexOf(level);
// //     if (currentLevelIndex <= 0) return null;
    
// //     const previousLevel = levelOrder[currentLevelIndex - 1];
// //     return {
// //       name: previousLevel.charAt(0).toUpperCase() + previousLevel.slice(1),
// //       level: previousLevel
// //     };
// //   };

// //   const handleLevelAction = (level, courses) => {
// //     if (!isLevelUnlocked(level)) return;
    
// //     // Find the first unenrolled course or first course
// //     const nextCourse = courses.find(course => 
// //       !course.is_enrolled && !locallyEnrolledCourses.has(course.id)
// //     ) || courses[0];
    
// //     if (nextCourse) {
// //       handleEnroll(nextCourse.id);
// //     }
// //   };

// //   if (loading) return <Loading />;

// //   return (
// //     <div className="min-h-screen bg-duo-gray-light">
// //       <Header />
      
// //       <div className="container mx-auto px-6 py-8">
// //         {/* Back Button */}
// //         <Link
// //           to="/languages"
// //           className="flex items-center text-duo-blue hover:text-duo-blue font-bold mb-8 transition-colors transform hover:scale-105"
// //         >
// //           <ArrowLeft className="w-5 h-5 mr-2" />
// //           Back to Languages
// //         </Link>

// //         {/* Header Section */}
// //         <div className="text-center mb-12">
// //           <div className="flex items-center justify-center mb-6">
// //             {language?.flag_image ? (
// //               <img
// //                 src={language.flag_image}
// //                 alt={`${language.name} flag`}
// //                 className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl mr-6 animate-bounce-gentle"
// //               />
// //             ) : (
// //               <div className="w-20 h-20 bg-duo-green rounded-full flex items-center justify-center mr-6 shadow-xl animate-bounce-gentle">
// //                 <span className="text-3xl text-white font-black">
// //                   {language?.name?.charAt(0) || '?'}
// //                 </span>
// //               </div>
// //             )}
// //             <div className="text-left">
// //               <h1 className="text-4xl md:text-5xl font-black text-dark">
// //                 Learn {language?.name || 'Language'}
// //               </h1>
// //               <p className="text-xl text-light font-bold">Choose your starting level</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Search Banner */}
// //         {/* <div className="bg-duo-blue text-white rounded-2xl p-8 mb-12 text-center shadow-xl">
// //           <div className="flex justify-center mb-4">
// //             <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
// //               <Target className="w-6 h-6 text-white" />
// //             </div>
// //           </div>
// //           <h3 className="text-2xl font-black mb-3">Looking for specific courses?</h3>
// //           <p className="text-blue-100 font-bold mb-6">Search through our course catalog to find exactly what you need</p>
// //           <div className="relative max-w-md mx-auto">
// //             <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-duo-green rounded-full flex items-center justify-center">
// //               <Search className="w-3 h-3 text-white" />
// //             </div>
// //             <input
// //               type="text"
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               placeholder={`Search ${language?.name || 'language'} courses...`}
// //               className="w-full pl-14 pr-4 py-4 rounded-2xl bg-white text-dark placeholder-light focus:outline-none focus:ring-2 focus:ring-duo-green font-bold border-2 border-transparent"
// //             />
// //           </div>
// //         </div> */}

// //         {/* Error State */}
// //         {error && (
// //           <div className="bg-duo-red rounded-2xl p-6 mb-8 max-w-md mx-auto shadow-xl">
// //             <p className="text-white text-center font-bold text-lg">{error}</p>
// //             <button 
// //               onClick={() => window.location.reload()} 
// //               className="mt-4 bg-white text-duo-red px-6 py-3 rounded-xl font-black text-sm hover:bg-gray-100 transition-colors block mx-auto uppercase tracking-wide transform hover:scale-105"
// //             >
// //               Try Again
// //             </button>
// //           </div>
// //         )}

// //         {/* Levels Grid */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
// //           {['beginner', 'intermediate', 'advanced'].map((level, levelIndex) => {
// //             const courses = coursesByLevel[level] || [];
// //             const stats = getLevelStats(courses);
// //             const difficultyInfo = getDifficultyInfo(level);
// //             const progressPercentage = stats.totalCourses > 0 
// //               ? Math.round((stats.enrolledCourses / stats.totalCourses) * 100) 
// //               : 0;
// //             const isCompleted = stats.completedCourses === stats.totalCourses && stats.totalCourses > 0;
// //             const hasEnrolledCourses = stats.enrolledCourses > 0;
// //             const isUnlocked = isLevelUnlocked(level);
// //             const requiredPreviousLevel = getRequiredPreviousLevel(level);

// //             return (
// //               <div
// //                 key={level}
// //                 className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform animate-fade-in ${
// //                   !isUnlocked ? 'opacity-60' : 'hover:shadow-2xl hover:scale-105'
// //                 }`}
// //                 style={{animationDelay: `${levelIndex * 0.2}s`}}
// //               >
// //                 {/* Level Header */}
// //                 <div className={`h-40 bg-gradient-to-r ${difficultyInfo.color} relative flex items-center justify-center`}>
// //                   <div className="text-center text-white">
// //                     <div className="text-5xl mb-3 animate-bounce-gentle">{difficultyInfo.icon}</div>
// //                     <h3 className="text-3xl font-black capitalize">{level}</h3>
// //                   </div>
                  
// //                   {/* Status Badge */}
// //                   <div className="absolute top-4 right-4">
// //                     {!isUnlocked && (
// //                       <div className="bg-duo-gray text-white px-4 py-2 rounded-full text-sm font-black flex items-center shadow-lg">
// //                         <Lock className="w-4 h-4 mr-1" />
// //                         Locked
// //                       </div>
// //                     )}
// //                     {isUnlocked && isCompleted && (
// //                       <div className="bg-duo-green text-white px-4 py-2 rounded-full text-sm font-black flex items-center shadow-lg">
// //                         <CheckCircle className="w-4 h-4 mr-1" />
// //                         Completed
// //                       </div>
// //                     )}
// //                     {isUnlocked && hasEnrolledCourses && !isCompleted && (
// //                       <div className="bg-duo-blue text-white px-4 py-2 rounded-full text-sm font-black flex items-center shadow-lg">
// //                         <Play className="w-4 h-4 mr-1" />
// //                         In Progress
// //                       </div>
// //                     )}
// //                     {isUnlocked && stats.totalCourses === 0 && (
// //                       <div className="bg-duo-gray text-white px-4 py-2 rounded-full text-sm font-black flex items-center shadow-lg">
// //                         <Lock className="w-4 h-4 mr-1" />
// //                         Coming Soon
// //                       </div>
// //                     )}
// //                   </div>
                  
// //                   {/* Progress Bar */}
// //                   {isUnlocked && hasEnrolledCourses && (
// //                     <div className="absolute bottom-0 left-0 right-0 h-2 bg-white bg-opacity-30">
// //                       <div 
// //                         className="h-2 bg-white transition-all duration-500"
// //                         style={{ width: `${progressPercentage}%` }}
// //                       ></div>
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Level Content */}
// //                 <div className="p-8">
// //                   <p className="text-light font-bold mb-6 text-lg leading-relaxed">
// //                     {difficultyInfo.description}
// //                   </p>

// //                   {/* Stats Grid */}
// //                   <div className="grid grid-cols-3 gap-4 mb-8">
// //                     <div className="text-center">
// //                       <div className={`w-12 h-12 ${difficultyInfo.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
// //                         <BookOpen className={`w-6 h-6 ${difficultyInfo.textColor}`} />
// //                       </div>
// //                       <div className="text-xl font-black text-dark">
// //                         {stats.totalCourses}
// //                       </div>
// //                       <div className="text-sm text-light font-bold uppercase tracking-wide">Courses</div>
// //                     </div>
                    
// //                     <div className="text-center">
// //                       <div className={`w-12 h-12 ${difficultyInfo.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
// //                         <Clock className={`w-6 h-6 ${difficultyInfo.textColor}`} />
// //                       </div>
// //                       <div className="text-xl font-black text-dark">
// //                         {difficultyInfo.duration}
// //                       </div>
// //                       <div className="text-sm text-light font-bold uppercase tracking-wide">Duration</div>
// //                     </div>
                    
// //                     <div className="text-center">
// //                       <div className={`w-12 h-12 ${difficultyInfo.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
// //                         <Award className={`w-6 h-6 ${difficultyInfo.textColor}`} />
// //                       </div>
// //                       <div className="text-xl font-black text-dark">
// //                         Certificate
// //                       </div>
// //                       <div className="text-sm text-light font-bold uppercase tracking-wide">Included</div>
// //                     </div>
// //                   </div>

// //                   {/* Requirements Section */}
// //                   {requiredPreviousLevel && (
// //                     <div className={`p-4 rounded-2xl mb-6 border-2 ${
// //                       !isUnlocked ? 'bg-duo-gray-light border-gray-300' : 'bg-duo-green bg-opacity-10 border-duo-green'
// //                     }`}>
// //                       <div className="flex items-center">
// //                         {!isUnlocked ? (
// //                           <Lock className="w-5 h-5 text-duo-gray mr-3" />
// //                         ) : (
// //                           <CheckCircle className="w-5 h-5 text-duo-green mr-3" />
// //                         )}
// //                         <span className={`font-bold ${
// //                           !isUnlocked ? 'text-duo-gray' : 'text-duo-green'
// //                         }`}>
// //                           Requires: Complete {requiredPreviousLevel.name} Level
// //                         </span>
// //                       </div>
// //                     </div>
// //                   )}

// //                   {/* Course Preview */}
// //                   {isUnlocked && courses.length > 0 && (
// //                     <div className="bg-duo-gray-light rounded-2xl p-6 mb-6 border-2 border-gray-200">
// //                       <h4 className="font-black text-dark mb-4 uppercase tracking-wide">Featured Courses:</h4>
// //                       <div className="space-y-3">
// //                         {courses.slice(0, 3).map((course) => (
// //                           <div key={course.id} className="flex items-center justify-between">
// //                             <span className="text-dark font-bold truncate flex-1">{course.title}</span>
// //                             <div className="flex items-center ml-3">
// //                               {(course.is_enrolled || locallyEnrolledCourses.has(course.id)) && (
// //                                 <CheckCircle className="w-5 h-5 text-duo-green mr-2" />
// //                               )}
// //                               <Star className="w-4 h-4 text-duo-yellow mr-1" />
// //                               <span className="text-light font-bold">{(course.average_rating || 4.5).toFixed(1)}</span>
// //                             </div>
// //                           </div>
// //                         ))}
// //                         {courses.length > 3 && (
// //                           <div className="text-sm text-light font-bold">
// //                             +{courses.length - 3} more courses
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   )}

// //                   {/* Action Button */}
// //                   <div className="mt-8">
// //                     {!isUnlocked ? (
// //                       <button
// //                         disabled
// //                         className="w-full bg-duo-gray text-white py-4 px-6 rounded-2xl font-black cursor-not-allowed uppercase tracking-wide"
// //                       >
// //                         Complete {requiredPreviousLevel?.name} Level First
// //                       </button>
// //                     ) : stats.totalCourses === 0 ? (
// //                       <button
// //                         disabled
// //                         className="w-full bg-duo-gray text-white py-4 px-6 rounded-2xl font-black cursor-not-allowed uppercase tracking-wide"
// //                       >
// //                         Courses Coming Soon
// //                       </button>
// //                     ) : isCompleted ? (
// //                       <div className="flex gap-4">
// //                         <Link
// //                           to={`/courses/${courses[0]?.id}/lessons`}
// //                           className="flex-1 bg-duo-gray text-white py-4 px-6 rounded-2xl hover:bg-duo-gray transition-colors font-black text-center uppercase tracking-wide transform hover:scale-105"
// //                         >
// //                           Review Content
// //                         </Link>
// //                         <div className="flex items-center bg-duo-green text-white px-4 py-2 rounded-2xl">
// //                           <Award className="w-6 h-6" />
// //                         </div>
// //                       </div>
// //                     ) : hasEnrolledCourses ? (
// //                       <Link
// //                         to={`/courses/${courses.find(c => c.is_enrolled || locallyEnrolledCourses.has(c.id))?.id}/lessons`}
// //                         className="w-full bg-duo-blue text-white py-4 px-6 rounded-2xl hover:bg-duo-blue transition-colors font-black flex items-center justify-center uppercase tracking-wide transform hover:scale-105"
// //                       >
// //                         <Play className="w-5 h-5 mr-2" />
// //                         Continue Learning ({progressPercentage}%)
// //                       </Link>
// //                     ) : (
// //                       <button
// //                         onClick={() => handleLevelAction(level, courses)}
// //                         className="w-full bg-duo-green text-white py-4 px-6 rounded-2xl hover:bg-duo-green-dark transition-colors font-black flex items-center justify-center uppercase tracking-wide transform hover:scale-105 shadow-lg"
// //                       >
// //                         <ArrowRight className="w-5 h-5 mr-2" />
// //                         Start {level.charAt(0).toUpperCase() + level.slice(1)}
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {/* Learning Path Visualization */}
// //         {allCourses.length > 0 && (
// //           <div className="mt-16 text-center">
// //             <div className="mb-8">
// //               <h3 className="text-3xl font-black text-dark mb-4">Your Learning Journey</h3>
// //               <p className="text-xl text-light font-bold">Progress through each level to master {language?.name}</p>
// //             </div>
            
// //             <div className="flex items-center justify-center space-x-8 max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-xl">
// //               {['beginner', 'intermediate', 'advanced'].map((level, index) => {
// //                 const courses = coursesByLevel[level] || [];
// //                 const stats = getLevelStats(courses);
// //                 const isCompleted = stats.completedCourses === stats.totalCourses && stats.totalCourses > 0;
// //                 const hasEnrolledCourses = stats.enrolledCourses > 0;
// //                 const isUnlocked = isLevelUnlocked(level);

// //                 return (
// //                   <React.Fragment key={level}>
// //                     <div className="text-center">
// //                       <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${
// //                         !isUnlocked
// //                           ? 'bg-duo-gray text-white'
// //                           : isCompleted 
// //                           ? 'bg-duo-green text-white' 
// //                           : hasEnrolledCourses 
// //                           ? 'bg-duo-blue text-white' 
// //                           : 'bg-duo-gray-light text-duo-gray'
// //                       }`}>
// //                         {!isUnlocked ? (
// //                           <Lock className="w-8 h-8" />
// //                         ) : isCompleted ? (
// //                           <CheckCircle className="w-8 h-8" />
// //                         ) : (
// //                           <span className="text-2xl font-black">{index + 1}</span>
// //                         )}
// //                       </div>
// //                       <p className="font-black text-dark mt-3 capitalize text-lg">
// //                         {level}
// //                       </p>
// //                       {!isUnlocked && (
// //                         <p className="text-sm text-light font-bold mt-1">Locked</p>
// //                       )}
// //                     </div>
                    
// //                     {index < 2 && (
// //                       <ArrowRight className={`w-8 h-8 ${isUnlocked ? 'text-duo-blue' : 'text-duo-gray'}`} />
// //                     )}
// //                   </React.Fragment>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         )}

// //         {/* Empty State */}
// //         {allCourses.length === 0 && !loading && (
// //           <div className="text-center py-16">
// //             <div className="w-24 h-24 bg-duo-gray rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
// //               <BookOpen className="w-12 h-12 text-white" />
// //             </div>
// //             <h3 className="text-3xl font-black text-dark mb-4">
// //               No {language?.name || 'language'} courses available
// //             </h3>
// //             <p className="text-light font-bold text-xl mb-8 max-w-md mx-auto">
// //               Courses will be organized by difficulty levels once they are added.
// //             </p>
// //             <Link
// //               to="/languages"
// //               className="bg-duo-green text-white px-8 py-4 rounded-2xl hover:bg-duo-green-dark transition-colors duration-200 font-black uppercase tracking-wide transform hover:scale-105 shadow-lg"
// //             >
// //               Choose Different Language
// //             </Link>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default LanguageLevels;


// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useAuth } from '../context/AuthContext';
// import api from '../services/api';
// import { 
//   Search, 
//   Star, 
//   Clock, 
//   Users, 
//   BookOpen, 
//   Play, 
//   ArrowLeft,
//   Award,
//   Target,
//   CheckCircle,
//   Lock,
//   ArrowRight,
//   Globe,
//   Trophy,
//   Flame
// } from 'lucide-react';
// import Header from '../components/common/Header';
// import Loading from '../components/common/Loading';


// const LanguageLevels = () => {
//   const { languageCode } = useParams();
//   const { user } = useAuth();
//   const [searchTerm, setSearchTerm] = useState('');
//   const queryClient = useQueryClient();

//   // Fetch courses for the specific language
//   const { 
//     data: coursesData, 
//     isLoading: coursesLoading, 
//     error: coursesError,
//     refetch: refetchCourses
//   } = useQuery(
//     ['courses', languageCode, searchTerm],
//     async () => {
//       const params = new URLSearchParams({ language: languageCode });
//       if (searchTerm.trim()) {
//         params.append('search', searchTerm.trim());
//       }
//       const response = await api.get(`/courses/?${params.toString()}`);
//       return response.data;
//     },
//     {
//       enabled: !!languageCode,
//       staleTime: 5 * 60 * 1000, // 5 minutes
//     }
//   );

//   // Fetch language info
//   const { data: languagesData } = useQuery(
//     'languages',
//     async () => {
//       const response = await api.get('/courses/languages/');
//       return response.data;
//     },
//     {
//       staleTime: 30 * 60 * 1000, // 30 minutes
//     }
//   );

//   // Course enrollment mutation
//   const enrollMutation = useMutation(
//     (courseId) => api.post(`/courses/${courseId}/enroll/`),
//     {
//       onSuccess: () => {
//         // Refetch courses to get updated enrollment status
//         refetchCourses();
//         queryClient.invalidateQueries(['progress-summary']);
//       },
//       onError: (error) => {
//         console.error('Enrollment failed:', error);
//         // Show error message to user
//       }
//     }
//   );

//   const allCourses = coursesData?.results || coursesData || [];
//   const allLanguages = languagesData?.results || languagesData || [];
//   const language = allLanguages.find(lang => lang.code === languageCode);

//   // Group courses by difficulty level with real data
//   const coursesByLevel = React.useMemo(() => {
//     const grouped = {
//       beginner: [],
//       intermediate: [],
//       advanced: []
//     };

//     allCourses.forEach(course => {
//       const difficulty = course.difficulty?.toLowerCase() || 'beginner';
//       if (grouped[difficulty]) {
//         grouped[difficulty].push(course);
//       }
//     });

//     return grouped;
//   }, [allCourses]);

//   const handleEnroll = async (courseId) => {
//     if (enrollMutation.isLoading) return;
//     enrollMutation.mutate(courseId);
//   };

//   const getLevelStats = (courses) => {
//     const totalCourses = courses.length;
//     const enrolledCourses = courses.filter(course => course.is_enrolled).length;
//     const completedCourses = courses.filter(course => course.is_completed).length;
    
//     return { totalCourses, enrolledCourses, completedCourses };
//   };

//   // Check if level is unlocked based on real user progress
//   const isLevelUnlocked = (level) => {
//     if (level === 'beginner') return true;
    
//     const levelOrder = ['beginner', 'intermediate', 'advanced'];
//     const currentLevelIndex = levelOrder.indexOf(level);
//     const previousLevel = levelOrder[currentLevelIndex - 1];
    
//     if (!previousLevel) return true;
    
//     const previousLevelCourses = coursesByLevel[previousLevel] || [];
//     const previousLevelStats = getLevelStats(previousLevelCourses);
    
//     return previousLevelStats.totalCourses > 0 && 
//            previousLevelStats.completedCourses === previousLevelStats.totalCourses;
//   };

//   if (coursesLoading) return <Loading />;

//   if (coursesError) {
//     return (
//       <div className="min-h-screen bg-duo-gray-light">
//         <Header />
//         <div className="container mx-auto px-6 py-8">
//           <div className="bg-duo-red rounded-2xl p-6 mb-8 max-w-md mx-auto shadow-xl">
//             <p className="text-white text-center font-bold text-lg">
//               {coursesError.message || 'Failed to load courses'}
//             </p>
//             <button 
//               onClick={() => refetchCourses()} 
//               className="mt-4 bg-white text-duo-red px-6 py-3 rounded-xl font-black text-sm hover:bg-gray-100 transition-colors block mx-auto uppercase tracking-wide"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-duo-gray-light">
//       <Header />
      
//       <div className="container mx-auto px-6 py-8">
//         {/* Back Button */}
//         <Link
//           to="/languages"
//           className="flex items-center text-duo-blue hover:text-duo-blue font-bold mb-8 transition-colors transform hover:scale-105"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           Back to Languages
//         </Link>

//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center mb-6">
//             {language?.flag_image ? (
//               <img
//                 src={language.flag_image}
//                 alt={`${language.name} flag`}
//                 className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl mr-6 animate-bounce-gentle"
//               />
//             ) : (
//               <div className="w-20 h-20 bg-duo-green rounded-full flex items-center justify-center mr-6 shadow-xl animate-bounce-gentle">
//                 <span className="text-3xl text-white font-black">
//                   {language?.name?.charAt(0) || '?'}
//                 </span>
//               </div>
//             )}
//             <div className="text-left">
//               <h1 className="text-4xl md:text-5xl font-black text-dark">
//                 Learn {language?.name || 'Language'}
//               </h1>
//               <p className="text-xl text-light font-bold">Choose your starting level</p>
//             </div>
//           </div>
//         </div>

//         {/* Levels Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {['beginner', 'intermediate', 'advanced'].map((level, levelIndex) => {
//             const courses = coursesByLevel[level] || [];
//             const stats = getLevelStats(courses);
//             const difficultyInfo = getDifficultyInfo(level);
//             const progressPercentage = stats.totalCourses > 0 
//               ? Math.round((stats.enrolledCourses / stats.totalCourses) * 100) 
//               : 0;
//             const isCompleted = stats.completedCourses === stats.totalCourses && stats.totalCourses > 0;
//             const hasEnrolledCourses = stats.enrolledCourses > 0;
//             const isUnlocked = isLevelUnlocked(level);

//             return (
//               <div
//                 key={level}
//                 className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform animate-fade-in ${
//                   !isUnlocked ? 'opacity-60' : 'hover:shadow-2xl hover:scale-105'
//                 }`}
//                 style={{animationDelay: `${levelIndex * 0.2}s`}}
//               >
//                 {/* Level Header */}
//                 <div className={`h-40 bg-gradient-to-r ${difficultyInfo.color} relative flex items-center justify-center`}>
//                   <div className="text-center text-white">
//                     <div className="text-5xl mb-3 animate-bounce-gentle">{difficultyInfo.icon}</div>
//                     <h3 className="text-3xl font-black capitalize">{level}</h3>
//                   </div>
                  
//                   {/* Status Badge */}
//                   <div className="absolute top-4 right-4">
//                     {!isUnlocked && (
//                       <div className="bg-duo-gray text-white px-4 py-2 rounded-full text-sm font-black flex items-center shadow-lg">
//                         <Lock className="w-4 h-4 mr-1" />
//                         Locked
//                       </div>
//                     )}
//                     {isUnlocked && isCompleted && (
//                       <div className="bg-duo-green text-white px-4 py-2 rounded-full text-sm font-black flex items-center shadow-lg">
//                         <CheckCircle className="w-4 h-4 mr-1" />
//                         Completed
//                       </div>
//                     )}
//                     {isUnlocked && hasEnrolledCourses && !isCompleted && (
//                       <div className="bg-duo-blue text-white px-4 py-2 rounded-full text-sm font-black flex items-center shadow-lg">
//                         <Play className="w-4 h-4 mr-1" />
//                         In Progress ({stats.enrolledCourses}/{stats.totalCourses})
//                       </div>
//                     )}
//                     {isUnlocked && stats.totalCourses === 0 && (
//                       <div className="bg-duo-gray text-white px-4 py-2 rounded-full text-sm font-black flex items-center shadow-lg">
//                         <Lock className="w-4 h-4 mr-1" />
//                         Coming Soon
//                       </div>
//                     )}
//                   </div>
                  
//                   {/* Real Progress Bar */}
//                   {isUnlocked && hasEnrolledCourses && (
//                     <div className="absolute bottom-0 left-0 right-0 h-2 bg-white bg-opacity-30">
//                       <div 
//                         className="h-2 bg-white transition-all duration-500"
//                         style={{ width: `${progressPercentage}%` }}
//                       ></div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Level Content */}
//                 <div className="p-8">
//                   <p className="text-light font-bold mb-6 text-lg leading-relaxed">
//                     {difficultyInfo.description}
//                   </p>

//                   {/* Real Stats Grid */}
//                   <div className="grid grid-cols-3 gap-4 mb-8">
//                     <div className="text-center">
//                       <div className={`w-12 h-12 ${difficultyInfo.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
//                         <BookOpen className={`w-6 h-6 ${difficultyInfo.textColor}`} />
//                       </div>
//                       <div className="text-xl font-black text-dark">
//                         {stats.totalCourses}
//                       </div>
//                       <div className="text-sm text-light font-bold uppercase tracking-wide">Courses</div>
//                     </div>
                    
//                     <div className="text-center">
//                       <div className={`w-12 h-12 ${difficultyInfo.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
//                         <CheckCircle className={`w-6 h-6 ${difficultyInfo.textColor}`} />
//                       </div>
//                       <div className="text-xl font-black text-dark">
//                         {stats.completedCourses}
//                       </div>
//                       <div className="text-sm text-light font-bold uppercase tracking-wide">Completed</div>
//                     </div>
                    
//                     <div className="text-center">
//                       <div className={`w-12 h-12 ${difficultyInfo.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
//                         <Users className={`w-6 h-6 ${difficultyInfo.textColor}`} />
//                       </div>
//                       <div className="text-xl font-black text-dark">
//                         {stats.enrolledCourses}
//                       </div>
//                       <div className="text-sm text-light font-bold uppercase tracking-wide">Enrolled</div>
//                     </div>
//                   </div>

//                   {/* Real Course Preview */}
//                   {isUnlocked && courses.length > 0 && (
//                     <div className="bg-duo-gray-light rounded-2xl p-6 mb-6 border-2 border-gray-200">
//                       <h4 className="font-black text-dark mb-4 uppercase tracking-wide">Available Courses:</h4>
//                       <div className="space-y-3">
//                         {courses.slice(0, 3).map((course) => (
//                           <div key={course.id} className="flex items-center justify-between">
//                             <span className="text-dark font-bold truncate flex-1">{course.title}</span>
//                             <div className="flex items-center ml-3">
//                               {course.is_enrolled && (
//                                 <CheckCircle className="w-5 h-5 text-duo-green mr-2" />
//                               )}
//                               <Star className="w-4 h-4 text-duo-yellow mr-1" />
//                               <span className="text-light font-bold">{(course.average_rating || 4.5).toFixed(1)}</span>
//                             </div>
//                           </div>
//                         ))}
//                         {courses.length > 3 && (
//                           <div className="text-sm text-light font-bold">
//                             +{courses.length - 3} more courses
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {/* Action Button */}
//                   <div className="mt-8">
//                     {!isUnlocked ? (
//                       <button
//                         disabled
//                         className="w-full bg-duo-gray text-white py-4 px-6 rounded-2xl font-black cursor-not-allowed uppercase tracking-wide"
//                       >
//                         Complete Previous Level First
//                       </button>
//                     ) : stats.totalCourses === 0 ? (
//                       <button
//                         disabled
//                         className="w-full bg-duo-gray text-white py-4 px-6 rounded-2xl font-black cursor-not-allowed uppercase tracking-wide"
//                       >
//                         Courses Coming Soon
//                       </button>
//                     ) : isCompleted ? (
//                       <div className="flex gap-4">
//                         <Link
//                           to={`/courses/${courses[0]?.id}/lessons`}
//                           className="flex-1 bg-duo-gray text-white py-4 px-6 rounded-2xl hover:bg-duo-gray transition-colors font-black text-center uppercase tracking-wide transform hover:scale-105"
//                         >
//                           Review Content
//                         </Link>
//                         <div className="flex items-center bg-duo-green text-white px-4 py-2 rounded-2xl">
//                           <Award className="w-6 h-6" />
//                         </div>
//                       </div>
//                     ) : hasEnrolledCourses ? (
//                       <Link
//                         to={`/courses/${courses.find(c => c.is_enrolled)?.id}/lessons`}
//                         className="w-full bg-duo-blue text-white py-4 px-6 rounded-2xl hover:bg-duo-blue transition-colors font-black flex items-center justify-center uppercase tracking-wide transform hover:scale-105"
//                       >
//                         <Play className="w-5 h-5 mr-2" />
//                         Continue Learning ({progressPercentage}%)
//                       </Link>
//                     ) : (
//                       <button
//                         onClick={() => handleEnroll(courses[0]?.id)}
//                         disabled={!courses[0] || enrollMutation.isLoading}
//                         className="w-full bg-duo-green text-white py-4 px-6 rounded-2xl hover:bg-duo-green-dark transition-colors font-black flex items-center justify-center uppercase tracking-wide transform hover:scale-105 shadow-lg disabled:opacity-50"
//                       >
//                         {enrollMutation.isLoading ? (
//                           <>
//                             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                             Enrolling...
//                           </>
//                         ) : (
//                           <>
//                             <ArrowRight className="w-5 h-5 mr-2" />
//                             Start {level.charAt(0).toUpperCase() + level.slice(1)}
//                           </>
//                         )}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Learning Path Visualization with Real Data */}
//         {allCourses.length > 0 && (
//           <div className="mt-16 text-center">
//             <div className="mb-8">
//               <h3 className="text-3xl font-black text-dark mb-4">Your Learning Journey</h3>
//               <p className="text-xl text-light font-bold">Progress through each level to master {language?.name}</p>
//             </div>
            
//             <div className="flex items-center justify-center space-x-8 max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-xl">
//               {['beginner', 'intermediate', 'advanced'].map((level, index) => {
//                 const courses = coursesByLevel[level] || [];
//                 const stats = getLevelStats(courses);
//                 const isCompleted = stats.completedCourses === stats.totalCourses && stats.totalCourses > 0;
//                 const hasEnrolledCourses = stats.enrolledCourses > 0;
//                 const isUnlocked = isLevelUnlocked(level);

//                 return (
//                   <React.Fragment key={level}>
//                     <div className="text-center">
//                       <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${
//                         !isUnlocked
//                           ? 'bg-duo-gray text-white'
//                           : isCompleted 
//                           ? 'bg-duo-green text-white' 
//                           : hasEnrolledCourses 
//                           ? 'bg-duo-blue text-white' 
//                           : 'bg-duo-gray-light text-duo-gray'
//                       }`}>
//                         {!isUnlocked ? (
//                           <Lock className="w-8 h-8" />
//                         ) : isCompleted ? (
//                           <CheckCircle className="w-8 h-8" />
//                         ) : (
//                           <span className="text-2xl font-black">{stats.enrolledCourses}/{stats.totalCourses}</span>
//                         )}
//                       </div>
//                       <p className="font-black text-dark mt-3 capitalize text-lg">
//                         {level}
//                       </p>
//                       <p className="text-sm text-light font-bold mt-1">
//                         {stats.totalCourses} courses
//                       </p>
//                     </div>
                    
//                     {index < 2 && (
//                       <ArrowRight className={`w-8 h-8 ${isUnlocked ? 'text-duo-blue' : 'text-duo-gray'}`} />
//                     )}
//                   </React.Fragment>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Empty State */}
//         {allCourses.length === 0 && !coursesLoading && (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 bg-duo-gray rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
//               <BookOpen className="w-12 h-12 text-white" />
//             </div>
//             <h3 className="text-3xl font-black text-dark mb-4">
//               No {language?.name || 'language'} courses available yet
//             </h3>
//             <p className="text-light font-bold text-xl mb-8 max-w-md mx-auto">
//               New courses are being added regularly. Check back soon!
//             </p>
//             <Link
//               to="/languages"
//               className="bg-duo-green text-white px-8 py-4 rounded-2xl hover:bg-duo-green-dark transition-colors duration-200 font-black uppercase tracking-wide transform hover:scale-105 shadow-lg"
//             >
//               Choose Different Language
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LanguageLevels;


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  Search, 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  Play, 
  ArrowLeft,
  Award,
  Target,
  CheckCircle,
  Lock,
  ArrowRight,
  Globe,
  Trophy,
  Flame
} from 'lucide-react';
import Header from '../components/common/Header';
import Loading from '../components/common/Loading';

const LanguageLevels = () => {
  const { languageCode } = useParams();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  // Add getDifficultyInfo function HERE - after hooks but before queries
  const getDifficultyInfo = (difficulty) => {
    const difficultyMap = {
      'beginner': {
        color: 'from-green-400 to-green-600',
        bgColor: 'bg-green-100',
        textColor: 'text-green-600',
        icon: '🌱',
        description: 'Perfect for beginners - Start your learning journey with basic concepts and simple exercises.',
        level: 1
      },
      'intermediate': {
        color: 'from-yellow-400 to-yellow-600',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-600',
        icon: '⚡',
        description: 'Some experience recommended - Build on your knowledge with more complex topics.',
        level: 2
      },
      'advanced': {
        color: 'from-red-400 to-red-600',
        bgColor: 'bg-red-100',
        textColor: 'text-red-600',
        icon: '🔥',
        description: 'For experienced learners - Master advanced concepts and challenging exercises.',
        level: 3
      }
    };

    return difficultyMap[difficulty?.toLowerCase()] || difficultyMap['beginner'];
  };

  // Fetch courses for the specific language
  const { 
    data: coursesData, 
    isLoading: coursesLoading, 
    error: coursesError,
    refetch: refetchCourses
  } = useQuery(
    ['courses', languageCode, searchTerm],
    async () => {
      const params = new URLSearchParams({ language: languageCode });
      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }
      const response = await api.get(`/courses/?${params.toString()}`);
      return response.data;
    },
    {
      enabled: !!languageCode,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Fetch language info
  const { data: languagesData } = useQuery(
    'languages',
    async () => {
      const response = await api.get('/courses/languages/');
      return response.data;
    },
    {
      staleTime: 30 * 60 * 1000, // 30 minutes
    }
  );

  // Course enrollment mutation
  const enrollMutation = useMutation(
    (courseId) => api.post(`/courses/${courseId}/enroll/`),
    {
      onSuccess: () => {
        // Refetch courses to get updated enrollment status
        refetchCourses();
        queryClient.invalidateQueries(['progress-summary']);
      },
      onError: (error) => {
        console.error('Enrollment failed:', error);
        // Show error message to user
      }
    }
  );

  const allCourses = coursesData?.results || coursesData || [];
  const allLanguages = languagesData?.results || languagesData || [];
  const language = allLanguages.find(lang => lang.code === languageCode);

  // Group courses by difficulty level with real data
  const coursesByLevel = React.useMemo(() => {
    const grouped = {
      beginner: [],
      intermediate: [],
      advanced: []
    };

    allCourses.forEach(course => {
      const difficulty = course.difficulty?.toLowerCase() || 'beginner';
      if (grouped[difficulty]) {
        grouped[difficulty].push(course);
      }
    });

    return grouped;
  }, [allCourses]);

  const handleEnroll = async (courseId) => {
    if (enrollMutation.isLoading) return;
    enrollMutation.mutate(courseId);
  };

  const getLevelStats = (courses) => {
    const totalCourses = courses.length;
    const enrolledCourses = courses.filter(course => course.is_enrolled).length;
    const completedCourses = courses.filter(course => course.is_completed).length;
    
    return { totalCourses, enrolledCourses, completedCourses };
  };

  // Check if level is unlocked based on real user progress
  const isLevelUnlocked = (level) => {
    if (level === 'beginner') return true;
    
    const levelOrder = ['beginner', 'intermediate', 'advanced'];
    const currentLevelIndex = levelOrder.indexOf(level);
    const previousLevel = levelOrder[currentLevelIndex - 1];
    
    if (!previousLevel) return true;
    
    const previousLevelCourses = coursesByLevel[previousLevel] || [];
    const previousLevelStats = getLevelStats(previousLevelCourses);
    
    return previousLevelStats.totalCourses > 0 && 
           previousLevelStats.completedCourses === previousLevelStats.totalCourses;
  };

  if (coursesLoading) return <Loading />;

  if (coursesError) {
    return (
      <div className="min-h-screen bg-duo-gray-light">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="bg-duo-red rounded-2xl p-6 mb-8 max-w-md mx-auto shadow-xl">
            <p className="text-white text-center font-bold text-lg">
              {coursesError.message || 'Failed to load courses'}
            </p>
            <button 
              onClick={() => refetchCourses()} 
              className="mt-4 bg-white text-duo-red px-6 py-3 rounded-xl font-black text-sm hover:bg-gray-100 transition-colors block mx-auto uppercase tracking-wide"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-duo-gray-light">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Link
          to="/languages"
          className="flex items-center text-duo-blue hover:text-duo-blue font-bold mb-8 transition-colors transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Languages
        </Link>

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            {language?.flag_image ? (
              <img
                src={language.flag_image}
                alt={`${language.name} flag`}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl mr-6 animate-bounce-gentle"
              />
            ) : (
              <div className="w-20 h-20 bg-duo-green rounded-full flex items-center justify-center mr-6 shadow-xl animate-bounce-gentle">
                <span className="text-3xl text-white font-black">
                  {language?.name?.charAt(0) || '?'}
                </span>
              </div>
            )}
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-black text-dark">
                Learn {language?.name || 'Language'}
              </h1>
              <p className="text-xl text-light font-bold">Choose your starting level</p>
            </div>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {['beginner', 'intermediate', 'advanced'].map((level, levelIndex) => {
            const courses = coursesByLevel[level] || [];
            const stats = getLevelStats(courses);
            const difficultyInfo = getDifficultyInfo(level); // This will now work!
            const progressPercentage = stats.totalCourses > 0 
              ? Math.round((stats.enrolledCourses / stats.totalCourses) * 100) 
              : 0;
            const isCompleted = stats.completedCourses === stats.totalCourses && stats.totalCourses > 0;
            const hasEnrolledCourses = stats.enrolledCourses > 0;
            const isUnlocked = isLevelUnlocked(level);

            return (
              <div
                key={level}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform animate-fade-in ${
                  !isUnlocked ? 'opacity-60' : 'hover:shadow-2xl hover:scale-105'
                }`}
                style={{animationDelay: `${levelIndex * 0.2}s`}}
              >
                {/* Level Header */}
                <div className={`h-40 bg-gradient-to-r ${difficultyInfo.color} relative flex items-center justify-center`}>
                  <div className="text-center text-white">
                    <div className="text-5xl mb-3 animate-bounce-gentle">{difficultyInfo.icon}</div>
                    <h3 className="text-3xl font-black capitalize">{level}</h3>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {!isUnlocked && (
                      <div className="bg-duo-gray text-white px-4 py-2 rounded-full text-sm font-black flex items-center shadow-lg">
                        <Lock className="w-4 h-4 mr-1" />
                        Locked
                      </div>
                    )}
                    {isUnlocked && isCompleted && (
                      <div className="bg-duo-green text-white px-4 py-2 rounded-full text-sm font-black flex items-center shadow-lg">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Completed
                      </div>
                    )}
                    {isUnlocked && hasEnrolledCourses && !isCompleted && (
                      <div className="bg-duo-blue text-white px-4 py-2 rounded-full text-sm font-black flex items-center shadow-lg">
                        <Play className="w-4 h-4 mr-1" />
                        In Progress ({stats.enrolledCourses}/{stats.totalCourses})
                      </div>
                    )}
                    {isUnlocked && stats.totalCourses === 0 && (
                      <div className="bg-duo-gray text-white px-4 py-2 rounded-full text-sm font-black flex items-center shadow-lg">
                        <Lock className="w-4 h-4 mr-1" />
                        Coming Soon
                      </div>
                    )}
                  </div>
                  
                  {/* Real Progress Bar */}
                  {isUnlocked && hasEnrolledCourses && (
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-white bg-opacity-30">
                      <div 
                        className="h-2 bg-white transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  )}
                </div>

                {/* Level Content */}
                <div className="p-8">
                  <p className="text-light font-bold mb-6 text-lg leading-relaxed">
                    {difficultyInfo.description}
                  </p>

                  {/* Real Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center">
                      <div className={`w-12 h-12 ${difficultyInfo.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                        <BookOpen className={`w-6 h-6 ${difficultyInfo.textColor}`} />
                      </div>
                      <div className="text-xl font-black text-dark">
                        {stats.totalCourses}
                      </div>
                      <div className="text-sm text-light font-bold uppercase tracking-wide">Courses</div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`w-12 h-12 ${difficultyInfo.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                        <CheckCircle className={`w-6 h-6 ${difficultyInfo.textColor}`} />
                      </div>
                      <div className="text-xl font-black text-dark">
                        {stats.completedCourses}
                      </div>
                      <div className="text-sm text-light font-bold uppercase tracking-wide">Completed</div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`w-12 h-12 ${difficultyInfo.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                        <Users className={`w-6 h-6 ${difficultyInfo.textColor}`} />
                      </div>
                      <div className="text-xl font-black text-dark">
                        {stats.enrolledCourses}
                      </div>
                      <div className="text-sm text-light font-bold uppercase tracking-wide">Enrolled</div>
                    </div>
                  </div>

                  {/* Real Course Preview */}
                  {isUnlocked && courses.length > 0 && (
                    <div className="bg-duo-gray-light rounded-2xl p-6 mb-6 border-2 border-gray-200">
                      <h4 className="font-black text-dark mb-4 uppercase tracking-wide">Available Courses:</h4>
                      <div className="space-y-3">
                        {courses.slice(0, 3).map((course) => (
                          <div key={course.id} className="flex items-center justify-between">
                            <span className="text-dark font-bold truncate flex-1">{course.title}</span>
                            <div className="flex items-center ml-3">
                              {course.is_enrolled && (
                                <CheckCircle className="w-5 h-5 text-duo-green mr-2" />
                              )}
                              <Star className="w-4 h-4 text-duo-yellow mr-1" />
                              <span className="text-light font-bold">{(course.average_rating || 4.5).toFixed(1)}</span>
                            </div>
                          </div>
                        ))}
                        {courses.length > 3 && (
                          <div className="text-sm text-light font-bold">
                            +{courses.length - 3} more courses
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="mt-8">
                    {!isUnlocked ? (
                      <button
                        disabled
                        className="w-full bg-duo-gray text-white py-4 px-6 rounded-2xl font-black cursor-not-allowed uppercase tracking-wide"
                      >
                        Complete Previous Level First
                      </button>
                    ) : stats.totalCourses === 0 ? (
                      <button
                        disabled
                        className="w-full bg-duo-gray text-white py-4 px-6 rounded-2xl font-black cursor-not-allowed uppercase tracking-wide"
                      >
                        Courses Coming Soon
                      </button>
                    ) : isCompleted ? (
                      <div className="flex gap-4">
                        <Link
                          to={`/courses/${courses[0]?.id}/lessons`}
                          className="flex-1 bg-duo-gray text-white py-4 px-6 rounded-2xl hover:bg-duo-gray transition-colors font-black text-center uppercase tracking-wide transform hover:scale-105"
                        >
                          Review Content
                        </Link>
                        <div className="flex items-center bg-duo-green text-white px-4 py-2 rounded-2xl">
                          <Award className="w-6 h-6" />
                        </div>
                      </div>
                    ) : hasEnrolledCourses ? (
                      <Link
                        to={`/courses/${courses.find(c => c.is_enrolled)?.id}/lessons`}
                        className="w-full bg-duo-blue text-white py-4 px-6 rounded-2xl hover:bg-duo-blue transition-colors font-black flex items-center justify-center uppercase tracking-wide transform hover:scale-105"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Continue Learning ({progressPercentage}%)
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleEnroll(courses[0]?.id)}
                        disabled={!courses[0] || enrollMutation.isLoading}
                        className="w-full bg-duo-green text-white py-4 px-6 rounded-2xl hover:bg-duo-green-dark transition-colors font-black flex items-center justify-center uppercase tracking-wide transform hover:scale-105 shadow-lg disabled:opacity-50"
                      >
                        {enrollMutation.isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Enrolling...
                          </>
                        ) : (
                          <>
                            <ArrowRight className="w-5 h-5 mr-2" />
                            Start {level.charAt(0).toUpperCase() + level.slice(1)}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Learning Path Visualization with Real Data */}
        {allCourses.length > 0 && (
          <div className="mt-16 text-center">
            <div className="mb-8">
              <h3 className="text-3xl font-black text-dark mb-4">Your Learning Journey</h3>
              <p className="text-xl text-light font-bold">Progress through each level to master {language?.name}</p>
            </div>
            
            <div className="flex items-center justify-center space-x-8 max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-xl">
              {['beginner', 'intermediate', 'advanced'].map((level, index) => {
                const courses = coursesByLevel[level] || [];
                const stats = getLevelStats(courses);
                const isCompleted = stats.completedCourses === stats.totalCourses && stats.totalCourses > 0;
                const hasEnrolledCourses = stats.enrolledCourses > 0;
                const isUnlocked = isLevelUnlocked(level);

                return (
                  <React.Fragment key={level}>
                    <div className="text-center">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${
                        !isUnlocked
                          ? 'bg-duo-gray text-white'
                          : isCompleted 
                          ? 'bg-duo-green text-white' 
                          : hasEnrolledCourses 
                          ? 'bg-duo-blue text-white' 
                          : 'bg-duo-gray-light text-duo-gray'
                      }`}>
                        {!isUnlocked ? (
                          <Lock className="w-8 h-8" />
                        ) : isCompleted ? (
                          <CheckCircle className="w-8 h-8" />
                        ) : (
                          <span className="text-2xl font-black">{stats.enrolledCourses}/{stats.totalCourses}</span>
                        )}
                      </div>
                      <p className="font-black text-dark mt-3 capitalize text-lg">
                        {level}
                      </p>
                      <p className="text-sm text-light font-bold mt-1">
                        {stats.totalCourses} courses
                      </p>
                    </div>
                    
                    {index < 2 && (
                      <ArrowRight className={`w-8 h-8 ${isUnlocked ? 'text-duo-blue' : 'text-duo-gray'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {allCourses.length === 0 && !coursesLoading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-duo-gray rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-black text-dark mb-4">
              No {language?.name || 'language'} courses available yet
            </h3>
            <p className="text-light font-bold text-xl mb-8 max-w-md mx-auto">
              New courses are being added regularly. Check back soon!
            </p>
            <Link
              to="/languages"
              className="bg-duo-green text-white px-8 py-4 rounded-2xl hover:bg-duo-green-dark transition-colors duration-200 font-black uppercase tracking-wide transform hover:scale-105 shadow-lg"
            >
              Choose Different Language
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageLevels;
