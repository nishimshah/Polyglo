import { useState, useEffect } from 'react';
import { coursesService } from '../services/courses';

export const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsResponse, coursesResponse] = await Promise.all([
        coursesService.getDashboardStats(),
        coursesService.getMyCourses()
      ]);

      setStats(statsResponse.data);
      setMyCourses(coursesResponse.data.results || coursesResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    stats,
    myCourses,
    loading,
    error,
    refetch: fetchDashboardData
  };
};
