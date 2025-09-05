// import React from 'react';
// import { useQuery } from 'react-query';
// import { useParams, useNavigate } from 'react-router-dom';
// import { 
//   BookOpen, 
//   Play, 
//   CheckCircle, 
//   Lock, 
//   Star, 
//   Award,
//   ArrowLeft,
//   Trophy
// } from 'lucide-react';
// import api from '../services/api';
// import Header from '../components/common/Header';
// import Loading from '../components/common/Loading';

// const CourseLevelProgress = () => {
//   const { levelId } = useParams();
//   const navigate = useNavigate();

//   // Fetch level progress and courses
//   const { data: levelData, isLoading } = useQuery(
//     ['level-progress', levelId],
//     async () => {
//       const response = await api.get(`/courses/levels/${levelId}/progress/`);
//       return response.data;
//     }
//   );

//   const handleCourseStart = (courseId) => {
//     navigate(`/courses/${courseId}/lessons`);
//   };

//   if (isLoading) return <Loading />;

//   const { level, courses, progress, nextLevel, certificate } = levelData;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
      
//       <div className="container mx-auto px-6 py-8">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(`/languages/${level.language.code}/levels`)}
//           className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           Back to Level Selection
//         </button>

//         {/* Level Header */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 {level.title}
//               </h1>
//               <p className="text-gray-600 mb-4">{level.description}</p>
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center text-blue-600">
//                   <BookOpen className="w-5 h-5 mr-2" />
//                   <span className="font-medium">{courses.length} Courses</span>
//                 </div>
//                 <div className="flex items-center text-green-600">
//                   <CheckCircle className="w-5 h-5 mr-2" />
//                   <span className="font-medium">
//                     {courses.filter(c => c.is_completed).length} Completed
//                   </span>
//                 </div>
//               </div>
//             </div>
            
//             {/* Progress Circle */}
//             <div className="text-center">
//               <div className="relative w-24 h-24">
//                 <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
//                   <circle
//                     cx="50"
//                     cy="50"
//                     r="40"
//                     stroke="#e5e5e5"
//                     strokeWidth="8"
//                     fill="none"
//                   />
//                   <circle
//                     cx="50"
//                     cy="50"
//                     r="40"
//                     stroke="#3b82f6"
//                     strokeWidth="8"
//                     fill="none"
//                     strokeDasharray={`${2.51 * progress.percentage} ${251 - 2.51 * progress.percentage}`}
//                     className="transition-all duration-500"
//                   />
//                 </svg>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <span className="text-2xl font-bold text-gray-900">
//                     {Math.round(progress.percentage)}%
//                   </span>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-600 mt-2">Overall Progress</p>
//             </div>
//           </div>
//         </div>

//         {/* Courses Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {courses.map((course, index) => {
//             const isLocked = index > 0 && !courses[index - 1].is_completed;
//             const isCompleted = course.is_completed;
//             const isInProgress = course.is_enrolled && !isCompleted;

//             return (
//               <div
//                 key={course.id}
//                 className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
//                   isLocked ? 'opacity-60' : 'hover:shadow-lg'
//                 }`}
//               >
//                 {/* Course Header */}
//                 <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative flex items-center justify-center">
//                   <div className="text-center text-white">
//                     <h3 className="text-lg font-bold mb-1">{course.title}</h3>
//                     <p className="text-sm opacity-90">
//                       {course.total_lessons} lessons • {course.estimated_duration} min
//                     </p>
//                   </div>
                  
//                   {/* Status Badge */}
//                   <div className="absolute top-4 right-4">
//                     {isCompleted && (
//                       <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
//                         <CheckCircle className="w-5 h-5 text-white" />
//                       </div>
//                     )}
//                     {isInProgress && (
//                       <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                         <Play className="w-5 h-5 text-white" />
//                       </div>
//                     )}
//                     {isLocked && (
//                       <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
//                         <Lock className="w-5 h-5 text-white" />
//                       </div>
//                     )}
//                   </div>
                  
//                   {/* Progress Bar */}
//                   {course.progress_percentage > 0 && (
//                     <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
//                       <div 
//                         className="h-1 bg-white transition-all duration-500"
//                         style={{ width: `${course.progress_percentage}%` }}
//                       ></div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Course Content */}
//                 <div className="p-4">
//                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                     {course.description}
//                   </p>

