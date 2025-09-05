import { useState, useEffect } from 'react';
import { coursesService } from '../services/courses';
import toast from 'react-hot-toast';

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await coursesService.getAllCourses(params);
      setCourses(response.data.results || response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch courses');
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async (courseId) => {
    try {
      const response = await coursesService.enrollInCourse(courseId);
      toast.success(response.data.message);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to enroll';
      toast.error(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    fetchCourses,
    enrollInCourse,
    refetch: fetchCourses
  };
};
