// // // import React from 'react';
// // // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // // import { QueryClient, QueryClientProvider } from 'react-query';
// // // import { Toaster } from 'react-hot-toast';
// // // import { AuthProvider } from './context/AuthContext';
// // // import ProtectedRoute from './components/common/ProtectedRoute';
// // // import './assets/css/index.css'

// // // // Pages
// // // import Home from './pages/Home';
// // // import Login from './pages/Login';
// // // import Signup from './pages/Signup';
// // // import Dashboard from './pages/Dashboard';
// // // import Courses from './pages/Courses';
// // // import LessonView from './pages/LessonView';
// // // import Quiz from './pages/Quiz';
// // // import Profile from './pages/Profile';

// // // const queryClient = new QueryClient();

// // // function App() {
// // //   return (
// // //     <QueryClientProvider client={queryClient}>
// // //       <AuthProvider>
// // //         <Router>
// // //           <div className="App">
// // //             <Routes>
// // //               <Route path="/" element={<Home />} />
// // //               <Route path="/login" element={<Login />} />
// // //               <Route path="/signup" element={<Signup />} />
// // //               <Route path="/dashboard" element={
// // //                 <ProtectedRoute>
// // //                   <Dashboard />
// // //                 </ProtectedRoute>
// // //               } />
// // //               <Route path="/courses" element={
// // //                 <ProtectedRoute>
// // //                   <Courses />
// // //                 </ProtectedRoute>
// // //               } />
// // //               <Route path="/lessons/:id" element={
// // //                 <ProtectedRoute>
// // //                   <LessonView />
// // //                 </ProtectedRoute>
// // //               } />
// // //               <Route path="/quiz/:id" element={
// // //                 <ProtectedRoute>
// // //                   <Quiz />
// // //                 </ProtectedRoute>
// // //               } />
// // //               <Route path="/profile" element={
// // //                 <ProtectedRoute>
// // //                   <Profile />
// // //                 </ProtectedRoute>
// // //               } />
// // //             </Routes>
// // //             <Toaster 
// // //               position="top-right"
// // //               toastOptions={{
// // //                 duration: 4000,
// // //                 style: {
// // //                   background: '#363636',
// // //                   color: '#fff',
// // //                 },
// // //               }}
// // //             />
// // //           </div>
// // //         </Router>
// // //       </AuthProvider>
// // //     </QueryClientProvider>
// // //   );
// // // }

// // // export default App;
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import { QueryClient, QueryClientProvider } from 'react-query';
// // import { Toaster } from 'react-hot-toast';
// // import { AuthProvider } from './context/AuthContext';
// // import ProtectedRoute from './components/common/ProtectedRoute';
// // import './assets/css/index.css'

// // // Pages
// // import Home from './pages/Home';
// // import Login from './pages/Login';
// // import Signup from './pages/Signup';
// // import Dashboard from './pages/Dashboard';
// // import Courses from './pages/Courses';
// // import CourseLessons from './pages/CourseLessons';
// // import LessonView from './pages/LessonView';
// // import Quiz from './pages/Quiz';
// // import Profile from './pages/Profile';
// // import Quizzes from './pages/Quizzes'


// // const queryClient = new QueryClient({
// //   defaultOptions: {
// //     queries: {
// //       retry: 1,
// //       refetchOnWindowFocus: false,
// //     },
// //   },
// // });

// // function App() {
// //   return (
// //     <QueryClientProvider client={queryClient}>
// //       <AuthProvider>
// //         <Router>
// //           <div className="App min-h-screen">
// //             <Routes>
// //               <Route path="/" element={<Home />} />
// //               <Route path="/login" element={<Login />} />
// //               <Route path="/signup" element={<Signup />} />
              
// //               {/* Protected Routes */}
// //               <Route path="/dashboard" element={
// //                 <ProtectedRoute>
// //                   <Dashboard />
// //                 </ProtectedRoute>
// //               } />
              
// //               <Route path="/courses" element={
// //                 <ProtectedRoute>
// //                   <Courses />
// //                 </ProtectedRoute>
// //               } />
              
// //               <Route path="/courses/:courseId/lessons" element={
// //                 <ProtectedRoute>
// //                   <CourseLessons />
// //                 </ProtectedRoute>
// //               } />
              
// //               <Route path="/lessons/:id" element={
// //                 <ProtectedRoute>
// //                   <LessonView />
// //                 </ProtectedRoute>
// //               } />
              
