import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import CustomCursor from './components/ui/CustomCursor';
import { ToastProvider } from './components/ui/Toast';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DashboardHome from './pages/DashboardHome';
import TaskList from './pages/TaskList';
import KanbanBoard from './pages/KanbanBoard';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <CustomCursor />
          <ToastProvider />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<DashboardHome />} />
                <Route path="tasks" element={<TaskList />} />
                <Route path="kanban" element={<KanbanBoard />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
