// import api from './api';

// export const coursesService = {
//   // Get all courses
//   getAllCourses: (params = {}) => {
//     const queryParams = new URLSearchParams(params).toString();
//     return api.get(`/courses/?${queryParams}`);
//   },

//   // Get course by ID
//   getCourseById: (id) => {
//     return api.get(`/courses/${id}/`);
//   },

//   // Enroll in course
//   enrollInCourse: (courseId) => {
//     return api.post(`/courses/${courseId}/enroll/`);
//   },

//   // Get user's enrolled courses
//   getMyCourses: () => {
//     return api.get('/courses/my-courses/');
//   },
//   // Get available languages
//   getLanguages: () => {
//     return api.get('/courses/languages/');
//   },
//   // Use the progress app endpoint
//   getDashboardStats: async () => {
//     const response = await api.get('/progress/dashboard-stats/');
//     return response;
//   },

//   // Use the courses app endpoint
//   getMyCourses: async () => {
//     const response = await api.get('/courses/my-enrollments/');
//     return response;
//   },

//   // New Duolingo-style methods
//   getLanguages: async () => {
//     const response = await api.get('/courses/languages/');
//     return response;
//   },

//   getLanguageLevels: async (languageCode) => {
//     const response = await api.get(`/courses/languages/${languageCode}/levels/`);
//     return response;
//   },

//   enrollInLevel: async (levelId) => {
//     const response = await api.post(`/courses/levels/${levelId}/enroll/`);
//     return response;
//   },

//   getLevelProgress: async (levelId) => {
//     const response = await api.get(`/courses/levels/${levelId}/progress/`);
//     return response;
//   },
// };


import api from './api';

export const coursesService = {
  // ========== COURSE METHODS ==========
  
  // Get all courses
  getAllCourses: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return api.get(`/courses/?${queryParams}`);
  },

  // Get course by ID
  getCourseById: (id) => {
    return api.get(`/courses/${id}/`);
  },

  // Enroll in course
  enrollInCourse: (courseId) => {
    return api.post(`/courses/${courseId}/enroll/`);
  },

  // ========== USER ENROLLMENT METHODS ==========

  // Get user's enrolled courses (for dashboard)
  getMyCourses: async () => {
    const response = await api.get('/courses/my-enrollments/');
    return response;
  },

  // Alternative method for different use cases
  getMyEnrollments: async () => {
    const response = await api.get('/courses/my-courses/');
    return response;
  },

  // ========== DASHBOARD METHODS ==========

  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await api.get('/progress/dashboard-stats/');
    return response;
  },

  // ========== DUOLINGO-STYLE LANGUAGE LEARNING METHODS ==========

  // Get available languages
  getLanguages: async () => {
    const response = await api.get('/courses/languages/');
    return response;
  },

  // Get levels for a specific language
  getLanguageLevels: async (languageCode) => {
    const response = await api.get(`/courses/languages/${languageCode}/levels/`);
    return response;
  },

  // Enroll in a language level
  enrollInLevel: async (levelId) => {
    const response = await api.post(`/courses/levels/${levelId}/enroll/`);
    return response;
  },

  // Get progress for a specific level
  getLevelProgress: async (levelId) => {
    const response = await api.get(`/courses/levels/${levelId}/progress/`);
    return response;
  },

  // ========== ADDITIONAL USEFUL METHODS ==========

  // Get courses within a specific level
  getLevelCourses: async (levelId) => {
    const response = await api.get(`/courses/levels/${levelId}/courses/`);
    return response;
  },

  // Update course progress
  updateCourseProgress: async (courseId, progressData) => {
    const response = await api.patch(`/courses/${courseId}/progress/`, progressData);
    return response;
  },

  // Get user's certificates
  getMyCertificates: async () => {
    const response = await api.get('/courses/my-certificates/');
    return response;
  },

  // Get specific certificate
  getCertificate: async (certificateId) => {
    const response = await api.get(`/courses/certificates/${certificateId}/`);
    return response;
  },

  // Rate a course
  rateCourse: async (courseId, ratingData) => {
    const response = await api.post(`/courses/${courseId}/rate/`, ratingData);
    return response;
  },

  // Search courses
  searchCourses: async (query) => {
    const response = await api.get(`/courses/?search=${encodeURIComponent(query)}`);
    return response;
  },

  // Filter courses by language
  getCoursesByLanguage: async (languageCode) => {
    const response = await api.get(`/courses/?language=${languageCode}`);
    return response;
  }
};
