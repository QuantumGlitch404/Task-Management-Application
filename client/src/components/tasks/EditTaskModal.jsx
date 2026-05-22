import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useTasks } from '../../context/TaskContext';
import { Calendar, Folder } from 'lucide-react';

const EditTaskModal = ({ task, isOpen, onClose }) => {
  const { updateTask } = useTasks();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Personal',
    priority: 'Medium',
    status: 'Pending',
    dueDate: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task && isOpen) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        category: task.category || 'Personal',
        priority: task.priority || 'Medium',
        status: task.status || 'Pending',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
      });
      setErrors({});
    }
  }, [task, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: null });
    }
  };

  const handleSelectGroup = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setErrors({ title: 'Task title is required' });
      return;
    }

    setIsSubmitting(true);
    try {
      await updateTask(task._id, formData);
      onClose();
    } catch (error) {
      // Handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Input
          id="title"
          label="Task Title"
          placeholder="Enter task title..."
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          maxLength={100}
        />

        <div className="flex flex-col w-full">
          <label htmlFor="description" className="font-body font-medium text-[13px] uppercase tracking-[0.05em] text-silver mb-2">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full bg-input-bg border-[1.5px] border-border rounded-md p-4 font-body text-[15px] text-white resize-y outline-none focus:border-blue-primary focus:shadow-[0_0_0_4px_rgba(59,130,246,0.15)] transition-all duration-200"
            placeholder="Add details about this task..."
            value={formData.description}
            onChange={handleChange}
            maxLength={500}
          />
          <div className="text-right mt-1.5 font-body text-[12px] text-slate">
            {formData.description.length} / 500
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label className="font-body font-medium text-[13px] uppercase tracking-[0.05em] text-silver mb-2">
              Category
            </label>
            <div className="relative">
              <Folder size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-silver pointer-events-none" />
              <select
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full h-12 bg-input-bg border-[1.5px] border-border rounded-md pl-11 pr-4 font-body text-[15px] text-white outline-none focus:border-blue-primary appearance-none cursor-pointer"
              >
                {['Personal', 'Work', 'Study', 'Development', 'Design', 'Other'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label className="font-body font-medium text-[13px] uppercase tracking-[0.05em] text-silver mb-2">
              Due Date
            </label>
            <div className="relative">
              <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-silver pointer-events-none" />
              <input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full h-12 bg-input-bg border-[1.5px] border-border rounded-md pl-11 pr-4 font-body text-[15px] text-white outline-none focus:border-blue-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <label className="font-body font-medium text-[13px] uppercase tracking-[0.05em] text-silver mb-2">
            Priority
          </label>
          <div className="flex gap-3">
            {[
              { id: 'High', colorClass: 'border-red bg-red-glow text-red-light', defaultClass: 'border-border text-silver hover:border-red/50' },
              { id: 'Medium', colorClass: 'border-amber bg-amber-glow text-amber-light', defaultClass: 'border-border text-silver hover:border-amber/50' },
              { id: 'Low', colorClass: 'border-gray bg-gray-glow text-gray-light', defaultClass: 'border-border text-silver hover:border-gray/50' }
            ].map((p) => (
              <div 
                key={p.id}
                onClick={() => handleSelectGroup('priority', p.id)}
                className={`flex-1 h-12 rounded-md border-[1.5px] flex items-center justify-center font-body font-medium text-[14px] cursor-pointer transition-all duration-200 ${formData.priority === p.id ? p.colorClass : p.defaultClass}`}
              >
                {p.id}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full">
          <label className="font-body font-medium text-[13px] uppercase tracking-[0.05em] text-silver mb-2">
            Status
          </label>
          <div className="flex gap-3">
            {[
              { id: 'Pending', colorClass: 'border-gray bg-gray-glow text-gray-light', defaultClass: 'border-border text-silver hover:border-gray/50' },
              { id: 'In Progress', colorClass: 'border-blue-primary bg-blue-glow text-blue-light', defaultClass: 'border-border text-silver hover:border-blue-primary/50' },
              { id: 'Completed', colorClass: 'border-green bg-green-glow text-green-light', defaultClass: 'border-border text-silver hover:border-green/50' }
            ].map((s) => (
              <div 
                key={s.id}
                onClick={() => handleSelectGroup('status', s.id)}
                className={`flex-1 h-12 rounded-md border-[1.5px] flex items-center justify-center font-body font-medium text-[14px] cursor-pointer transition-all duration-200 ${formData.status === s.id ? s.colorClass : s.defaultClass}`}
              >
                {s.id}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 mt-2 border-t border-border">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" className="text-white" />
                UPDATING...
              </>
            ) : 'SAVE CHANGES'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
