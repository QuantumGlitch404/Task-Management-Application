import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { taskService } from '../services/taskService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
    dueToday: 0
  });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    search: '',
    sort: 'createdAt',
    order: 'desc',
    page: 1,
    limit: 50
  });

  const fetchStats = useCallback(async () => {
    try {
      const response = await taskService.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await taskService.getTasks(filters);
      if (response.success) {
        setTasks(response.data.tasks || []);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchStats();
    } else {
      // Clear tasks if logged out
      setTasks([]);
      setStats({
        total: 0, pending: 0, inProgress: 0, completed: 0, overdue: 0, dueToday: 0
      });
    }
  }, [user, fetchTasks, fetchStats]);

  const createTask = async (taskData) => {
    try {
      const response = await taskService.createTask(taskData);
      if (response.success) {
        setTasks(prev => [response.data.task, ...prev]);
        fetchStats();
        toast.success('Task created successfully');
        return response.data.task;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to create task';
      toast.error(msg);
      throw error;
    }
  };

  const updateTask = async (id, taskData) => {
    // Optimistic UI updates for drag-and-drop
    const previousTasks = [...tasks];
    const previousStats = { ...stats };

    if (taskData.status) {
      setTasks(prev =>
        prev.map(t => (t._id === id ? { ...t, ...taskData, completed: taskData.status === 'Completed' } : t))
      );
    }

    try {
      const response = await taskService.updateTask(id, taskData);
      if (response.success) {
        setTasks(prev =>
          prev.map(t => (t._id === id ? response.data.task : t))
        );
        fetchStats();
        toast.success(taskData.status ? `Task moved to ${taskData.status}` : 'Task updated successfully');
        return response.data.task;
      }
    } catch (error) {
      // Rollback on failure
      setTasks(previousTasks);
      setStats(previousStats);
      const msg = error.response?.data?.message || 'Failed to update task';
      toast.error(msg);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    const previousTasks = [...tasks];
    setTasks(prev => prev.filter(t => t._id !== id));

    try {
      const response = await taskService.deleteTask(id);
      if (response.success) {
        fetchStats();
        toast.success('Task deleted successfully');
      }
    } catch (error) {
      setTasks(previousTasks);
      const msg = error.response?.data?.message || 'Failed to delete task';
      toast.error(msg);
      throw error;
    }
  };

  const setSingleFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      category: '',
      search: '',
      sort: 'createdAt',
      order: 'desc',
      page: 1,
      limit: 50
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        stats,
        loading,
        filters,
        createTask,
        updateTask,
        deleteTask,
        setFilters: setSingleFilter,
        clearFilters,
        refresh: fetchTasks,
        refreshStats: fetchStats
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