// //               <Route path="/quiz" element={
// //                 <ProtectedRoute>
// //                   <Quizzes />
// //                 </ProtectedRoute>
// //               } />
              
// //               <Route path="/profile" element={
// //                 <ProtectedRoute>
// //                   <Profile />
// //                 </ProtectedRoute>
// //               } />

// //               {/* Placeholder routes for quick actions */}
// //               <Route path="/practice" element={
// //                 <ProtectedRoute>
// //                   <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //                     <div className="text-center">
// //                       <h1 className="text-2xl font-bold text-gray-900 mb-4">Practice Mode</h1>
// //                       <p className="text-gray-600">Coming soon!</p>
// //                     </div>
// //                   </div>
// //                 </ProtectedRoute>
// //               } />
              
// //               <Route path="/flashcards" element={
// //                 <ProtectedRoute>
// //                   <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //                     <div className="text-center">
// //                       <h1 className="text-2xl font-bold text-gray-900 mb-4">Flashcards</h1>
// //                       <p className="text-gray-600">Coming soon!</p>
// //                     </div>
// //                   </div>
// //                 </ProtectedRoute>
// //               } />
              
// //               <Route path="/quiz" element={
// //                 <ProtectedRoute>
// //                   <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //                     <div className="text-center">
// //                       <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz Mode</h1>
// //                       <p className="text-gray-600">Coming soon!</p>
// //                     </div>
// //                   </div>
// //                 </ProtectedRoute>
// //               } />
              
// //               <Route path="/community" element={
// //                 <ProtectedRoute>
// //                   <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //                     <div className="text-center">
// //                       <h1 className="text-2xl font-bold text-gray-900 mb-4">Community</h1>
// //                       <p className="text-gray-600">Coming soon!</p>
// //                     </div>
// //                   </div>
// //                 </ProtectedRoute>
// //               } />
              
// //               {/* 404 Route */}
// //               <Route path="*" element={
// //                 <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //                   <div className="text-center">
// //                     <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
// //                     <p className="text-gray-600 mb-6">Page not found</p>
// //                     <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
// //                       Go Home
// //                     </a>
// //                   </div>
// //                 </div>
// //               } />
// //             </Routes>
            
// //             <Toaster 
// //               position="top-right"
// //               toastOptions={{
// //                 duration: 4000,
// //                 style: {
// //                   background: '#363636',
// //                   color: '#fff',
// //                 },
// //                 success: {
// //                   style: {
// //                     background: '#10b981',
// //                   },
// //                 },
// //                 error: {
// //                   style: {
// //                     background: '#ef4444',
// //                   },
// //                 },
// //               }}
// //             />
// //           </div>
// //         </Router>
// //       </AuthProvider>
// //     </QueryClientProvider>
// //   );
// // }

// // export default App;

// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import { QueryClient, QueryClientProvider } from 'react-query';
// // import { Toaster } from 'react-hot-toast';
// // import { AuthProvider } from './context/AuthContext';
// // import ProtectedRoute from './components/common/ProtectedRoute';
// // import './assets/css/index.css'

// // // Pages
// // import Home from './pages/Home';
// // import Login from './pages/Login';
// // import Signup from './pages/Signup';
// // import Dashboard from './pages/Dashboard';
// // import Courses from './pages/Courses';
// // import CourseLessons from './pages/CourseLessons';
// // import LessonView from './pages/LessonView';
// // import Quiz from './pages/Quiz';
// // import Profile from './pages/Profile';
// // import Quizzes from './pages/Quizzes';
// // import QuizResults from './components/quizzes/QuizResults'; // Added this import

// // const queryClient = new QueryClient({
// //   defaultOptions: {
// //     queries: {
// //       retry: 1,
// //       refetchOnWindowFocus: false,
// //       staleTime: 5 * 60 * 1000, // 5 minutes
// //     },
// //   },
// // });

// // function App() {
// //   return (
// //     <QueryClientProvider client={queryClient}>
// //       <AuthProvider>
// //         <Router>
// //           <div className="App min-h-screen">
// //             <Routes>
// //               <Route path="/" element={<Home />} />
// //               <Route path="/login" element={<Login />} />
// //               <Route path="/signup" element={<Signup />} />
              
// //               {/* Protected Routes */}
// //               <Route path="/dashboard" element={
// //                 <ProtectedRoute>
// //                   <Dashboard />
// //                 </ProtectedRoute>
// //               } />
              