//                   {/* Course Stats */}
//                   {course.best_score > 0 && (
//                     <div className="flex items-center justify-between mb-4 text-sm">
//                       <div className="flex items-center text-yellow-600">
//                         <Star className="w-4 h-4 mr-1" />
//                         <span>Best Score: {course.best_score}%</span>
//                       </div>
//                       {isCompleted && (
//                         <div className="text-green-600 font-medium">
//                           ✓ Passed
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {/* Action Button */}
//                   {isLocked ? (
//                     <button
//                       disabled
//                       className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg text-sm cursor-not-allowed"
//                     >
//                       Complete Previous Course
//                     </button>
//                   ) : isCompleted ? (
//                     <button
//                       onClick={() => handleCourseStart(course.id)}
//                       className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
//                     >
//                       Review Course
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleCourseStart(course.id)}
//                       className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
//                     >
//                       {isInProgress ? 'Continue Course' : 'Start Course'}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Level Completion Section */}
//         {progress.percentage === 100 ? (
//           <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-8 text-center mb-8">
//             <Trophy className="w-16 h-16 mx-auto mb-4" />
//             <h2 className="text-3xl font-bold mb-2">Congratulations! 🎉</h2>
//             <p className="text-green-100 mb-6">
//               You have successfully completed the {level.title} level!
//             </p>
            
//             {certificate ? (
//               <button
//                 onClick={() => navigate(`/certificates/${certificate.id}`)}
//                 className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold mr-4"
//               >
//                 View Certificate
//               </button>
//             ) : (
//               <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold mr-4">
//                 Generating Certificate...
//               </button>
//             )}
            
//             {nextLevel && (
//               <button
//                 onClick={() => navigate(`/courses/level/${nextLevel.id}`)}
//                 className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800 transition-colors font-semibold"
//               >
//                 Continue to {nextLevel.title}
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="bg-blue-50 rounded-2xl p-8 text-center">
//             <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">Keep Learning!</h3>
//             <p className="text-gray-600 mb-4">
//               Complete all courses to unlock your {level.title} certificate
//             </p>
//             <div className="bg-white rounded-lg p-4 max-w-md mx-auto">
//               <div className="flex justify-between text-sm text-gray-600 mb-2">
//                 <span>Progress</span>
//                 <span>{Math.round(progress.percentage)}%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="bg-blue-600 h-2 rounded-full transition-all duration-500"
//                   style={{ width: `${progress.percentage}%` }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseLevelProgress;


import React from 'react';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Lock, 
  Star, 
  Award,
  ArrowLeft,
  Trophy,
  Flame,
  Target,
  Clock
} from 'lucide-react';
import api from '../services/api';
import Header from '../components/common/Header';
import Loading from '../components/common/Loading';

