const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const protect = require('../middleware/auth');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');

// Stats route must come before :id route
router.get('/stats', protect, getTaskStats);

router.get('/', protect, getTasks);
router.get('/:id', protect, getTask);

router.post(
  '/',
  protect,
  [
    body('title').trim().notEmpty().withMessage('Task title is required')
      .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
    body('description').optional().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
    body('category').optional().isIn(['Personal', 'Work', 'Study', 'Development', 'Design', 'Other'])
      .withMessage('Invalid category'),
    body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority'),
    body('status').optional().isIn(['Pending', 'In Progress', 'Completed']).withMessage('Invalid status')
  ],
  createTask
);

router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;