// //               <Route path="/courses" element={
// //                 <ProtectedRoute>
// //                   <Courses />
// //                 </ProtectedRoute>
// //               } />
              
// //               <Route path="/courses/:courseId/lessons" element={
// //                 <ProtectedRoute>
// //                   <CourseLessons />
// //                 </ProtectedRoute>
// //               } />
              
// //               <Route path="/lessons/:id" element={
// //                 <ProtectedRoute>
// //                   <LessonView />
// //                 </ProtectedRoute>
// //               } />
              
// //               {/* Quiz Routes */}
// //               <Route path="/quizzes" element={
// //                 <ProtectedRoute>
// //                   <Quizzes />
// //                 </ProtectedRoute>
// //               } />
              
// //               <Route path="/quiz/:id" element={
// //                 <ProtectedRoute>
// //                   <Quiz />
// //                 </ProtectedRoute>
// //               } />
              
// //               {/* Quiz Results Route - Added this */}
// //               <Route path="/quiz-results" element={
// //                 <ProtectedRoute>
// //                   <QuizResults />
// //                 </ProtectedRoute>
// //               } />
              
// //               <Route path="/profile" element={
// //                 <ProtectedRoute>
// //                   <Profile />
// //                 </ProtectedRoute>
// //               } />

// //               {/* Placeholder routes for quick actions */}
// //               <Route path="/practice" element={
// //                 <ProtectedRoute>
// //                   <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //                     <div className="text-center">
// //                       <h1 className="text-2xl font-bold text-gray-900 mb-4">Practice Mode</h1>
// //                       <p className="text-gray-600">Coming soon!</p>
// //                     </div>
// //                   </div>
// //                 </ProtectedRoute>
// //               } />
              
// //               <Route path="/flashcards" element={
// //                 <ProtectedRoute>
// //                   <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //                     <div className="text-center">
// //                       <h1 className="text-2xl font-bold text-gray-900 mb-4">Flashcards</h1>
// //                       <p className="text-gray-600">Coming soon!</p>
// //                     </div>
// //                   </div>
// //                 </ProtectedRoute>
// //               } />
              
// //               <Route path="/community" element={
// //                 <ProtectedRoute>
// //                   <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //                     <div className="text-center">
// //                       <h1 className="text-2xl font-bold text-gray-900 mb-4">Community</h1>
// //                       <p className="text-gray-600">Coming soon!</p>
// //                     </div>
// //                   </div>
// //                 </ProtectedRoute>
// //               } />
              
// //               {/* 404 Route */}
// //               <Route path="*" element={
// //                 <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //                   <div className="text-center">
// //                     <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
// //                     <p className="text-gray-600 mb-6">Page not found</p>
// //                     <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
// //                       Go Home
// //                     </a>
// //                   </div>
// //                 </div>
// //               } />
// //             </Routes>
            
// //             <Toaster 
// //               position="top-right"
// //               toastOptions={{
// //                 duration: 4000,
// //                 style: {
// //                   background: '#363636',
// //                   color: '#fff',
// //                 },
// //                 success: {
// //                   style: {
// //                     background: '#10b981',
// //                   },
// //                 },
// //                 error: {
// //                   style: {
// //                     background: '#ef4444',
// //                   },
// //                 },
// //               }}
// //             />
// //           </div>
// //         </Router>
// //       </AuthProvider>
// //     </QueryClientProvider>
// //   );
// // }

// // export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/common/ProtectedRoute';
// import './assets/css/index.css'

// // Pages
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import Courses from './pages/Courses';
// import CourseLessons from './pages/CourseLessons';
// import LessonView from './pages/LessonView';
// import Quiz from './pages/Quiz';
// import Profile from './pages/Profile';
// import Quizzes from './pages/Quizzes';
// import QuizResults from './components/quizzes/QuizResults';
// import ProgressDashboard from './components/progress/ProgressDashboard'; // Added progress dashboard import
// import LanguageSelection from './pages/LanguageSelection';
// import LevelSelection from './pages/LevelSelection';
// import CourseLevelProgress from './pages/CourseLevelProgress';
// import Certificate from './components/certificates/Certificate';
// import Languages from './pages/Languages';
// import LanguageLevels from './pages/LanguageLevels';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1,
//       refetchOnWindowFocus: false,
//       staleTime: 5 * 60 * 1000, // 5 minutes
//     },
//   },
// });

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <Router>
//           <div className="App min-h-screen">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
              
