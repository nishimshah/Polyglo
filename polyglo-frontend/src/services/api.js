// // // import axios from 'axios';

// // // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// // // const api = axios.create({
// // //   baseURL: API_BASE_URL,
// // //   headers: {
// // //     'Content-Type': 'application/json',
// // //   },
// // // });

// // // // Request interceptor to add auth token
// // // api.interceptors.request.use(
// // //   (config) => {
// // //     const token = localStorage.getItem('access_token');
// // //     if (token) {
// // //       config.headers.Authorization = `Bearer ${token}`;
// // //     }
// // //     return config;
// // //   },
// // //   (error) => Promise.reject(error)
// // // );

// // // // Response interceptor to handle token refresh
// // // api.interceptors.response.use(
// // //   (response) => response,
// // //   async (error) => {
// // //     const originalRequest = error.config;
    
// // //     if (error.response?.status === 401 && !originalRequest._retry) {
// // //       originalRequest._retry = true;
      
// // //       const refreshToken = localStorage.getItem('refresh_token');
// // //       if (refreshToken) {
// // //         try {
// // //           const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
// // //             refresh: refreshToken,
// // //           });
          
// // //           const { access } = response.data;
// // //           localStorage.setItem('access_token', access);
// // //           originalRequest.headers.Authorization = `Bearer ${access}`;
          
// // //           return api(originalRequest);
// // //         } catch (refreshError) {
// // //           localStorage.removeItem('access_token');
// // //           localStorage.removeItem('refresh_token');
// // //           window.location.href = '/login';
// // //         }
// // //       }
// // //     }
    
// // //     return Promise.reject(error);
// // //   }
// // // );

// // // export default api;
// // // // src/services/quizzes.js

// // import axios from 'axios';

// // // Base API URL
// // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// // // Main axios instance
// // const api = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// // // Axios instance without interceptors for token refresh to avoid recursion
// // const refreshApi = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// // // Request interceptor to add auth token
// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem('access_token');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // // Response interceptor to handle token refresh
// // api.interceptors.response.use(
// //   (response) => response,
// //   async (error) => {
// //     const originalRequest = error.config;

// //     // Prevent infinite loop
// //     if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/token/refresh/')) {
// //       originalRequest._retry = true;

// //       const refreshToken = localStorage.getItem('refresh_token');
// //       if (refreshToken) {
// //         try {
// //           const response = await refreshApi.post('/auth/token/refresh/', {
// //             refresh: refreshToken,
// //           });

// //           const { access } = response.data;
// //           localStorage.setItem('access_token', access);
// //           originalRequest.headers.Authorization = `Bearer ${access}`;

// //           return api(originalRequest); // Retry original request with new access token
// //         } catch (refreshError) {
// //           // Refresh token failed, clear tokens and redirect to login
// //           localStorage.removeItem('access_token');
// //           localStorage.removeItem('refresh_token');
// //           window.location.href = '/login';
// //         }
// //       } else {
// //         // No refresh token, clear tokens and redirect to login
// //         localStorage.removeItem('access_token');
// //         localStorage.removeItem('refresh_token');
// //         window.location.href = '/login';
// //       }
// //     }

// //     // If error is not handled above, reject it normally
// //     return Promise.reject(error);
// //   }
// // );

// // // Optional: Helper to get auth headers manually (if needed)
// // export const getAuthHeaders = () => {
// //   const token = localStorage.getItem('access_token');
// //   return token ? { Authorization: `Bearer ${token}` } : {};
// // };

// // export default api;

// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor to handle token refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       const refreshToken = localStorage.getItem('refresh_token');
//       if (refreshToken) {
//         try {
//           const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
//             refresh: refreshToken,
//           });
          
//           const { access } = response.data;
//           localStorage.setItem('access_token', access);
//           originalRequest.headers.Authorization = `Bearer ${access}`;
          