const CourseLevelProgress = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();

  // Fetch level progress and courses
  const { data: levelData, isLoading } = useQuery(
    ['level-progress', levelId],
    async () => {
      const response = await api.get(`/courses/levels/${levelId}/progress/`);
      return response.data;
    }
  );

  const handleCourseStart = (courseId) => {
    navigate(`/courses/${courseId}/lessons`);
  };

  if (isLoading) return <Loading />;

  const { level, courses, progress, nextLevel, certificate } = levelData;

  return (
    <div className="min-h-screen bg-duo-gray-light">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/languages/${level.language.code}/levels`)}
          className="flex items-center text-duo-blue hover:text-duo-blue font-black mb-8 transition-all transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Level Selection
        </button>

        {/* Level Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-dark mb-3">
                {level.title}
              </h1>
              <p className="text-xl text-light font-bold mb-6">{level.description}</p>
              <div className="flex items-center space-x-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-duo-blue rounded-full flex items-center justify-center mr-3">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-black text-dark text-lg">{courses.length} Courses</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-duo-green rounded-full flex items-center justify-center mr-3">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-black text-dark text-lg">
                    {courses.filter(c => c.is_completed).length} Completed
                  </span>
                </div>
              </div>
            </div>
            
            {/* Progress Circle */}
            <div className="text-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f7f7f7"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#58cc02"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2.51 * progress.percentage} ${251 - 2.51 * progress.percentage}`}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-black text-dark">
                    {Math.round(progress.percentage)}%
                  </span>
                </div>
              </div>
              <p className="text-light font-bold mt-3 uppercase tracking-wide">Overall Progress</p>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {courses.map((course, index) => {
            const isLocked = index > 0 && !courses[index - 1].is_completed;
            const isCompleted = course.is_completed;
            const isInProgress = course.is_enrolled && !isCompleted;

            return (
              <div
                key={course.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform animate-fade-in ${
                  isLocked ? 'opacity-60' : 'hover:shadow-xl hover:scale-105'
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Course Header */}
                <div className="h-40 bg-gradient-to-r from-duo-blue to-duo-purple relative flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-black mb-2">{course.title}</h3>
                    <p className="text-sm opacity-90 font-bold">
                      {course.total_lessons} lessons • {course.estimated_duration} min
                    </p>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {isCompleted && (
                      <div className="w-10 h-10 bg-duo-green rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    )}
                    {isInProgress && (
                      <div className="w-10 h-10 bg-duo-yellow rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    )}
                    {isLocked && (
                      <div className="w-10 h-10 bg-duo-gray rounded-full flex items-center justify-center shadow-lg">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  {course.progress_percentage > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-white bg-opacity-30">
                      <div 
                        className="h-2 bg-white transition-all duration-500"
                        style={{ width: `${course.progress_percentage}%` }}
                      ></div>
                    </div>
                  )}

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-duo-yellow rounded-full flex items-center justify-center animate-bounce-gentle">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <p className="text-light font-bold text-sm mb-6 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Course Stats */}
                  {course.best_score > 0 && (
                    <div className="flex items-center justify-between mb-6 p-3 bg-duo-gray-light rounded-xl">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-duo-yellow rounded-full flex items-center justify-center mr-2">
                          <Star className="w-3 h-3 text-white" />
                        </div>
                        <span className="font-bold text-dark">Best Score: {course.best_score}%</span>
                      </div>
                      {isCompleted && (
                        <div className="bg-duo-green text-white px-3 py-1 rounded-full text-sm font-black">
                          ✓ Passed
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Button */}
                  {isLocked ? (
                    <button
                      disabled
                      className="w-full bg-duo-gray text-white py-4 px-6 rounded-2xl font-black cursor-not-allowed uppercase tracking-wide"
                    >
                      Complete Previous Course
                    </button>
                  ) : isCompleted ? (
                    <button
                      onClick={() => handleCourseStart(course.id)}
                      className="w-full bg-duo-green text-white py-4 px-6 rounded-2xl hover:bg-duo-green-dark transition-colors font-black uppercase tracking-wide transform hover:scale-105"
                    >
                      Review Course
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCourseStart(course.id)}
                      className="w-full bg-duo-blue text-white py-4 px-6 rounded-2xl hover:bg-duo-blue transition-colors font-black uppercase tracking-wide transform hover:scale-105 shadow-lg"
                    >
                      {isInProgress ? 'Continue Course' : 'Start Course'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Level Completion Section */}
        {progress.percentage === 100 ? (
          <div className="bg-gradient-to-r from-duo-green to-duo-green-dark text-white rounded-2xl p-12 text-center mb-8 shadow-xl">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-black mb-4">Congratulations! 🎉</h2>
            <p className="text-green-100 font-bold text-xl mb-8 max-w-2xl mx-auto">
              You have successfully completed the {level.title} level! You're one step closer to mastering this language.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {certificate ? (
                <button
                  onClick={() => navigate(`/certificates/${certificate.id}`)}
                  className="bg-white text-duo-green px-8 py-4 rounded-2xl hover:bg-gray-100 transition-colors font-black uppercase tracking-wide transform hover:scale-105 shadow-lg"
                >
                  <Award className="w-5 h-5 inline mr-2" />
                  View Certificate
                </button>
              ) : (
                <button className="bg-white text-duo-green px-8 py-4 rounded-2xl font-black uppercase tracking-wide shadow-lg">
                  <Clock className="w-5 h-5 inline mr-2" />
                  Generating Certificate...
                </button>
              )}
              
              {nextLevel && (
                <button
                  onClick={() => navigate(`/courses/level/${nextLevel.id}`)}
                  className="bg-duo-blue text-white px-8 py-4 rounded-2xl hover:bg-duo-blue transition-colors font-black uppercase tracking-wide transform hover:scale-105 shadow-lg"
                >
                  <Target className="w-5 h-5 inline mr-2" />
                  Continue to {nextLevel.title}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-xl border border-gray-200">
            <div className="w-20 h-20 bg-duo-blue rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
              <Flame className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-black text-dark mb-4">Keep Learning!</h3>
            <p className="text-light font-bold text-xl mb-8 max-w-md mx-auto">
              Complete all courses to unlock your {level.title} certificate
            </p>
            <div className="bg-duo-gray-light rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex justify-between text-light font-bold mb-3">
                <span>Progress</span>
                <span>{Math.round(progress.percentage)}%</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-4">
                <div
                  className="bg-duo-green h-4 rounded-full transition-all duration-500"
                  style={{ width: `${progress.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseLevelProgress;