//               {/* Protected Routes */}
//               <Route path="/dashboard" element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               } />
              
//               {/* Language Learning Routes */}
//               <Route path="/languages" element={<Languages />} />
//               <Route path="/languages/:languageCode/levels" element={<LanguageLevels />} />

//               <Route path="/courses/level/:levelId" element={
//                 <ProtectedRoute>
//                   <CourseLevelProgress />
//                 </ProtectedRoute>
//               } />

//               <Route path="/certificates/:certificateId" element={
//                 <ProtectedRoute>
//                   <Certificate />
//                 </ProtectedRoute>
//               } />

//               <Route path="/courses" element={
//                 <ProtectedRoute>
//                   <Courses />
//                 </ProtectedRoute>
//               } />
              
//               <Route path="/courses/:courseId/lessons" element={
//                 <ProtectedRoute>
//                   <CourseLessons />
//                 </ProtectedRoute>
//               } />
              
//               <Route path="/lessons/:id" element={
//                 <ProtectedRoute>
//                   <LessonView />
//                 </ProtectedRoute>
//               } />
              
//               {/* Quiz Routes */}
//               <Route path="/quizzes" element={
//                 <ProtectedRoute>
//                   <Quizzes />
//                 </ProtectedRoute>
//               } />
              
//               <Route path="/quiz/:id" element={
//                 <ProtectedRoute>
//                   <Quiz />
//                 </ProtectedRoute>
//               } />
              
//               {/* Quiz Results Route */}
//               <Route path="/quiz-results" element={
//                 <ProtectedRoute>
//                   <QuizResults />
//                 </ProtectedRoute>
//               } />
              
//               {/* Progress Route - Added this */}
//               <Route path="/progress" element={
//                 <ProtectedRoute>
//                   <ProgressDashboard />
//                 </ProtectedRoute>
//               } />
              
//               <Route path="/profile" element={
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               } />

//               {/* Placeholder routes for quick actions */}
//               <Route path="/practice" element={
//                 <ProtectedRoute>
//                   <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                     <div className="text-center">
//                       <h1 className="text-2xl font-bold text-gray-900 mb-4">Practice Mode</h1>
//                       <p className="text-gray-600">Coming soon!</p>
//                     </div>
//                   </div>
//                 </ProtectedRoute>
//               } />
              
//               <Route path="/flashcards" element={
//                 <ProtectedRoute>
//                   <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                     <div className="text-center">
//                       <h1 className="text-2xl font-bold text-gray-900 mb-4">Flashcards</h1>
//                       <p className="text-gray-600">Coming soon!</p>
//                     </div>
//                   </div>
//                 </ProtectedRoute>
//               } />
              
//               <Route path="/community" element={
//                 <ProtectedRoute>
//                   <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                     <div className="text-center">
//                       <h1 className="text-2xl font-bold text-gray-900 mb-4">Community</h1>
//                       <p className="text-gray-600">Coming soon!</p>
//                     </div>
//                   </div>
//                 </ProtectedRoute>
//               } />
              
//               {/* 404 Route */}
//               <Route path="*" element={
//                 <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                   <div className="text-center">
//                     <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
//                     <p className="text-gray-600 mb-6">Page not found</p>
//                     <a href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
//                       Go Home
//                     </a>
//                   </div>
//                 </div>
//               } />
//             </Routes>
            
//             <Toaster 
//               position="top-right"
//               toastOptions={{
//                 duration: 4000,
//                 style: {
//                   background: '#363636',
//                   color: '#fff',
//                 },
//                 success: {
//                   style: {
//                     background: '#10b981',
//                   },
//                 },
//                 error: {
//                   style: {
//                     background: '#ef4444',
//                   },
//                 },
//               }}
//             />
//           </div>
//         </Router>
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/common/ProtectedRoute';
// import ErrorBoundary from './components/common/ErrorBoundary';
// import './assets/css/index.css';

// // Pages
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import Courses from './pages/Courses';
// import CourseLessons from './pages/CourseLessons';
// import LessonView from './pages/LessonView';
// import Quiz from './pages/Quiz';
// import Profile from './pages/Profile';
// import Quizzes from './pages/Quizzes';
// import QuizResults from './components/quizzes/QuizResults';
// import ProgressDashboard from './components/progress/ProgressDashboard';
// import Languages from './pages/Languages';
// import LanguageLevels from './pages/LanguageLevels';
// import CourseLevelProgress from './pages/CourseLevelProgress';
// import Certificate from './components/certificates/Certificate'

