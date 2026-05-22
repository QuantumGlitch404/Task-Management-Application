import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, List, Columns, BarChart2, Settings, LogOut, X } from 'lucide-react';

const DashboardSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'All Tasks', path: '/dashboard/tasks', icon: List },
    { name: 'Kanban Board', path: '/dashboard/kanban', icon: Columns },
    { name: 'Analytics', path: '/dashboard/analytics', icon: BarChart2 },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-overlay z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-screen w-[280px] bg-obsidian border-r border-border z-50
        transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between p-8 pt-8 pb-6">
          <div className="font-heading font-bold text-[20px] text-blue-primary">
            TaskFlow
          </div>
          <button className="md:hidden text-silver hover:text-white" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={() => {
                if (window.innerWidth < 768) onClose();
              }}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 mb-1 rounded-lg font-body font-medium text-[14px] transition-all duration-200 interactive
                ${isActive 
                  ? 'bg-blue-glow text-blue-primary border-l-[3px] border-blue-primary' 
                  : 'text-silver hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 relative">
          {showProfileMenu && (
            <div className="absolute bottom-[calc(100%+8px)] left-4 right-4 bg-charcoal border border-border rounded-xl shadow-lg p-2 animate-fade-in">
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red font-body text-[14px] hover:bg-red-glow rounded-lg transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
          
          <div 
            className="flex items-center gap-3 p-4 bg-charcoal border border-border rounded-xl cursor-pointer hover:border-blue-primary transition-colors interactive"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="w-10 h-10 rounded-full bg-blue-primary flex items-center justify-center font-heading font-semibold text-[16px] text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-body font-medium text-[14px] text-white truncate">
                {user?.name}
              </div>
              <div className="font-body font-normal text-[12px] text-slate truncate">
                {user?.email}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
