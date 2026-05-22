import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import CreateTaskModal from '../components/tasks/CreateTaskModal';
import { useTasks } from '../context/TaskContext';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const location = useLocation();
  const { setFilters } = useTasks();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Overview';
      case '/dashboard/tasks':
        return 'All Tasks';
      case '/dashboard/kanban':
        return 'Kanban Board';
      case '/dashboard/analytics':
        return 'Analytics';
      case '/dashboard/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const handleSearch = (searchTerm) => {
    setFilters('search', searchTerm);
  };

  return (
    <div className="min-h-screen bg-midnight font-body flex">
      {/* Sidebar */}
      <DashboardSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-[280px] min-h-screen">
        <DashboardHeader 
          title={getPageTitle()}
          onMenuClick={() => setIsSidebarOpen(true)}
          onSearch={handleSearch}
          onCreateTask={() => setIsCreateModalOpen(true)}
        />
        
        <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <CreateTaskModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
