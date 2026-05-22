const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  },
  category: {
    type: String,
    enum: ['Personal', 'Work', 'Study', 'Development', 'Design', 'Other'],
    default: 'Personal'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  dueDate: {
    type: Date,
    default: null
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes for faster queries
taskSchema.index({ createdBy: 1, status: 1 });
taskSchema.index({ createdBy: 1, dueDate: 1 });
taskSchema.index({ createdBy: 1, priority: 1 });

module.exports = mongoose.model('Task', taskSchema);
