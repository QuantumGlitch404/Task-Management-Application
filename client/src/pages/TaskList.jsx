import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/tasks/TaskCard';
import { TaskCardSkeleton } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import { ListTodo, Search, Filter } from 'lucide-react';
import Button from '../components/ui/Button';

const TaskList = () => {
  const { tasks, loading, setFilters, filters } = useTasks();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="max-w-[1200px] mx-auto animate-fade-in">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="font-heading font-semibold text-[24px] text-white">All Tasks</h1>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button 
            variant="secondary" 
            className="h-10 px-4 flex-1 md:flex-none"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-obsidian border border-border rounded-xl p-5 mb-8 animate-fade-in grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="font-body font-medium text-[12px] uppercase text-silver mb-2">Status</label>
            <select 
              value={filters.status || ''}
              onChange={(e) => setFilters('status', e.target.value)}
              className="w-full h-10 bg-input-bg border border-border rounded-md px-3 font-body text-[14px] text-white outline-none"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="font-body font-medium text-[12px] uppercase text-silver mb-2">Priority</label>
            <select 
              value={filters.priority || ''}
              onChange={(e) => setFilters('priority', e.target.value)}
              className="w-full h-10 bg-input-bg border border-border rounded-md px-3 font-body text-[14px] text-white outline-none"
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <Button 
              variant="secondary" 
              className="h-10"
              onClick={() => {
                setFilters('status', '');
                setFilters('priority', '');
                setFilters('search', '');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}

      {/* Task Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          Array(6).fill(0).map((_, i) => <TaskCardSkeleton key={i} />)
        ) : tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div 
              key={task._id}
              className="animate-slide-in-right"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <TaskCard task={task} />
            </div>
          ))
        ) : (
          <div className="col-span-1 lg:col-span-2 bg-obsidian border border-border rounded-xl p-12 mt-4">
            <EmptyState 
              icon={ListTodo} 
              message="No tasks match your criteria" 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