// // Additional components for better UX
// import NotFound from './components/common/NotFound';
// import ComingSoon from './components/common/ComingSoon';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1,
//       refetchOnWindowFocus: true,
//       staleTime: 5 * 60 * 1000, // 5 minutes
//       cacheTime: 10 * 60 * 1000, // 10 minutes
//     },
//     mutations: {
//       retry: 1,
//     },
//   },
// });

// // Global error handler for React Query
// queryClient.setMutationDefaults(['courses', 'enroll'], {
//   mutationFn: async ({ courseId }) => {
//     const { coursesAPI } = await import('./services/api');
//     return coursesAPI.enrollCourse(courseId);
//   },
// });

// function App() {
//   // Listen for auth logout events from API service
//   React.useEffect(() => {
//     const handleAuthLogout = () => {
//       queryClient.clear(); // Clear all cached data on logout
//     };

//     window.addEventListener('auth:logout', handleAuthLogout);
//     return () => window.removeEventListener('auth:logout', handleAuthLogout);
//   }, []);
  
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ErrorBoundary>
//         <AuthProvider>
//           <Router>
//             <div className="App min-h-screen">
//               <Routes>
//                 {/* Public Routes */}
//                 <Route path="/" element={<Home />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<Signup />} />
                
//                 {/* Language Selection Routes (Public - for language browsing) */}
//                 <Route path="/languages" element={<Languages />} />
//                 <Route path="/languages/:languageCode/levels" element={<LanguageLevels />} />
                
//                 {/* Protected Dashboard */}
//                 <Route path="/dashboard" element={
//                   <ProtectedRoute>
//                     <Dashboard />
//                   </ProtectedRoute>
//                 } />
                
//                 {/* Course Routes */}
//                 <Route path="/courses" element={
//                   <ProtectedRoute>
//                     <Courses />
//                   </ProtectedRoute>
//                 } />
                
//                 <Route path="/courses/:courseId" element={
//                   <ProtectedRoute>
//                     <CourseLessons />
//                   </ProtectedRoute>
//                 } />
                
//                 <Route path="/courses/:courseId/lessons" element={
//                   <ProtectedRoute>
//                     <CourseLessons />
//                   </ProtectedRoute>
//                 } />
                
//                 {/* Lesson Routes */}
//                 <Route path="/lessons/:id" element={
//                   <ProtectedRoute>
//                     <LessonView />
//                   </ProtectedRoute>
//                 } />
                
//                 {/* Quiz Routes */}
//                 <Route path="/quizzes" element={
//                   <ProtectedRoute>
//                     <Quizzes />
//                   </ProtectedRoute>
//                 } />
                
//                 <Route path="/quiz/:id" element={
//                   <ProtectedRoute>
//                     <Quiz />
//                   </ProtectedRoute>
//                 } />
                
//                 <Route path="/quiz-results" element={
//                   <ProtectedRoute>
//                     <QuizResults />
//                   </ProtectedRoute>
//                 } />
                
//                 {/* Progress and Profile Routes */}
//                 <Route path="/progress" element={
//                   <ProtectedRoute>
//                     <ProgressDashboard />
//                   </ProtectedRoute>
//                 } />
                
//                 <Route path="/profile" element={
//                   <ProtectedRoute>
//                     <Profile />
//                   </ProtectedRoute>
//                 } />
                
//                 {/* Level and Certificate Routes */}
//                 <Route path="/levels/:levelId" element={
//                   <ProtectedRoute>
//                     <CourseLevelProgress />
//                   </ProtectedRoute>
//                 } />
                
//                 <Route path="/certificates/:certificateId" element={
//                   <ProtectedRoute>
//                     <Certificate />
//                   </ProtectedRoute>
//                 } />
                
//                 {/* Practice and Learning Tools */}
//                 <Route path="/practice" element={
//                   <ProtectedRoute>
//                     <ComingSoon 
//                       title="Practice Mode" 
//                       description="Interactive practice sessions are coming soon! Master your skills with targeted exercises."
//                       icon="🎯"
//                     />
//                   </ProtectedRoute>
//                 } />
                