//           return api(originalRequest);
//         } catch (refreshError) {
//           localStorage.removeItem('access_token');
//           localStorage.removeItem('refresh_token');
//           window.location.href = '/login';
//         }
//       } else {
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
//         window.location.href = '/login';
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token and handle request logging
api.interceptors.request.use(
  (config) => {
    // Add auth token
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log requests in development
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      if (config.data) {
        console.log('📤 Request Data:', config.data);
      }
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh and error handling
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          console.log('🔄 Refreshing access token...');
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          originalRequest.headers.Authorization = `Bearer ${access}`;
          
          console.log('✅ Token refreshed successfully');
          return api(originalRequest);
        } catch (refreshError) {
          console.error('❌ Token refresh failed:', refreshError);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          
          // Dispatch custom event for auth error
          window.dispatchEvent(new CustomEvent('auth:logout'));
          
          // Only redirect if not already on login page
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }
      } else {
        console.log('🚫 No refresh token available');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.dispatchEvent(new CustomEvent('auth:logout'));
        
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
    
    // Log errors in development
    if (import.meta.env.DEV) {
      console.error('❌ API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data
      });
    }
    
    // Handle specific error types
    const errorMessage = error.response?.data?.error || 
                        error.response?.data?.detail || 
                        error.response?.data?.message ||
                        error.message ||
                        'An unexpected error occurred';

    // Create enhanced error object
    const enhancedError = {
      ...error,
      userMessage: errorMessage,
      status: error.response?.status,
      isNetworkError: !error.response,
      isServerError: error.response?.status >= 500,
      isClientError: error.response?.status >= 400 && error.response?.status < 500,
    };
    
    return Promise.reject(enhancedError);
  }
);

// Specific API methods for your language learning platform
export const coursesAPI = {
  // Get all courses with optional filters
  getCourses: (params = {}) => api.get('/courses/', { params }),
  
  // Get courses for a specific language
  getLanguageCourses: (languageCode) => api.get(`/courses/languages/${languageCode}/`),
  
  // Get course details
  getCourseDetails: (courseId) => api.get(`/courses/${courseId}/`),
  
  // Enroll in a course
  enrollCourse: (courseId) => api.post(`/courses/${courseId}/enroll/`),
  
  // Get course lessons
  getCourseLessons: (courseId) => api.get(`/courses/${courseId}/lessons/`),
  
  // Complete a course
  completeCourse: (courseId) => api.post(`/courses/${courseId}/complete/`),
  
  // Get user's enrolled courses
  getMyEnrollments: () => api.get('/courses/my-enrollments/'),
  
  // Get dashboard courses
  getDashboardCourses: () => api.get('/courses/dashboard/'),
};

export const languagesAPI = {
  // Get all languages
  getLanguages: () => api.get('/courses/languages/'),
  
  // Get language levels
  getLanguageLevels: (languageCode) => api.get(`/courses/languages/${languageCode}/levels/`),
};

export const progressAPI = {
  // Get progress summary
  getProgressSummary: () => api.get('/progress/summary/'),
  
  // Get weekly chart data
  getWeeklyChart: () => api.get('/progress/weekly-chart/'),
  
  // Update daily activity
  updateActivity: (data) => api.post('/progress/update-activity/', data),
};

export const authAPI = {
  // Login
  login: (credentials) => api.post('/auth/login/', credentials),
  
  // Register
  register: (userData) => api.post('/auth/register/', userData),
  
  // Get profile
  getProfile: () => api.get('/auth/profile/'),
  
  // Update profile
  updateProfile: (data) => api.patch('/auth/profile/', data),
  
  // Refresh token
  refreshToken: (refresh) => api.post('/auth/token/refresh/', { refresh }),
};

export const quizzesAPI = {
  // Get all quizzes
  getQuizzes: () => api.get('/quizzes/'),
  
  // Get quiz details
  getQuizDetails: (quizId) => api.get(`/quizzes/${quizId}/`),
  
  // Start quiz attempt
  startQuizAttempt: (quizId) => api.post(`/quizzes/${quizId}/start/`),
  
  // Submit quiz
  submitQuiz: (attemptId, data) => api.post(`/quizzes/attempts/${attemptId}/submit/`, data),
};

// Utility functions
export const apiUtils = {
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },
  
  // Clear auth tokens
  clearTokens: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
  
  // Set auth tokens
  setTokens: (access, refresh) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  },
  
  // Handle API errors consistently
  handleError: (error, showToast = true) => {
    const message = error.userMessage || 'An error occurred';
    
    if (showToast && window.showToast) {
      window.showToast(message, 'error');
    }
    
    return message;
  }
};

// Export the main api instance
export default api;
