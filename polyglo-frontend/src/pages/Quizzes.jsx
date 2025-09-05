// // // import React from 'react'
// // // import { useQuery } from 'react-query'
// // // import { useNavigate } from 'react-router-dom'
// // // import quizzesService from '../services/quizzes'
// // // import Loading from '../components/common/Loading'

// // // const Quizzes = () => {
// // //   const navigate = useNavigate()

// // //   // Fetch quizzes using react-query
// // //   const { data, isLoading, isError } = useQuery(['quizzes'], () => quizzesService.getQuizzes())

// // //   if (isLoading) return <Loading />
// // //   if (isError) return <div className="text-center p-8 text-red-600">Failed to load quizzes</div>

// // //   return (
// // //     <div className="container mx-auto px-6 py-10">
// // //       <h1 className="text-3xl font-bold mb-8 text-center">Available Quizzes</h1>
// // //       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //         {data.data.map(quiz => (
// // //           <div
// // //             key={quiz.id}
// // //             className="p-6 bg-white rounded-xl shadow-md cursor-pointer hover:shadow-xl transition-shadow"
// // //             onClick={() => navigate(`/quiz/${quiz.id}`)}
// // //           >
// // //             <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
// // //             <p className="text-gray-600 mb-4">{quiz.description || 'No description provided.'}</p>
// // //             <div className="flex justify-between text-sm text-gray-500">
// // //               <span>{quiz.questions_count || quiz.questions.length} Questions</span>
// // //               <span>{quiz.time_limit_minutes} min</span>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // export default Quizzes
// // import React from 'react';
// // import { useQuery } from 'react-query';
// // import { useNavigate } from 'react-router-dom';
// // import quizzesService from '../services/quizzes';
// // import Loading from '../components/common/Loading';

// // const Quizzes = () => {
// //   const navigate = useNavigate();

// //   const { data: quizzes, isLoading, isError } = useQuery({
// //     queryKey: ['quizzes'],
// //     queryFn: () => quizzesService.getQuizzes().then(res => res.data)
// //   });

// //   if (isLoading) return <Loading />;
// //   if (isError) return <div className="text-center p-8 text-red-600">Failed to load quizzes</div>;

// //   return (
// //     <div className="container mx-auto px-6 py-10">
// //       <h1 className="text-3xl font-bold mb-8 text-center">Available Quizzes</h1>
// //       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {quizzes.map(quiz => (
// //           <div
// //             key={quiz.id}
// //             className="p-6 bg-white rounded-xl shadow-md cursor-pointer hover:shadow-xl transition-shadow"
// //             onClick={() => navigate(`/quiz/${quiz.id}`)}
// //           >
// //             <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
// //             <p className="text-gray-600 mb-4">{quiz.description || 'No description provided.'}</p>
// //             <div className="flex justify-between text-sm text-gray-500">
// //               <span>
// //                 {(quiz.questions_count || quiz.questions?.length || '—')} Questions
// //               </span>
// //               <span>{quiz.time_limit_minutes} min</span>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Quizzes;

// import React from 'react';
// import { useQuery } from 'react-query';
// import { useNavigate } from 'react-router-dom';
// import api from '../services/api';
// import Loading from '../components/common/Loading';

// const Quizzes = () => {
//   const navigate = useNavigate();

//   const { data: response, isLoading, isError, error } = useQuery(
//     'quizzes',
//     async () => {
//       const response = await api.get('/quizzes/');
//       console.log('Quiz API Response:', response.data); // Debug log
//       return response.data;
//     },
//     {
//       retry: 1,
//       onError: (error) => {
//         console.error('Error fetching quizzes:', error);
//       }
//     }
//   );

//   if (isLoading) return <Loading />;
  
//   if (isError) {
//     return (
//       <div className="text-center p-8 text-red-600">
//         <h2 className="text-xl font-bold mb-2">Failed to load quizzes</h2>
//         <p>{error?.response?.data?.error || error?.message || 'Something went wrong'}</p>
//         <button 
//           onClick={() => window.location.reload()}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   // Handle different response structures
//   let quizzes = [];
//   if (Array.isArray(response)) {
//     quizzes = response;
//   } else if (response && Array.isArray(response.results)) {
//     // Django REST Framework paginated response
//     quizzes = response.results;
//   } else if (response && Array.isArray(response.data)) {
//     // Data wrapped in 'data' property
//     quizzes = response.data;
//   } else if (response && typeof response === 'object') {
//     // If response is an object, check if it has quiz-like properties
//     console.warn('Unexpected response structure:', response);
//     quizzes = [];
//   }

//   if (!Array.isArray(quizzes) || quizzes.length === 0) {
//     return (
//       <div className="container mx-auto px-6 py-10">
//         <h1 className="text-3xl font-bold mb-8 text-center">Available Quizzes</h1>
//         <div className="text-center p-8 text-gray-600">
//           <h2 className="text-xl font-bold mb-2">No quizzes available</h2>
//           <p>Check back later for new quizzes!</p>
//           <p className="text-sm text-gray-500 mt-2">
//             Response received: {JSON.stringify(response)}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold mb-8 text-center">Available Quizzes</h1>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {quizzes.map(quiz => (
//           <div
//             key={quiz.id}
//             className="p-6 bg-white rounded-xl shadow-md cursor-pointer hover:shadow-xl transition-shadow"
//             onClick={() => navigate(`/quiz/${quiz.id}`)}
//           >
//             <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
//             <p className="text-gray-600 mb-4">{quiz.description || 'No description provided.'}</p>
//             <div className="flex justify-between text-sm text-gray-500">
//               <span>
//                 {quiz.question_count || quiz.questions?.length || 0} Questions
//               </span>
//               <span>{quiz.time_limit_minutes || 'No limit'} min</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Quizzes;


