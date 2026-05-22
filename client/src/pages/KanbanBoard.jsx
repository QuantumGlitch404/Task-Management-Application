import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/tasks/TaskCard';
import { TaskCardSkeleton } from '../components/ui/Skeleton';

const KanbanBoard = () => {
  const { tasks, loading, updateTask } = useTasks();
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const columns = ['Pending', 'In Progress', 'Completed'];

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    // Needed for Firefox
    e.dataTransfer.effectAllowed = 'move';
    // Make the ghost image look a bit better if possible, or just leave default
    e.dataTransfer.setData('text/plain', task._id);
    
    // Add a class after a tiny delay so the dragged element itself fades out, 
    // but the drag ghost remains opaque
    setTimeout(() => {
      if (e.target) e.target.classList.add('opacity-50');
    }, 0);
  };

  const handleDragEnd = (e) => {
    setDraggedTask(null);
    setDragOverColumn(null);
    if (e.target) e.target.classList.remove('opacity-50');
  };

  const handleDragOver = (e, column) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumn !== column) {
      setDragOverColumn(column);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, column) => {
    e.preventDefault();
    setDragOverColumn(null);
    
    if (draggedTask && draggedTask.status !== column) {
      await updateTask(draggedTask._id, { status: column });
    }
    setDraggedTask(null);
  };

  if (loading) {
    return (
      <div className="flex gap-6 h-[calc(100vh-160px)] overflow-x-auto pb-4 custom-scrollbar">
        {columns.map(col => (
          <div key={col} className="w-[350px] min-w-[350px] flex-shrink-0 bg-obsidian border border-border rounded-xl p-5 flex flex-col">
            <h2 className="font-heading font-semibold text-[16px] text-white mb-4">{col}</h2>
            <div className="flex flex-col gap-4">
              <TaskCardSkeleton />
              <TaskCardSkeleton />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-160px)] overflow-x-auto pb-4 custom-scrollbar animate-fade-in items-start">
      {columns.map(column => {
        const columnTasks = getTasksByStatus(column);
        const isOver = dragOverColumn === column;
        
        return (
          <div 
            key={column}
            className={`w-[350px] min-w-[350px] flex-shrink-0 bg-obsidian border rounded-xl flex flex-col max-h-full transition-colors duration-200 ${isOver ? 'border-blue-primary bg-white/5' : 'border-border'}`}
            onDragOver={(e) => handleDragOver(e, column)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column)}
          >
            {/* Column Header */}
            <div className="p-5 border-b border-border flex justify-between items-center bg-obsidian rounded-t-xl z-10 sticky top-0">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  column === 'Pending' ? 'bg-gray' : 
                  column === 'In Progress' ? 'bg-blue-primary' : 'bg-green'
                }`} />
                <h2 className="font-heading font-semibold text-[16px] text-white">
                  {column}
                </h2>
              </div>
              <span className="bg-charcoal px-2.5 py-1 rounded-md font-mono text-[12px] text-silver">
                {columnTasks.length}
              </span>
            </div>

            {/* Column Body */}
            <div className="p-5 flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4 min-h-[150px]">
              {columnTasks.map(task => (
                <div
                  key={task._id}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, task)}
                  onDragEnd={handleDragEnd}
                  className="cursor-grab active:cursor-grabbing"
                  data-draggable="true"
                >
                  {/* Wrap inside a div that ignores pointer events while dragging to prevent flicker */}
                  <div className={`transition-transform duration-200 ${draggedTask?._id === task._id ? 'scale-105 shadow-xl' : ''}`}>
                    <TaskCard task={task} />
                  </div>
                </div>
              ))}
              
              {columnTasks.length === 0 && (
                <div className="flex-1 border-2 border-dashed border-border rounded-xl flex items-center justify-center p-8">
                  <span className="font-body text-[13px] text-slate text-center">
                    Drag tasks here
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
