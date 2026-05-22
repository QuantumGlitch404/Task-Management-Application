import React, { useState } from 'react';
import Badge from '../ui/Badge';
import { MoreVertical, Calendar, Folder, Edit2, CheckCircle, Circle, Trash2 } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import EditTaskModal from './EditTaskModal';

const TaskCard = ({ task }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { updateTask, deleteTask } = useTasks();

  const handleStatusToggle = async (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    await updateTask(task._id, { status: newStatus });
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task._id);
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Completed';

  return (
    <>
      <div className="bg-card-bg border border-border rounded-xl p-5 hover:border-blue-primary hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(59,130,246,0.1)] transition-all duration-300 relative group">
        {/* Top Badges Row */}
        <div className="flex justify-between items-center mb-4">
          <Badge type="priority" variant={task.priority} />
          <Badge type="status" variant={task.status} />
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className={`font-heading font-semibold text-[16px] text-white mb-2 line-clamp-2 transition-colors group-hover:text-blue-primary ${task.status === 'Completed' ? 'line-through opacity-50' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`font-body text-[14px] text-silver leading-[1.6] line-clamp-3 ${task.status === 'Completed' ? 'opacity-50' : ''}`}>
              {task.description}
            </p>
          )}
        </div>

        {/* Bottom Metadata Row */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-transparent border border-border font-mono text-[11px] text-slate">
              <Folder size={12} />
              {task.category}
            </span>
            
            {task.dueDate && (
              <span className={`flex items-center gap-1.5 font-body text-[12px] ${isOverdue ? 'text-red' : 'text-silver'}`}>
                <Calendar size={14} />
                {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>

          {/* Actions Dropdown */}
          <div className="relative">
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-md text-silver hover:text-white hover:bg-white/5 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              onBlur={() => setTimeout(() => setIsMenuOpen(false), 200)}
            >
              <MoreVertical size={16} />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-[calc(100%+4px)] w-48 bg-charcoal border border-border-light rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.4)] py-2 z-20 animate-fade-in">
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2 font-body text-[13px] text-silver hover:text-white hover:bg-white/5 transition-colors text-left"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                    setIsEditModalOpen(true);
                  }}
                >
                  <Edit2 size={16} /> Edit Task
                </button>
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2 font-body text-[13px] text-silver hover:text-white hover:bg-white/5 transition-colors text-left"
                  onClick={handleStatusToggle}
                >
                  {task.status === 'Completed' ? <Circle size={16} /> : <CheckCircle size={16} />}
                  Mark {task.status === 'Completed' ? 'Incomplete' : 'Complete'}
                </button>
                <button 
                  className="w-full flex items-center gap-3 px-4 py-2 font-body text-[13px] text-red hover:bg-red-glow transition-colors text-left"
                  onClick={handleDelete}
                >
                  <Trash2 size={16} /> Delete Task
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <EditTaskModal 
        task={task} 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
    </>
  );
};

export default TaskCard;