import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { BookOpen, Clock, Trophy, Target, Play, ArrowRight, Users, Star, Flame } from 'lucide-react';
import Header from '../components/common/Header';
import Loading from '../components/common/Loading';

const Quizzes = () => {
  const navigate = useNavigate();

  const { data: response, isLoading, isError, error } = useQuery(
    'quizzes',
    async () => {
      const response = await api.get('/quizzes/');
      console.log('Quiz API Response:', response.data);
      return response.data;
    },
    {
      retry: 1,
      onError: (error) => {
        console.error('Error fetching quizzes:', error);
      }
    }
  );

  if (isLoading) return <Loading />;
  
  if (isError) {
    return (
      <div className="min-h-screen bg-duo-gray-light">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center p-8 max-w-md mx-auto">
            <div className="bg-duo-red rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-black mb-4 text-white">Failed to load quizzes</h2>
              <p className="text-white font-bold mb-6">{error?.response?.data?.error || error?.message || 'Something went wrong'}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-white text-duo-red px-6 py-3 rounded-xl font-black hover:bg-gray-100 transition-colors uppercase tracking-wide transform hover:scale-105"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle different response structures
  let quizzes = [];
  if (Array.isArray(response)) {
    quizzes = response;
  } else if (response && Array.isArray(response.results)) {
    quizzes = response.results;
  } else if (response && Array.isArray(response.data)) {
    quizzes = response.data;
  } else if (response && typeof response === 'object') {
    console.warn('Unexpected response structure:', response);
    quizzes = [];
  }

  if (!Array.isArray(quizzes) || quizzes.length === 0) {
    return (
      <div className="min-h-screen bg-duo-gray-light">
        <Header />
        <div className="container mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            {/* <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-duo-purple rounded-full flex items-center justify-center animate-bounce-gentle shadow-xl">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div> */}
            <h1 className="text-4xl md:text-5xl font-black text-dark mb-6">Available Quizzes</h1>
          </div>

          {/* Empty State */}
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-duo-gray rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-black text-dark mb-4">No quizzes available</h2>
            <p className="text-light font-bold text-xl mb-8">Check back later for new quizzes!</p>
            <p className="text-sm text-light font-bold mt-4 max-w-md mx-auto">
              Response received: {JSON.stringify(response)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-duo-gray-light">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            
            <h1 className="text-4xl md:text-5xl font-black text-dark mb-6">
              Available Quizzes
            </h1>
            <p className="text-xl md:text-2xl text-light font-bold max-w-3xl mx-auto leading-relaxed">
              Test your knowledge and track your progress with our interactive quizzes
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm mb-8">
            <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-gray-200">
              <Target className="w-5 h-5 text-duo-green" />
              <span className="font-black text-dark">Instant Results</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-gray-200">
              <Trophy className="w-5 h-5 text-duo-yellow" />
              <span className="font-black text-dark">Track Progress</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-gray-200">
              <Flame className="w-5 h-5 text-duo-red" />
              <span className="font-black text-dark">Challenge Mode</span>
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {quizzes.map((quiz, index) => (
            <div
              key={quiz.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-4 border-transparent hover:border-duo-purple cursor-pointer transform hover:scale-105 animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
              onClick={() => navigate(`/quiz/${quiz.id}`)}
            >
              {/* Quiz Header */}
              <div className="h-32 bg-gradient-to-br from-duo-purple to-duo-red flex items-center justify-center relative">
                <div className="text-center text-white">
                  <Trophy className="w-8 h-8 mx-auto mb-2" />
                  <span className="text-sm font-black uppercase tracking-wide">Quiz Challenge</span>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-duo-yellow rounded-full flex items-center justify-center animate-bounce-gentle">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-black text-dark mb-3 group-hover:text-duo-purple transition-colors">
                  {quiz.title}
                </h2>
                <p className="text-light font-bold text-sm mb-6 leading-relaxed">
                  {quiz.description || 'Test your knowledge with this comprehensive quiz.'}
                </p>
                
                {/* Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-duo-blue rounded-full flex items-center justify-center mr-3">
                        <BookOpen className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-bold text-sm uppercase tracking-wide text-light">Questions</span>
                    </div>
                    <span className="font-black text-dark text-lg">
                      {quiz.question_count || quiz.questions?.length || 0}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-duo-green rounded-full flex items-center justify-center mr-3">
                        <Clock className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-bold text-sm uppercase tracking-wide text-light">Time Limit</span>
                    </div>
                    <span className="font-black text-dark text-lg">
                      {quiz.time_limit_minutes || 'No limit'} min
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-duo-purple font-black text-sm uppercase tracking-wide">
                    Start Quiz
                  </div>
                  <ArrowRight className="w-5 h-5 text-duo-purple group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
