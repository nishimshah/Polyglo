import api from './api';

export const lessonsService = {
  // Get lessons for a course
  getCourseLessons: (courseId) => {
    return api.get(`/lessons/course/${courseId}/`);
  },

  // Get lesson by ID
  getLessonById: (id) => {
    return api.get(`/lessons/${id}/`);
  },

  // Complete a lesson
  completeLesson: (lessonId, timeSpent = 0) => {
    return api.post(`/lessons/${lessonId}/complete/`, {
      time_spent: timeSpent
    });
  },

  // Get user's lesson completions
  getUserCompletions: () => {
    return api.get('/lessons/completions/');
  },

  // Get lesson progress for a course
  getCourseProgress: (courseId) => {
    return api.get(`/lessons/course/${courseId}/progress/`);
  }
};

// Default export (alternative import method)
export default lessonsService;
