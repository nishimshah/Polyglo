// import api from './api'

// const quizzesService = {
//   getQuizzes: () => api.get('/quizzes/'),
//   getQuizById: (id) => api.get(`/quizzes/${id}`),
//   startQuiz: (id) => api.post(`/quizzes/${id}/start/`),
//   submitQuiz: (attemptId, data) => api.post(`/quizzes/attempts/${attemptId}/submit/`, data),
//   getAttempts: () => api.get('/quizzes/my-attempts/'),
//   getAttemptResults: (attemptId) => api.get(`/quizzes/attempts/${attemptId}/results/`),
// }

// export default quizzesService

// src/services/quizzes.js
import api from './api';

const quizzesService = {
  getQuizzes: () => api.get('/quizzes/'),
  getQuiz: (id) => api.get(`/quizzes/${id}/`),
  startQuizAttempt: (quizId) => api.post(`/quizzes/${quizId}/start/`),
  submitQuizAttempt: (attemptId, data) => api.post(`/quizzes/attempts/${attemptId}/submit/`, data),
  getUserAttempts: () => api.get('/quizzes/my-attempts/')
};

export default quizzesService;