//                 <Route path="/flashcards" element={
//                   <ProtectedRoute>
//                     <ComingSoon 
//                       title="Flashcards" 
//                       description="Smart flashcard system to help you memorize vocabulary and concepts effectively."
//                       icon="🃏"
//                     />
//                   </ProtectedRoute>
//                 } />
                
//                 <Route path="/community" element={
//                   <ProtectedRoute>
//                     <ComingSoon 
//                       title="Community" 
//                       description="Connect with fellow learners, share progress, and learn together!"
//                       icon="🌍"
//                     />
//                   </ProtectedRoute>
//                 } />
                
//                 <Route path="/leaderboard" element={
//                   <ProtectedRoute>
//                     <ComingSoon 
//                       title="Leaderboard" 
//                       description="Compete with friends and see how you rank among other learners!"
//                       icon="🏆"
//                     />
//                   </ProtectedRoute>
//                 } />
                
//                 <Route path="/achievements" element={
//                   <ProtectedRoute>
//                     <ComingSoon 
//                       title="Achievements" 
//                       description="Unlock badges and celebrate your learning milestones!"
//                       icon="🎖️"
//                     />
//                   </ProtectedRoute>
//                 } />
                
//                 {/* Settings and Help */}
//                 <Route path="/settings" element={
//                   <ProtectedRoute>
//                     <ComingSoon 
//                       title="Settings" 
//                       description="Customize your learning experience and preferences."
//                       icon="⚙️"
//                     />
//                   </ProtectedRoute>
//                 } />
                
//                 <Route path="/help" element={
//                   <ComingSoon 
//                     title="Help Center" 
//                     description="Get answers to your questions and learn how to use the platform effectively."
//                     icon="❓"
//                   />
//                 } />
                
//                 {/* 404 Route */}
//                 <Route path="*" element={<NotFound />} />
                
//               </Routes>
              
//               {/* Enhanced Toast Configuration */}
//               <Toaster 
//                 position="top-right"
//                 toastOptions={{
//                   duration: 4000,
//                   style: {
//                     background: '#363636',
//                     color: '#fff',
//                     fontWeight: 'bold',
//                     borderRadius: '12px',
//                     padding: '16px',
//                   },
//                   success: {
//                     style: {
//                       background: '#58cc02', // Duolingo green
//                     },
//                     iconTheme: {
//                       primary: '#fff',
//                       secondary: '#58cc02',
//                     },
//                   },
//                   error: {
//                     style: {
//                       background: '#ff4b4b', // Duolingo red
//                     },
//                     iconTheme: {
//                       primary: '#fff',
//                       secondary: '#ff4b4b',
//                     },
//                   },
//                   loading: {
//                     style: {
//                       background: '#1cb0f6', // Duolingo blue
//                     },
//                   },
//                 }}
//               />
//             </div>
//           </Router>
//         </AuthProvider>
//       </ErrorBoundary>
      
      
//     </QueryClientProvider>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'; // ✅ Back to old import
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import './assets/css/index.css';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseLessons from './pages/CourseLessons';
import LessonView from './pages/LessonView';
import Quiz from './pages/Quiz';
import Profile from './pages/Profile';
import Quizzes from './pages/Quizzes';
import QuizResults from './components/quizzes/QuizResults';
import ProgressDashboard from './components/progress/ProgressDashboard';
import Languages from './pages/Languages';
import LanguageLevels from './pages/LanguageLevels';
import CourseLevelProgress from './pages/CourseLevelProgress';
import Certificate from './components/certificates/Certificate';

// Additional components for better UX
import NotFound from './components/common/NotFound';
import ComingSoon from './components/common/ComingSoon';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes - OLD PROPERTY NAME
    },
    mutations: {
      retry: 1,
    },
  },
});

// Global error handler for React Query
queryClient.setMutationDefaults(['courses', 'enroll'], {
  mutationFn: async ({ courseId }) => {
    const { coursesAPI } = await import('./services/api');
    return coursesAPI.enrollCourse(courseId);
  },
});

