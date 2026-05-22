import React from 'react';
import { Menu, Search, Plus, Bell } from 'lucide-react';
import Button from '../ui/Button';

const DashboardHeader = ({ title, onMenuClick, onSearch, onCreateTask }) => {
  return (
    <header className="h-[80px] bg-midnight border-b border-border flex items-center justify-between px-6 md:px-10">
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden text-silver hover:text-white"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>
        <h1 className="font-heading font-semibold text-[24px] md:text-[28px] text-white">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex relative w-[300px]">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-silver" />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            onChange={(e) => onSearch && onSearch(e.target.value)}
            className="w-full h-10 bg-input-bg border border-border rounded-md pl-11 pr-4 font-body text-[14px] text-white outline-none focus:border-blue-primary transition-colors"
          />
        </div>

        <button className="text-silver hover:text-white relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red rounded-full"></span>
        </button>

        <Button 
          className="h-10 px-4 md:px-5" 
          onClick={onCreateTask}
        >
          <span className="hidden md:inline font-body font-semibold text-[13px] uppercase">Create Task</span>
          <Plus size={18} className="md:ml-2" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