function App() {
  // Listen for auth logout events from API service
  React.useEffect(() => {
    const handleAuthLogout = () => {
      queryClient.clear(); // Clear all cached data on logout
    };

    window.addEventListener('auth:logout', handleAuthLogout);
    return () => window.removeEventListener('auth:logout', handleAuthLogout);
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AuthProvider>
          <Router>
            <div className="App min-h-screen">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Language Selection Routes (Public - for language browsing) */}
                <Route path="/languages" element={<Languages />} />
                <Route path="/languages/:languageCode/levels" element={<LanguageLevels />} />
                
                {/* Protected Dashboard */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                
                {/* Course Routes */}
                <Route path="/courses" element={
                  <ProtectedRoute>
                    <Courses />
                  </ProtectedRoute>
                } />
                
                <Route path="/courses/:courseId" element={
                  <ProtectedRoute>
                    <CourseLessons />
                  </ProtectedRoute>
                } />
                
                <Route path="/courses/:courseId/lessons" element={
                  <ProtectedRoute>
                    <CourseLessons />
                  </ProtectedRoute>
                } />
                
                {/* Lesson Routes */}
                <Route path="/lessons/:id" element={
                  <ProtectedRoute>
                    <LessonView />
                  </ProtectedRoute>
                } />
                
                {/* Quiz Routes */}
                <Route path="/quizzes" element={
                  <ProtectedRoute>
                    <Quizzes />
                  </ProtectedRoute>
                } />
                
                <Route path="/quiz/:id" element={
                  <ProtectedRoute>
                    <Quiz />
                  </ProtectedRoute>
                } />
                
                <Route path="/quiz-results" element={
                  <ProtectedRoute>
                    <QuizResults />
                  </ProtectedRoute>
                } />
                
                {/* Progress and Profile Routes */}
                <Route path="/progress" element={
                  <ProtectedRoute>
                    <ProgressDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                
                {/* Level and Certificate Routes */}
                <Route path="/levels/:levelId" element={
                  <ProtectedRoute>
                    <CourseLevelProgress />
                  </ProtectedRoute>
                } />
                
                <Route path="/certificates/:certificateId" element={
                  <ProtectedRoute>
                    <Certificate />
                  </ProtectedRoute>
                } />
                
                {/* Practice and Learning Tools */}
                <Route path="/practice" element={
                  <ProtectedRoute>
                    <ComingSoon 
                      title="Practice Mode" 
                      description="Interactive practice sessions are coming soon! Master your skills with targeted exercises."
                      icon="🎯"
                    />
                  </ProtectedRoute>
                } />
                
                <Route path="/flashcards" element={
                  <ProtectedRoute>
                    <ComingSoon 
                      title="Flashcards" 
                      description="Smart flashcard system to help you memorize vocabulary and concepts effectively."
                      icon="🃏"
                    />
                  </ProtectedRoute>
                } />
                
                <Route path="/community" element={
                  <ProtectedRoute>
                    <ComingSoon 
                      title="Community" 
                      description="Connect with fellow learners, share progress, and learn together!"
                      icon="🌍"
                    />
                  </ProtectedRoute>
                } />
                
                <Route path="/leaderboard" element={
                  <ProtectedRoute>
                    <ComingSoon 
                      title="Leaderboard" 
                      description="Compete with friends and see how you rank among other learners!"
                      icon="🏆"
                    />
                  </ProtectedRoute>
                } />
                
                <Route path="/achievements" element={
                  <ProtectedRoute>
                    <ComingSoon 
                      title="Achievements" 
                      description="Unlock badges and celebrate your learning milestones!"
                      icon="🎖️"
                    />
                  </ProtectedRoute>
                } />
                
                {/* Settings and Help */}
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <ComingSoon 
                      title="Settings" 
                      description="Customize your learning experience and preferences."
                      icon="⚙️"
                    />
                  </ProtectedRoute>
                } />
                
                <Route path="/help" element={
                  <ComingSoon 
                    title="Help Center" 
                    description="Get answers to your questions and learn how to use the platform effectively."
                    icon="❓"
                  />
                } />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
                
              </Routes>
              
              {/* Enhanced Toast Configuration */}
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    padding: '16px',
                  },
                  success: {
                    style: {
                      background: '#58cc02', // Duolingo green
                    },
                    iconTheme: {
                      primary: '#fff',
                      secondary: '#58cc02',
                    },
                  },
                  error: {
                    style: {
                      background: '#ff4b4b', // Duolingo red
                    },
                    iconTheme: {
                      primary: '#fff',
                      secondary: '#ff4b4b',
                    },
                  },
                  loading: {
                    style: {
                      background: '#1cb0f6', // Duolingo blue
                    },
                  },
                }}
              />
            </div>
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
